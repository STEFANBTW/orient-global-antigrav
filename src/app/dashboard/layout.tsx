
'use client';

import React, { useEffect, useMemo } from "react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarTrigger, 
  SidebarInset 
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Inbox, 
  ChefHat, 
  Store, 
  Utensils, 
  Gamepad2, 
  Wine as WineIcon, 
  Droplets, 
  ShieldCheck, 
  LogOut, 
  ChevronRight,
  Globe,
  Users,
  Timer,
  ShoppingBasket,
  Palette,
  Calendar,
  Monitor,
  Trophy,
  Zap,
  Truck,
  BarChart3,
  Box,
  Cpu,
  ShoppingCart,
  History
} from "lucide-react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useRoles } from "@/context/role-context";
import { Toaster } from "@/components/ui/toaster";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const divisionIcons: Record<string, any> = {
  bakery: ChefHat,
  market: Store,
  dining: Utensils,
  games: Gamepad2,
  lounge: WineIcon,
  water: Droplets,
  global: Globe
};

const divisionModules: Record<string, any[]> = {
  bakery: [
    { id: 'production', label: 'Baking Queue', icon: Timer },
    { id: 'catalog', label: 'Pastry Menu', icon: ShoppingBasket },
    { id: 'configurator', label: 'Cake Orders', icon: Palette },
    { id: 'cms', label: 'Site Content', icon: Globe },
  ],
  dining: [
    { id: 'menu', label: 'Menu Manager', icon: ChefHat },
    { id: 'sommelier', label: 'Wine Vault', icon: WineIcon },
    { id: 'reservations', label: 'Seating Map', icon: Calendar },
    { id: 'cms', label: 'Site Content', icon: Globe },
  ],
  games: [
    { id: 'hardware', label: 'Hardware Map', icon: Monitor },
    { id: 'tournament', label: 'Match Schedule', icon: Trophy },
    { id: 'library', label: 'Game Catalog', icon: Gamepad2 },
    { id: 'cms', label: 'Site Content', icon: Globe },
  ],
  lounge: [
    { id: 'lab', label: 'Mixology Lab', icon: Zap },
    { id: 'menu', label: 'Bar Menu', icon: WineIcon },
    { id: 'bookings', label: 'Guest List', icon: Users },
    { id: 'cms', label: 'Site Content', icon: Globe },
  ],
  market: [
    { id: 'inventory', label: 'Stock Master', icon: Box },
    { id: 'ai', label: 'AI Analytics', icon: Cpu },
    { id: 'wholesale', label: 'Bulk Orders', icon: ShoppingCart },
    { id: 'cms', label: 'Site Content', icon: Globe },
  ],
  water: [
    { id: 'quality', label: 'Purity Reports', icon: ShieldCheck },
    { id: 'logistics', label: 'Fleet Status', icon: Truck },
    { id: 'impact', label: 'Social Metrics', icon: BarChart3 },
    { id: 'cms', label: 'Site Content', icon: Globe },
  ],
};

export default function DashboardLayout() {
  const { currentUser, setCurrentUser, activeModule, setActiveModule, requests } = useRoles();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      if (typeof window !== 'undefined') navigate('/login', { replace: true });
    }
  }, [currentUser, navigate]);

  const activeDivisionContext = useMemo(() => {
    if (!currentUser) return null;
    const parts = pathname.split('/');
    const urlDivision = parts[2];
    
    if (urlDivision && divisionModules[urlDivision]) {
      return urlDivision;
    }
    
    if (currentUser.role !== 'admin_boss') {
      return currentUser.division;
    }
    
    return null;
  }, [pathname, currentUser]);

  useEffect(() => {
    if (activeDivisionContext && divisionModules[activeDivisionContext]) {
      if (!activeModule || !divisionModules[activeDivisionContext].find(m => m.id === activeModule)) {
        setActiveModule(divisionModules[activeDivisionContext][0].id);
      }
    }
  }, [activeDivisionContext, activeModule, setActiveModule]);

  if (!currentUser) return null;

  const isBoss = currentUser.role === 'admin_boss';

  const pendingCount = requests.filter(r => {
    if (isBoss) return r.status === 'pending';
    if (currentUser.role === 'admin_head') return r.division === currentUser.division && r.status === 'pending';
    return false;
  }).length;

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 font-body text-slate-900">
        <Sidebar className="border-r border-slate-200 bg-white" collapsible="icon">
          <SidebarHeader className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg shadow-md shadow-primary/20 shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none uppercase italic">ORIENT</h1>
                <p className="text-[9px] text-primary font-bold uppercase tracking-[0.2em] mt-1">Management Portal</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2 md:px-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2 group-data-[collapsible=icon]:hidden">
                General
              </SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard'} className="h-11 rounded-lg mb-1 data-[active=true]:bg-primary data-[active=true]:text-white">
                    <Link to="/dashboard" className="flex items-center gap-3 px-3">
                      <LayoutDashboard className="w-4 h-4" />
                      <span className="font-bold text-[10px] uppercase tracking-widest group-data-[collapsible=icon]:hidden">
                        {isBoss ? "Global Dashboard" : "My Workspace"}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {(isBoss || currentUser.role === 'admin_head') && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/dashboard/inbox'} className="h-11 rounded-lg mb-1 data-[active=true]:bg-primary data-[active=true]:text-white">
                      <Link to="/dashboard/inbox" className="flex items-center gap-3 px-3">
                        <Inbox className="w-4 h-4" />
                        <span className="font-bold text-[10px] uppercase tracking-widest group-data-[collapsible=icon]:hidden">Authorizations</span>
                        {pendingCount > 0 && (
                          <Badge className="ml-auto bg-primary-foreground text-primary text-[8px] h-4 min-w-[1rem] px-1 border-none font-bold group-data-[collapsible=icon]:hidden">
                            {pendingCount}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard/logs'} className="h-11 rounded-lg mb-1 data-[active=true]:bg-primary data-[active=true]:text-white">
                    <Link to="/dashboard/logs" className="flex items-center gap-3 px-3">
                      <History className="w-4 h-4" />
                      <span className="font-bold text-[10px] uppercase tracking-widest group-data-[collapsible=icon]:hidden">Update History</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {isBoss && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/dashboard/cms'} className="h-11 rounded-lg mb-1 data-[active=true]:bg-primary data-[active=true]:text-white">
                      <Link to="/dashboard/cms" className="flex items-center gap-3 px-3">
                        <Palette className="w-4 h-4" />
                        <span className="font-bold text-[10px] uppercase tracking-widest group-data-[collapsible=icon]:hidden">Site Editor</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroup>

            {activeDivisionContext && divisionModules[activeDivisionContext] && (
              <SidebarGroup className="mt-4">
                <SidebarGroupLabel className="px-4 text-[9px] font-bold uppercase tracking-[0.3em] text-primary mb-2 group-data-[collapsible=icon]:hidden">
                  Operational Menu
                </SidebarGroupLabel>
                <SidebarMenu>
                  {divisionModules[activeDivisionContext].map((module) => (
                    <SidebarMenuItem key={module.id}>
                      <SidebarMenuButton 
                        isActive={activeModule === module.id}
                        onClick={() => setActiveModule(module.id)}
                        className="h-11 rounded-lg mb-1 data-[active=true]:bg-primary data-[active=true]:text-white"
                      >
                        <div className="flex items-center gap-3 px-3 w-full">
                          <module.icon className="w-4 h-4" />
                          <span className="font-bold text-[10px] uppercase tracking-widest truncate group-data-[collapsible=icon]:hidden">{module.label}</span>
                          {activeModule === module.id && <ChevronRight className="ml-auto w-3 h-3 group-data-[collapsible=icon]:hidden" />}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            )}

            {isBoss && (
              <SidebarGroup className="mt-4">
                <SidebarGroupLabel className="px-4 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2 group-data-[collapsible=icon]:hidden">
                  Node Inspection
                </SidebarGroupLabel>
                <SidebarMenu>
                  {['bakery', 'dining', 'games', 'lounge', 'market', 'water'].map((div) => {
                    const Icon = divisionIcons[div];
                    const href = `/dashboard/${div}`;
                    return (
                      <SidebarMenuItem key={div}>
                        <SidebarMenuButton 
                          asChild
                          isActive={pathname === href}
                          className="h-11 rounded-lg mb-1 data-[active=true]:bg-slate-200 data-[active=true]:text-slate-900"
                        >
                          <Link to={href} className="flex items-center gap-3 px-3 w-full">
                            <Icon className="w-4 h-4" />
                            <span className="font-bold text-[10px] uppercase tracking-widest truncate group-data-[collapsible=icon]:hidden">{div}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            )}
          </SidebarContent>

          <div className="mt-auto p-4 md:p-6 border-t border-slate-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer group hover:bg-slate-100 p-2 rounded-xl transition-colors">
                  <Avatar className="h-9 w-9 border border-slate-200">
                    <AvatarFallback className="bg-primary text-white font-bold text-[10px]">{currentUser.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                    <span className="text-[10px] font-bold text-slate-900 truncate uppercase tracking-tight">{currentUser.name}</span>
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest truncate">
                      {currentUser.role === 'admin_boss' ? 'Director' : currentUser.role === 'admin_head' ? 'Manager' : 'Staff'}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-[10px] uppercase font-bold tracking-widest">Personnel Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-600 focus:bg-red-50 cursor-pointer text-xs uppercase tracking-widest font-bold py-2"
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col bg-slate-50 max-w-full overflow-hidden">
          <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-200 bg-white sticky top-0 z-50">
            <div className="flex items-center gap-3 md:gap-6">
              <SidebarTrigger className="text-slate-400 hover:text-primary h-9 w-9 border border-slate-200 rounded-lg shrink-0" />
              <div className="h-5 w-px bg-slate-200 hidden sm:block" />
              <div className="min-w-0">
                <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] leading-none mb-1 hidden xs:block">Personnel Status</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-900 tracking-widest uppercase italic truncate max-w-[120px] xs:max-w-none">
                    {isBoss ? "Global System Online" : `Division Node: ${currentUser.division.toUpperCase()}`}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-slate-200 text-[8px] tracking-widest uppercase bg-slate-50 px-3 py-1 text-slate-500 font-bold hidden sm:flex shrink-0">
                Clearance Tier 0{isBoss ? '1' : currentUser.role === 'admin_head' ? '2' : '3'}
              </Badge>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-[2000px] mx-auto w-full">
            <Outlet />
          </main>
        </SidebarInset>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
