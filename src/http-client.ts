import { isOnline, executeWithConnectionRetry } from '@/lib/robust-connection-handler';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  criticalOperation?: boolean;
  useCache?: boolean;
  offlineStrategy?: 'fail' | 'queue';
}

interface HttpClientResponse<T = any> {
  data: T | null;
  error: Error | null;
  status: number;
  headers: Headers;
  ok: boolean;
}

// Cache implementation
const responseCache = new Map<string, { data: any; timestamp: number; headers: Headers }>();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

// Request queue for offline mode
interface QueuedRequest {
  url: string;
  method: HttpMethod;
  body?: any;
  options?: RequestOptions;
  resolve: (value: HttpClientResponse) => void;
  reject: (reason: any) => void;
}

const requestQueue: QueuedRequest[] = [];
let isProcessingQueue = false;

// Process the request queue when back online
window.addEventListener('online', () => {
  processRequestQueue();
});

async function processRequestQueue() {
  if (isProcessingQueue || !isOnline() || requestQueue.length === 0) {
    return;
  }

  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (!request) continue;

    try {
      const { url, method, body, options } = request;
      const response = await httpClient[method.toLowerCase() as Lowercase<HttpMethod>](url, body, options);
      request.resolve(response);
    } catch (error) {
      request.reject(error);
    }
  }

  isProcessingQueue = false;
}

/**
 * Custom HTTP client with robust error handling, retries, and offline support
 */
export const httpClient = {
  /**
   * Make a request with the specified method
   */
  request: async <T = any>(
    method: HttpMethod,
    url: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<HttpClientResponse<T>> => {
    const {
      retries = 3,
      retryDelay = 1000,
      timeout = 30000,
      criticalOperation = false,
      useCache = method === 'GET',
      offlineStrategy = 'fail',
      ...fetchOptions
    } = options;

    // Check if we're offline
    if (!isOnline()) {
      if (offlineStrategy === 'queue' && method !== 'GET') {
        return new Promise((resolve, reject) => {
          requestQueue.push({
            url,
            method,
            body,
            options,
            resolve,
            reject
          });
        });
      } else if (criticalOperation) {
        throw new Error('Unable to complete operation while offline');
      }
    }

    // Check cache for GET requests
    const cacheKey = `${method}:${url}`;
    if (method === 'GET' && useCache && responseCache.has(cacheKey)) {
      const cachedResponse = responseCache.get(cacheKey)!;
      if (Date.now() - cachedResponse.timestamp < CACHE_EXPIRY) {
        return {
          data: cachedResponse.data,
          error: null,
          status: 200,
          headers: cachedResponse.headers,
          ok: true
        };
      } else {
        responseCache.delete(cacheKey);
      }
    }

    // Prepare headers
    const headers = new Headers(fetchOptions.headers || {});
    if (body && !headers.has('Content-Type') && !(body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // Execute request with retry logic
      const result = await executeWithConnectionRetry(
        async () => {
          const requestOptions: RequestInit = {
            method,
            headers,
            signal: controller.signal,
            ...fetchOptions
          };

          // Add body if provided
          if (body) {
            requestOptions.body = body instanceof FormData ? body : JSON.stringify(body);
          }

          const response = await fetch(url, requestOptions);
          let data = null;

          // Parse response based on content type
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            data = await response.json();
          } else if (contentType.includes('text/')) {
            data = await response.text();
          } else {
            data = await response.blob();
          }

          // Cache successful GET responses
          if (method === 'GET' && response.ok && useCache) {
            responseCache.set(cacheKey, {
              data,
              timestamp: Date.now(),
              headers: response.headers
            });
          }

          return {
            data,
            error: !response.ok ? new Error(response.statusText) : null,
            status: response.status,
            headers: response.headers,
            ok: response.ok
          };
        },
        {
          maxRetries: retries,
          baseDelay: retryDelay,
          criticalOperation
        }
      );

      return result;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return {
          data: null,
          error: new Error(`Request timeout after ${timeout}ms`),
          status: 408,
          headers: new Headers(),
          ok: false
        };
      }

      return {
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
        status: 0,
        headers: new Headers(),
        ok: false
      };
    } finally {
      clearTimeout(timeoutId);
    }
  },

  // Convenience methods for different HTTP verbs
  get: <T = any>(url: string, options?: RequestOptions) => {
    return httpClient.request<T>('GET', url, undefined, options);
  },

  post: <T = any>(url: string, body?: any, options?: RequestOptions) => {
    return httpClient.request<T>('POST', url, body, options);
  },

  put: <T = any>(url: string, body?: any, options?: RequestOptions) => {
    return httpClient.request<T>('PUT', url, body, options);
  },

  patch: <T = any>(url: string, body?: any, options?: RequestOptions) => {
    return httpClient.request<T>('PATCH', url, body, options);
  },

  delete: <T = any>(url: string, options?: RequestOptions) => {
    return httpClient.request<T>('DELETE', url, undefined, options);
  }
};

// Export type for usage
export type { HttpClientResponse };