import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevMode } from '@/contexts/dev/DevModeContext';

export default function FindShifts() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate(); // Using navigate instead of router
  const { devMode, selectedRole } = useDevMode();

  useEffect(() => {
    // If in dev mode and a role is selected, consider the user logged in
    if (devMode && selectedRole) {
      setIsLoggedIn(true);
      setShowLoginPrompt(false);
      return;
    }

    // Check if user is logged in (this would be replaced with your actual auth check)
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('userToken') !== null;
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        setShowLoginPrompt(true);
      }
    };

    checkLoginStatus();
  }, [devMode, selectedRole]);

  const handleLoginRedirect = () => {
    navigate('/login'); // Using navigate instead of router.push
  };

  const handleMarketRedirect = () => {
    navigate('/live-market');
  };
  
  // Redirect to the live market
  useEffect(() => {
    handleMarketRedirect();
  }, []);
  
  return (
    <div className="container mx-auto py-8">
      <p>Redirecting to Live Market...</p>
    </div>
  );
}
