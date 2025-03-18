
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileMenuButton } from "@/components/layout/MobileMenuButton";
import { ContentWrapper } from "@/components/layout/ContentWrapper";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Mobile Menu Button */}
      <MobileMenuButton sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className={cn(
        "min-h-screen transition-all duration-300 ease-in-out",
        "lg:ml-64 bg-[#f8f9fc]"
      )}>
        {/* Header Component */}
        <Header notifications={notifications} />

        {/* Content */}
        <ContentWrapper className={className}>
          {children}
        </ContentWrapper>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-40 animate-fadeIn backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
