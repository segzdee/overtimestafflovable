
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Configuration
interface DebugConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  timeoutThreshold: number; // in ms
  logLevel: 'verbose' | 'normal' | 'minimal';
  networkTestCount: number;
  testEmail?: string; // Optional test email for auth tests
  testPassword?: string; // Optional test password for auth tests
}

// Diagnostic result structure
interface DiagnosticResult {
  success: boolean;
  message: string;
  details?: any;
  timing?: number; // in ms
  error?: any;
}

// Main debugging class
export class SupabaseDebugger {
  private supabase: SupabaseClient;
  private config: DebugConfig;
  private results: Record<string, DiagnosticResult> = {};

  constructor(config: DebugConfig) {
    this.config = {
      ...config,
      timeoutThreshold: config.timeoutThreshold || 5000,
      logLevel: config.logLevel || 'normal',
      networkTestCount: config.networkTestCount || 5
    };

    // Create a separate client instance for testing
    this.supabase = createClient(
      config.supabaseUrl,
      config.supabaseAnonKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: false // Don't persist for test client
        },
        global: {
          fetch: this.createTimedFetch(config.timeoutThreshold)
        }
      }
    );

    this.log('Supabase Debugger initialized', 'normal');
  }

  // Run all diagnostics
  async runFullDiagnostics(): Promise<Record<string, DiagnosticResult>> {
    this.log('Starting full diagnostics...', 'minimal');
    
    // Clear previous results
    this.results = {};

    // Environment checks
    await this.checkEnvironmentVariables();
    
    // Connection tests
    await this.testSupabaseConnection();
    await this.testNetworkLatency();
    
    // Auth service tests
    await this.testAuthService();
    if (this.config.testEmail && this.config.testPassword) {
      await this.testAuthSignIn();
    }
    
    // Database tests
    await this.testDatabaseConnection();
    await this.testDatabasePerformance();
    
    // Edge function tests if available
    await this.testEdgeFunctions();

    // CORS checks
    await this.checkCORSConfiguration();

    // Print summary
    this.printSummary();
    
    return this.results;
  }

  // Environment checks
  async checkEnvironmentVariables(): Promise<void> {
    this.log('Checking environment variables...', 'normal');
    
    const start = performance.now();
    const result: DiagnosticResult = {
      success: true,
      message: 'Environment variables check passed',
      details: {
        supabaseUrl: this.maskString(this.config.supabaseUrl),
        supabaseKeyProvided: !!this.config.supabaseAnonKey,
        supabaseKeyLength: this.config.supabaseAnonKey?.length || 0,
        userAgent: navigator.userAgent,
        windowLocation: window.location.origin,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        networkType: (navigator as any).connection?.type || 'unknown',
        effectiveType: (navigator as any).connection?.effectiveType || 'unknown',
        deviceMemory: (navigator as any).deviceMemory || 'unknown',
        hardwareConcurrency: navigator.hardwareConcurrency || 'unknown'
      },
      timing: 0
    };

    // Validate URL format
    if (!this.config.supabaseUrl || !this.config.supabaseUrl.startsWith('https://')) {
      result.success = false;
      result.message = 'Invalid Supabase URL format';
    }

    // Validate key
    if (!this.config.supabaseAnonKey || this.config.supabaseAnonKey.length < 30) {
      result.success = false;
      result.message = 'Supabase anon key appears to be invalid';
    }

    result.timing = performance.now() - start;
    this.results.environmentVariables = result;
  }

  // Basic connection test
  async testSupabaseConnection(): Promise<void> {
    this.log('Testing basic Supabase connection...', 'normal');
    
    const start = performance.now();
    const result: DiagnosticResult = {
      success: false,
      message: 'Connection test failed',
      timing: 0
    };

    try {
      // Simple health check - just get session (lightweight)
      const { data, error } = await this.supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      result.success = true;
      result.message = 'Successfully connected to Supabase';
      result.details = {
        sessionExists: !!data.session,
        responseTime: performance.now() - start
      };
    } catch (error) {
      result.success = false;
      result.message = 'Failed to connect to Supabase';
      result.error = this.formatError(error);
    }

    result.timing = performance.now() - start;
    this.results.basicConnection = result;
  }

  // Network latency test
  async testNetworkLatency(): Promise<void> {
    this.log('Testing network latency...', 'normal');
    
    const result: DiagnosticResult = {
      success: true,
      message: 'Network latency test completed',
      details: {
        tests: [],
        averageLatency: 0,
        maxLatency: 0,
        minLatency: Infinity,
        timeouts: 0,
        errors: 0
      },
      timing: 0
    };

    const startTotal = performance.now();
    const latencies: number[] = [];

    for (let i = 0; i < this.config.networkTestCount; i++) {
      this.log(`Running latency test ${i + 1}/${this.config.networkTestCount}...`, 'verbose');
      
      const testResult = {
        attempt: i + 1,
        latency: 0,
        success: false,
        error: null as any
      };

      const start = performance.now();
      
      try {
        // Use a simple endpoint for latency testing
        const { error } = await this.supabase.auth.getSession();
        
        const latency = performance.now() - start;
        testResult.latency = latency;
        testResult.success = !error;
        
        if (!error) {
          latencies.push(latency);
        } else {
          testResult.error = this.formatError(error);
          result.details.errors++;
        }
      } catch (error) {
        testResult.error = this.formatError(error);
        
        if (error instanceof Error && error.message.includes('timeout')) {
          result.details.timeouts++;
        } else {
          result.details.errors++;
        }
      }

      result.details.tests.push(testResult);
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Calculate stats
    if (latencies.length > 0) {
      result.details.averageLatency = latencies.reduce((sum, latency) => sum + latency, 0) / latencies.length;
      result.details.maxLatency = Math.max(...latencies);
      result.details.minLatency = Math.min(...latencies);
    }

    // Evaluate success
    if (result.details.timeouts > 0 || result.details.errors > this.config.networkTestCount / 2) {
      result.success = false;
      result.message = `Network issues detected: ${result.details.timeouts} timeouts, ${result.details.errors} errors`;
    } else if (result.details.averageLatency > 1000) {
      result.success = true; // Still successful but with warning
      result.message = `Network latency is high (${result.details.averageLatency.toFixed(2)}ms)`;
    }

    result.timing = performance.now() - startTotal;
    this.results.networkLatency = result;
  }

  // Auth service test
  async testAuthService(): Promise<void> {
    this.log('Testing Auth service availability...', 'normal');
    
    const start = performance.now();
    const result: DiagnosticResult = {
      success: false,
      message: 'Auth service test failed',
      timing: 0
    };

    try {
      // Test if we can get the auth config
      const { data, error } = await this.supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      result.success = true;
      result.message = 'Auth service is available';
      result.details = {
        responseTime: performance.now() - start,
        sessionExists: !!data.session
      };
    } catch (error) {
      result.success = false;
      result.message = 'Auth service is unavailable or experiencing issues';
      result.error = this.formatError(error);
    }

    result.timing = performance.now() - start;
    this.results.authService = result;
  }

  // Test sign in (if credentials provided)
  async testAuthSignIn(): Promise<void> {
    if (!this.config.testEmail || !this.config.testPassword) {
      this.log('Skipping auth sign-in test (no test credentials provided)', 'normal');
      return;
    }

    this.log('Testing Auth sign-in...', 'normal');
    
    const start = performance.now();
    const result: DiagnosticResult = {
      success: false,
      message: 'Auth sign-in test failed',
      timing: 0
    };

    try {
      // Test sign in
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: this.config.testEmail,
        password: this.config.testPassword
      });
      
      if (error) {
        throw error;
      }

      result.success = true;
      result.message = 'Successfully signed in with test credentials';
      result.details = {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email,
          emailConfirmed: !!data.user.email_confirmed_at
        } : null,
        sessionExists: !!data.session,
        responseTime: performance.now() - start
      };

      // Sign out afterward
      await this.supabase.auth.signOut();
    } catch (error) {
      result.success = false;
      result.message = 'Failed to sign in with test credentials';
      result.error = this.formatError(error);
    }

    result.timing = performance.now() - start;
    this.results.authSignIn = result;
  }

  // Database connection test
  async testDatabaseConnection(): Promise<void> {
    this.log('Testing database connection...', 'normal');
    
    const start = performance.now();
    const result: DiagnosticResult = {
      success: false,
      message: 'Database connection test failed',
      timing: 0
    };

    try {
      // Try a simple query
      const { data, error, status } = await this.supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        throw error;
      }

      result.success = true;
      result.message = 'Successfully connected to database';
      result.details = {
        status,
        responseTime: performance.now() - start
      };
    } catch (error) {
      result.success = false;
      result.message = 'Failed to connect to database';
      result.error = this.formatError(error);
    }

    result.timing = performance.now() - start;
    this.results.databaseConnection = result;
  }

  // Database performance test
  async testDatabasePerformance(): Promise<void> {
    this.log('Testing database performance...', 'normal');
    
    const start = performance.now();
    const result: DiagnosticResult = {
      success: true,
      message: 'Database performance test completed',
      details: {
        queries: []
      },
      timing: 0
    };

    try {
      // Test 1: Simple count query
      const countStart = performance.now();
      const countQuery = await this.supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });
      
      result.details.queries.push({
        name: 'Count query',
        success: !countQuery.error,
        latency: performance.now() - countStart,
        error: countQuery.error ? this.formatError(countQuery.error) : null
      });

      // Test 2: Simple select query
      const selectStart = performance.now();
      const selectQuery = await this.supabase
        .from('profiles')
        .select('id, email, role')
        .limit(5);
      
      result.details.queries.push({
        name: 'Select query',
        success: !selectQuery.error,
        latency: performance.now() - selectStart,
        error: selectQuery.error ? this.formatError(selectQuery.error) : null,
        rowCount: selectQuery.data?.length || 0
      });

      // Evaluate success
      const failures = result.details.queries.filter(q => !q.success).length;
      const highLatencyQueries = result.details.queries.filter(q => q.latency > 1000).length;
      
      if (failures > 0) {
        result.success = false;
        result.message = `Database performance issues: ${failures} failed queries`;
      } else if (highLatencyQueries > 0) {
        result.success = true; // Still successful but with warning
        result.message = `Database performance is slow: ${highLatencyQueries} high latency queries`;
      } else {
        result.message = 'Database performance is good';
      }
    } catch (error) {
      result.success = false;
      result.message = 'Database performance test failed';
      result.error = this.formatError(error);
    }

    result.timing = performance.now() - start;
    this.results.databasePerformance = result;
  }

  // Edge functions test
  async testEdgeFunctions(): Promise<void> {
    this.log('Testing Edge Functions...', 'normal');
    
    const start = performance.now();
    const result: DiagnosticResult = {
      success: true,
      message: 'Edge Functions test skipped (no functions specified)',
      details: {
        functions: []
      },
      timing: 0
    };

    try {
      // This is a generic test - you might want to customize with your specific functions
      // Check if Edge Functions feature is enabled by testing a known function if available
      // For now we'll just mark as untested
      
      result.timing = performance.now() - start;
      this.results.edgeFunctions = result;
    } catch (error) {
      result.success = false;
      result.message = 'Edge Functions test failed';
      result.error = this.formatError(error);
      this.results.edgeFunctions = result;
    }
  }

  // CORS configuration check
  async checkCORSConfiguration(): Promise<void> {
    this.log('Checking CORS configuration...', 'normal');
    
    const start = performance.now();
    const result: DiagnosticResult = {
      success: true,
      message: 'CORS configuration appears correct',
      details: {
        origin: window.location.origin,
        preflight: 'untested' // Actually testing preflight requires server cooperation
      },
      timing: 0
    };

    try {
      // Make a cross-origin request to test CORS
      // We're already making requests to Supabase, so if those succeed, CORS is working
      const { error } = await this.supabase.auth.getSession();
      
      if (error && (
        error.message.includes('CORS') || 
        error.message.includes('cross-origin') ||
        error.message.includes('access-control-allow-origin')
      )) {
        result.success = false;
        result.message = 'CORS configuration issues detected';
        result.error = this.formatError(error);
      }
    } catch (error) {
      // Check if it's a CORS error
      if (error instanceof Error && (
        error.message.includes('CORS') || 
        error.message.includes('cross-origin') ||
        error.message.includes('access-control-allow-origin')
      )) {
        result.success = false;
        result.message = 'CORS configuration issues detected';
        result.error = this.formatError(error);
      }
    }

    result.timing = performance.now() - start;
    this.results.corsConfiguration = result;
  }

  // Print a summary of all diagnostic results
  printSummary(): void {
    const issueCount = Object.values(this.results).filter(r => !r.success).length;
    const warningCount = Object.values(this.results).filter(r => r.success && r.message.includes('high') || r.message.includes('slow')).length;
    
    console.group('🔍 Supabase Diagnostics Summary');
    console.log(`Total tests: ${Object.keys(this.results).length}`);
    console.log(`Issues found: ${issueCount}`);
    console.log(`Warnings: ${warningCount}`);
    
    // Print results in a table for better readability
    console.table(
      Object.entries(this.results).map(([key, result]) => ({
        Test: key,
        Status: result.success ? '✅ Pass' : '❌ Fail',
        Time: `${result.timing?.toFixed(2)}ms`,
        Message: result.message
      }))
    );
    
    if (issueCount > 0) {
      console.group('🚨 Issues Detected');
      Object.entries(this.results)
        .filter(([_, result]) => !result.success)
        .forEach(([key, result]) => {
          console.group(`Issue in ${key}:`);
          console.log(`Message: ${result.message}`);
          if (result.error) {
            console.log('Error details:', result.error);
          }
          if (result.details) {
            console.log('Additional details:', result.details);
          }
          console.groupEnd();
        });
      console.groupEnd();
    }
    
    console.groupEnd();
  }

  // Get only the failed tests as a report
  getIssuesReport(): Record<string, DiagnosticResult> {
    return Object.entries(this.results)
      .filter(([_, result]) => !result.success)
      .reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
  }

  // Utility: Logging with different levels
  private log(message: string, level: 'verbose' | 'normal' | 'minimal'): void {
    const levels = {
      'verbose': 0,
      'normal': 1,
      'minimal': 2
    };
    
    if (levels[level] >= levels[this.config.logLevel]) {
      console.log(`[Supabase Debugger] ${message}`);
    }
  }

  // Utility: Create a timed fetch
  private createTimedFetch(timeoutMs: number): typeof fetch {
    return (input, init) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      
      const fetchPromise = fetch(input, {
        ...init,
        signal: controller.signal
      });
      
      return fetchPromise.finally(() => clearTimeout(timeout));
    };
  }

  // Utility: Format error objects consistently
  private formatError(error: any): any {
    if (!error) return 'Unknown error';
    
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: this.config.logLevel === 'verbose' ? error.stack : undefined,
      };
    }
    
    return error;
  }

  // Utility: Mask sensitive strings
  private maskString(input: string): string {
    if (!input) return '';
    
    const visible = 4;
    if (input.length <= visible * 2) {
      return '****';
    }
    
    return input.slice(0, visible) + '...' + input.slice(-visible);
  }
}

// Helper function to run diagnostics
export async function runSupabaseDiagnostics(
  supabaseUrl: string, 
  supabaseAnonKey: string,
  options: Partial<DebugConfig> = {}
): Promise<Record<string, DiagnosticResult>> {
  const debugger = new SupabaseDebugger({
    supabaseUrl,
    supabaseAnonKey,
    timeoutThreshold: options.timeoutThreshold || 5000,
    logLevel: options.logLevel || 'normal',
    networkTestCount: options.networkTestCount || 5,
    testEmail: options.testEmail,
    testPassword: options.testPassword
  });
  
  return await debugger.runFullDiagnostics();
}
