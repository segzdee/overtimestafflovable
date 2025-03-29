
import React from 'react';
import { useOnlineStatus } from '@/lib/robust-connection-handler';

export const ConnectionStatus = () => {
  const { status } = useOnlineStatus();
  
  if (status === 'online') return null;
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 p-2 text-center text-sm text-white 
      ${status === 'reconnecting' ? 'bg-yellow-500' : 'bg-red-500'}`}>
      {status === 'reconnecting' ? 'Reconnecting...' : 'You are currently offline'}
    </div>
  );
};

export default ConnectionStatus;
