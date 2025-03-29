
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Briefcase,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  Bell,
  Calendar,
  Clock,
  Activity,
  Building,
  Users,
  ChevronDown,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useOnlineStatus } from '@/lib/robust-connection-handler';

// Custom hook for mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Nav item type
interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
  badge?: string;
}

// Connection Status Component
const ConnectionStatus = () => {
  const { status } = useOnlineStatus();
  
  if (status === 'online') return null;
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 p-2 text-center text-sm text-white 
      ${status === 'reconnecting' ? 'bg-yellow-500' : 'bg-red-500'}`}>
      {status === 'reconnecting' ? 'Reconnecting...' : 'You are currently offline'}
    </div>
  );
};

// Function to get current page title from path
const getCurrentTitle = (path: string, navItems: NavItem[]): string => {
  const matchingItem = navItems.find(item => item.path === path);
  return matchingItem?.title || 'Dashboard';
};

// Mobile Sidebar Component
const MobileSidebar = ({
  navItems,
  user,
  currentPath,
  onLogout
}: {
  navItems: NavItem[];
  user: any;
  currentPath: string;
  onLogout: () => void;
}) => {
  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar_url || ''} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPath === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
              {item.badge && (
                <Badge className="ml-auto bg-primary/20 text-primary">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto px-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

// Desktop Sidebar Component
const DesktopSidebar = ({
  navItems,
  user,
  currentPath,
  onLogout
}: {
  navItems: NavItem[];
  user: any;
  currentPath: string;
  onLogout: () => void;
}) => {
  return (
    <>
      <div className="p-6 flex items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">OVERTIME<span className="text-primary">STAFF</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-6 px-3">
          <div className="flex items-center space-x-3 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar_url || ''} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <Badge variant="outline" className="mt-1">
                {user.role?.charAt(0).toUpperCase() + user.role?.slice(1).replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPath === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
              {item.badge && (
                <Badge className="ml-auto bg-primary/20 text-primary">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </>
  );
};

export function DashboardLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  // Define navigation items based on user role
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      path: `/dashboard/${user?.role || ''}`,
      icon: <Home className="h-5 w-5" />,
      roles: ['admin', 'shift-worker', 'company', 'agency', 'aiagent']
    },
    {
      title: 'My Profile',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
      roles: ['admin', 'shift-worker', 'company', 'agency', 'aiagent']
    },
    {
      title: 'Shifts',
      path: '/shifts',
      icon: <Calendar className="h-5 w-5" />,
      roles: ['shift-worker', 'company', 'agency'],
      badge: 'New'
    },
    {
      title: 'Timesheets',
      path: '/timesheets',
      icon: <Clock className="h-5 w-5" />,
      roles: ['shift-worker', 'company', 'agency']
    },
    {
      title: 'Company Management',
      path: '/company-management',
      icon: <Building className="h-5 w-5" />,
      roles: ['company']
    },
    {
      title: 'Worker Management',
      path: '/worker-management',
      icon: <Users className="h-5 w-5" />,
      roles: ['agency']
    },
    {
      title: 'Agency Management',
      path: '/agency-management',
      icon: <Briefcase className="h-5 w-5" />,
      roles: ['agency']
    },
    {
      title: 'AI Assistant',
      path: '/ai-assistant',
      icon: <Activity className="h-5 w-5" />,
      roles: ['admin', 'shift-worker', 'company', 'agency', 'aiagent']
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: ['admin', 'shift-worker', 'company', 'agency', 'aiagent']
    }
  ];

  // Filter navItems based on user role
  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  // Handle sidebar toggle for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile, sidebarOpen]);

  if (!user) {
    return <div className="p-8 text-center">Please log in to view this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-40"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 max-w-xs">
            <MobileSidebar 
              navItems={filteredNavItems} 
              user={user} 
              currentPath={location.pathname} 
              onLogout={handleLogout}
            />
          </SheetContent>
        </Sheet>
      )}
      
      {/* Desktop sidebar */}
      {!isMobile && (
        <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
          <DesktopSidebar 
            navItems={filteredNavItems} 
            user={user} 
            currentPath={location.pathname} 
            onLogout={handleLogout}
          />
        </aside>
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          <div className="flex items-center">
            {/* Left side - visible on mobile */}
            {isMobile && (
              <div className="w-10"></div> {/* Spacer for mobile toggle button */}
            )}
            
            {/* Title */}
            <h1 className="text-xl font-semibold ml-2">
              {getCurrentTitle(location.pathname, filteredNavItems)}
            </h1>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 px-1.5 h-5 bg-red-500">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url || ''} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  {!isMobile && (
                    <>
                      <span className="ml-2">{user.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
        
        {/* Connection status indicator */}
        <ConnectionStatus />
      </div>
    </div>
  );
}

export default DashboardLayout;
