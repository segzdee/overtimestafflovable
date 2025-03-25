
/**
 * Register service worker for PWA functionality
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
}

/**
 * Check if the user can install the PWA
 */
export function checkInstallability() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    (window as any).deferredPrompt = e;
    
    // Update UI to notify the user they can add to home screen
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'block';
      
      installButton.addEventListener('click', () => {
        // Show the install prompt
        const promptEvent = (window as any).deferredPrompt;
        if (promptEvent) {
          promptEvent.prompt();
          
          // Wait for the user to respond to the prompt
          promptEvent.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
            // Clear the saved prompt
            (window as any).deferredPrompt = null;
            
            // Hide the install button
            installButton.style.display = 'none';
          });
        }
      });
    }
  });
}

/**
 * Check if the app is being used in standalone mode (PWA)
 */
export function isInStandaloneMode() {
  return (window.matchMedia('(display-mode: standalone)').matches) || 
         ((window.navigator as any).standalone) || 
         document.referrer.includes('android-app://');
}

/**
 * Initialize PWA features
 */
export function initializePWA() {
  registerServiceWorker();
  checkInstallability();
  
  // Additional PWA initializations can be added here
}
