
import React from 'react';
import ShiftWorkerContent from '@/features/shift-worker/components/ShiftWorkerContent';
import ShiftWorkerSidebar from '@/features/shift-worker/components/ShiftWorkerSidebar';
import DesktopHeader from '@/features/shift-worker/components/DesktopHeader';
import MobileHeader from '@/features/shift-worker/components/MobileHeader';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { DebugButton } from '@/components/debug/DebugButton';

function ShiftWorkerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopHeader />
      <MobileHeader />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ConnectionStatus />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ShiftWorkerSidebar />
          <ShiftWorkerContent />
        </div>
      </div>
      
      <DebugButton />
    </div>
  );
}

export default ShiftWorkerDashboard;
