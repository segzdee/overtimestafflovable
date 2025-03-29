
/**
 * Utility functions for monitoring and handling online/offline status
 */

// Function to start monitoring online status
export const startOnlineStatusMonitoring = () => {
  const handleStatusChange = () => {
    const isOnline = navigator.onLine;
    console.log(`Connection status: ${isOnline ? 'Online' : 'Offline'}`);
    
    // Dispatch a custom event that components can listen to
    window.dispatchEvent(
      new CustomEvent('connectionStatusChange', { detail: { isOnline } })
    );
    
    // Show a notification to the user
    if (!isOnline) {
      showOfflineNotification();
    } else {
      showOnlineNotification();
    }
  };

  // Add event listeners for online/offline events
  window.addEventListener('online', handleStatusChange);
  window.addEventListener('offline', handleStatusChange);
  
  // Initial check
  handleStatusChange();
  
  // Return a function to remove event listeners (for cleanup)
  return () => {
    window.removeEventListener('online', handleStatusChange);
    window.removeEventListener('offline', handleStatusChange);
  };
};

// Helper functions for notifications
const showOfflineNotification = () => {
  if (!('Notification' in window)) return;
  
  // Use browser notifications if available and permitted
  if (Notification.permission === 'granted') {
    new Notification('Connection lost', {
      body: 'You are currently offline. Some features may be unavailable.',
      icon: '/favicon.ico'
    });
  }
  
  // Show UI notification
  const offlineToast = document.createElement('div');
  offlineToast.id = 'offline-toast';
  offlineToast.className = 'fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
  offlineToast.textContent = 'You are offline. Some features may be unavailable.';
  document.body.appendChild(offlineToast);
  
  // Remove after 5 seconds
  setTimeout(() => {
    const toast = document.getElementById('offline-toast');
    if (toast) document.body.removeChild(toast);
  }, 5000);
};

const showOnlineNotification = () => {
  // Remove offline toast if it exists
  const offlineToast = document.getElementById('offline-toast');
  if (offlineToast) document.body.removeChild(offlineToast);
  
  // Show online toast
  const onlineToast = document.createElement('div');
  onlineToast.id = 'online-toast';
  onlineToast.className = 'fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
  onlineToast.textContent = 'You are back online!';
  document.body.appendChild(onlineToast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    const toast = document.getElementById('online-toast');
    if (toast) document.body.removeChild(toast);
  }, 3000);
};

// Use this function to check current online status
export const isOnline = () => navigator.onLine;
