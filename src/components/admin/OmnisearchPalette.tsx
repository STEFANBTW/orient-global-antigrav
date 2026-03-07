import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoles } from '@/context/role-context';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, ChevronRight, LayoutDashboard, Globe, Zap, Box, ShoppingCart, 
  Trophy, Calendar, Store, Monitor, Truck, ShieldCheck, ChefHat, Wine, 
  Droplets, Gamepad2, Users, Palette, Timer, ShoppingBasket, BarChart3, 
  History, Inbox, Key
} from 'lucide-react';

const ACTION_DATABASE = [
  // Global Actions
  { id: 'global_dash', label: 'Global Dashboard', route: '/dashboard', role: 'admin_boss', keywords: ['home', 'root', 'main', 'global', 'boss'], icon: LayoutDashboard },
  { id: 'global_cms', label: 'Global Site Editor', route: '/dashboard/cms', role: 'admin_boss', keywords: ['cms', 'edit', 'site', 'website', 'pages', 'global'], icon: Globe },
  { id: 'global_inbox', label: 'Authorizations Inbox', route: '/dashboard/inbox', role: ['admin_boss', 'admin_head'], keywords: ['approvals', 'pending', 'tasks', 'inbox', 'auth'], icon: Inbox },
  { id: 'global_logs', label: 'Update History Logs', route: '/dashboard/logs', role: 'all', keywords: ['history', 'logs', 'audit', 'recent', 'changes'], icon: History },
  
  // Bakery Actions
  { id: 'bakery_queue', label: 'Bakery: Production Queue', route: '/dashboard/bakery', module: 'production', division: 'bakery', keywords: ['bake', 'oven', 'queue', 'production', 'bread'], icon: Timer },
  { id: 'bakery_catalog', label: 'Bakery: Pastry Menu', route: '/dashboard/bakery', module: 'catalog', division: 'bakery', keywords: ['pastry', 'menu', 'items', 'bread', 'croissant'], icon: ShoppingBasket },
  { id: 'bakery_orders', label: 'Bakery: Cake Orders', route: '/dashboard/bakery', module: 'configurator', division: 'bakery', keywords: ['cake', 'custom', 'orders', 'wedding', 'birthday'], icon: Palette },
  { id: 'bakery_cms', label: 'Bakery: Edit Landing Page', route: '/dashboard/bakery', module: 'cms', division: 'bakery', keywords: ['edit', 'cms', 'bakery site', 'landing'], icon: Globe },

  // Dining Actions
  { id: 'dining_menu', label: 'Dining: Menu Manager', route: '/dashboard/dining', module: 'menu', division: 'dining', keywords: ['menu', 'food', 'restaurant', 'dishes', 'prices'], icon: ChefHat },
  { id: 'dining_sommelier', label: 'Dining: Wine Vault', route: '/dashboard/dining', module: 'sommelier', division: 'dining', keywords: ['wine', 'vault', 'alcohol', 'drinks', 'bottle'], icon: Wine },
  { id: 'dining_reservations', label: 'Dining: Seating & Reservations', route: '/dashboard/dining', module: 'reservations', division: 'dining', keywords: ['reserve', 'book', 'table', 'seating', 'map'], icon: Calendar },
  { id: 'dining_cms', label: 'Dining: Edit Landing Page', route: '/dashboard/dining', module: 'cms', division: 'dining', keywords: ['edit', 'cms', 'restaurant site', 'landing'], icon: Globe },

  // Games Actions
  { id: 'games_hardware', label: 'Games: Hardware Map', route: '/dashboard/games', module: 'hardware', division: 'games', keywords: ['pc', 'rig', 'hardware', 'monitor', 'gpu', 'status'], icon: Monitor },
  { id: 'games_tournament', label: 'Games: Match Schedule', route: '/dashboard/games', module: 'tournament', division: 'games', keywords: ['tournament', 'match', 'esports', 'schedule', 'event'], icon: Trophy },
  { id: 'games_catalog', label: 'Games: Game Library', route: '/dashboard/games', module: 'library', division: 'games', keywords: ['games', 'library', 'catalog', 'vr', 'play'], icon: Gamepad2 },
  { id: 'games_cms', label: 'Games: Edit Landing Page', route: '/dashboard/games', module: 'cms', division: 'games', keywords: ['edit', 'cms', 'games site', 'landing'], icon: Globe },

  // Lounge Actions
  { id: 'lounge_mixology', label: 'Lounge: Mixology Lab', route: '/dashboard/lounge', module: 'lab', division: 'lounge', keywords: ['mixology', 'lab', 'drinks', 'test', 'cocktail'], icon: Zap },
  { id: 'lounge_menu', label: 'Lounge: Bar Menu', route: '/dashboard/lounge', module: 'menu', division: 'lounge', keywords: ['bar', 'menu', 'drinks', 'prices', 'alcohol'], icon: Wine },
  { id: 'lounge_guests', label: 'Lounge: Guest List', route: '/dashboard/lounge', module: 'bookings', division: 'lounge', keywords: ['guest', 'list', 'vip', 'booking', 'door'], icon: Users },
  { id: 'lounge_cms', label: 'Lounge: Edit Landing Page', route: '/dashboard/lounge', module: 'cms', division: 'lounge', keywords: ['edit', 'cms', 'lounge site', 'landing'], icon: Globe },

  // Market Actions
  { id: 'market_inventory', label: 'Market: Stock Master', route: '/dashboard/market', module: 'inventory', division: 'market', keywords: ['stock', 'inventory', 'items', 'products', 'levels'], icon: Box },
  { id: 'market_ai', label: 'Market: AI Analytics', route: '/dashboard/market', module: 'ai', division: 'market', keywords: ['ai', 'analytics', 'predictive', 'data', 'restock'], icon: BarChart3 },
  { id: 'market_wholesale', label: 'Market: Bulk Orders', route: '/dashboard/market', module: 'wholesale', division: 'market', keywords: ['wholesale', 'bulk', 'orders', 'pallet', 'b2b'], icon: ShoppingCart },
  { id: 'market_cms', label: 'Market: Edit Landing Page', route: '/dashboard/market', module: 'cms', division: 'market', keywords: ['edit', 'cms', 'market site', 'landing'], icon: Globe },

  // Water Actions
  { id: 'water_purity', label: 'Water: Purity Reports', route: '/dashboard/water', module: 'quality', division: 'water', keywords: ['purity', 'reports', 'quality', 'water', 'lab'], icon: ShieldCheck },
  { id: 'water_logistics', label: 'Water: Fleet & Logistics', route: '/dashboard/water', module: 'logistics', division: 'water', keywords: ['fleet', 'logistics', 'truck', 'delivery', 'route'], icon: Truck },
  { id: 'water_impact', label: 'Water: Social Metrics', route: '/dashboard/water', module: 'impact', division: 'water', keywords: ['impact', 'social', 'metrics', 'sustainability', 'recycle'], icon: BarChart3 },
  { id: 'water_cms', label: 'Water: Edit Landing Page', route: '/dashboard/water', module: 'cms', division: 'water', keywords: ['edit', 'cms', 'water site', 'landing'], icon: Globe },
];

export function OmnisearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { currentUser, setActiveModule } = useRoles();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const availableActions = useMemo(() => {
    if (!currentUser) return [];
    
    return ACTION_DATABASE.filter(action => {
      // Check Division Permissions
      if (action.division) {
        if (currentUser.division !== action.division) return false;
      }
      
      return true;
    });
  }, [currentUser]);

  const filteredActions = useMemo(() => {
    if (!query) return availableActions.slice(0, 8); // show some defaults if no query
    
    const lowerQuery = query.toLowerCase();
    return availableActions.filter(action => {
      return (
        action.label.toLowerCase().includes(lowerQuery) ||
        action.keywords.some(k => k.includes(lowerQuery))
      );
    });
  }, [query, availableActions]);

  const handleSelect = (action: any) => {
    setOpen(false);
    setQuery('');
    if (action.module) {
        setActiveModule(action.module);
    }
    navigate(action.route);
  };

  if (!currentUser) return null;

  return (
    <>
      {/* Invisible trigger to satisfying accessibility requirements if needed */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-border bg-background shadow-elite gap-0">
          <DialogTitle className="sr-only">Omnisearch</DialogTitle>
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground text-foreground"
              placeholder="Type a command or search... (e.g. 'menu', 'edit')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex items-center gap-1 shrink-0 ml-3">
              <kbd className="bg-slate-100 dark:bg-slate-800 border border-border rounded px-1.5 py-0.5 text-[10px] uppercase font-bold text-muted-foreground">esc</kbd>
            </div>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filteredActions.length === 0 ? (
              <div className="py-14 text-center text-sm text-muted-foreground">
                No results found for "{query}".
              </div>
            ) : (
              <div className="space-y-1">
                {filteredActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleSelect(action)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white dark:bg-black/20 p-2 shadow-soft border border-border rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors group-hover:border-primary">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{action.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-border text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
            <span>Orient Management Systems</span>
            <span>Use ↑ ↓ to navigate, Enter to select</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
