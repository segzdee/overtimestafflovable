
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { isInStandaloneMode } from '@/utils/pwa';

export function InstallPwaButton() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  
  useEffect(() => {
    // Don't show install button if already in standalone mode
    if (isInStandaloneMode()) {
      setShowInstallButton(false);
      return;
    }
    
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      (window as any).deferredPrompt = e;
      setShowInstallButton(true);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  const handleInstallClick = () => {
    const promptEvent = (window as any).deferredPrompt;
    
    if (!promptEvent) {
      return;
    }
    
    // Show the install prompt
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
      setShowInstallButton(false);
    });
  };
  
  if (!showInstallButton) {
    return null;
  }
  
  return (
    <Button
      id="install-button"
      onClick={handleInstallClick}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}
