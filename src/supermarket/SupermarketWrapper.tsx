import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import LuxeStorefront from './pages/LuxeStorefront';
import Wholesale from './pages/Wholesale';
import Deals from './pages/Deals';
import UserDashboard from './pages/UserDashboard';
import SmartPaste from './pages/SmartPaste';
import Cart from './pages/Cart';
import Produce from './pages/Produce';
import Aisles from './pages/Aisles';
import PreviouslyBought from './pages/PreviouslyBought';
import BOGOF from './pages/BOGOF';
import Under5 from './pages/Under5';
import Bundles from './pages/Bundles';
import Bakery from './pages/Bakery';
import Receipts from './pages/Receipts';
import Favorites from './pages/Favorites';
import Loyalty from './pages/Loyalty';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { MarketNarrativeArc } from './NarrativeArc';

export type SupermarketPage = 'Home' | 'Wholesale' | 'Deals' | 'Dashboard' | 'Cart' | 'Produce' | 'Aisles' | 'PreviouslyBought' | 'BOGOF' | 'Under5' | 'Bundles' | 'Bakery' | 'Receipts' | 'Favorites' | 'Loyalty' | 'Settings' | 'Login' | 'Register';

export const SupermarketNav: React.FC<{
  navHidden?: boolean,
  activePage: SupermarketPage,
  setActivePage: (p: SupermarketPage) => void,
  setIsSmartPasteOpen: (o: boolean) => void,
  localTheme?: 'dark' | 'light',
  toggleLocalTheme?: () => void,
  scrolled?: boolean,
  isAppNavHovered?: boolean,
  onHoverChange?: (hovered: boolean) => void,
  heroOutOfView?: boolean,
  searchOutOfView?: boolean,
  searchTerm?: string,
  onSearch?: (term: string) => void
}> = ({
  activePage,
  setActivePage,
  setIsSmartPasteOpen,
  isAppNavHovered = false,
  onHoverChange,
  heroOutOfView = false,
  searchOutOfView = false,
  searchTerm = '',
  onSearch
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 1024);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const pages: { id: SupermarketPage; label: string; icon: string }[] = [
      { id: 'Home', label: 'Storefront', icon: 'storefront' },
      { id: 'Aisles', label: 'Aisles', icon: 'reorder' },
      { id: 'Produce', label: 'Produce', icon: 'eco' },
      { id: 'Deals', label: 'Deals', icon: 'local_offer' },
      { id: 'Wholesale', label: 'Wholesale', icon: 'inventory_2' },
      { id: 'Dashboard', label: 'Dashboard', icon: 'dashboard' },
    ];

    return (
      <nav
        className={`transition-all duration-500 sticky top-0 w-full z-40 h-[68px] theme-transition`}
        style={{
          backgroundColor: heroOutOfView
            ? 'var(--color-bg-light)' // Should resolve using theme vars
            : (isAppNavHovered ? 'var(--color-bg-light)' : 'var(--color-bg-light)'),
          backdropFilter: 'blur(20px)',
          borderBottom: heroOutOfView ? '1px solid rgba(128, 128, 128, 0.2)' : '1px solid transparent',
          boxShadow: heroOutOfView ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' : 'none',
        }}
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
      >
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-[68px]">
            <div className="flex items-center gap-2 mr-3 sm:mr-8 shrink-0 cursor-pointer" onClick={() => setActivePage('Home')}>
              <motion.span
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
                className="material-icons text-[var(--color-accent-light)] text-xl sm:text-2xl"
              >
                api
              </motion.span>
              <span className="font-bold tracking-tight text-base sm:text-lg">Orient<span className="font-normal text-slate-400">Suite</span></span>
            </div>
            <div className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar px-2">
              {!isSearchExpanded && pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  className={`relative flex items-center gap-3 px-4 py-2 rounded-full text-[clamp(0.9rem,1.2vw,1.1rem)] font-bold transition-all whitespace-nowrap z-10 ${activePage === page.id
                    ? 'text-slate-900 font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                >
                  {activePage === page.id && (
                    <motion.div
                      layoutId="nav-pill-sm"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="material-icons text-base">{page.icon}</span>
                  <span className="hidden sm:inline">{page.label}</span>
                </button>
              ))}

              <div className="flex items-center gap-1 flex-1 justify-end">
                <div className="w-px h-6 bg-slate-700 mx-1 sm:mx-2 shrink-0"></div>

                <AnimatePresence mode="wait">
                  {searchOutOfView && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{
                        opacity: 1,
                        width: isSearchExpanded ? (isMobile ? '100%' : '300px') : 'auto'
                      }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex items-center bg-slate-800/50 rounded-full overflow-hidden border border-slate-700 mx-1"
                    >
                      {isSearchExpanded ? (
                        <div className="flex items-center w-full px-3 py-1">
                          <span className="material-icons text-slate-400 text-sm mr-2">search</span>
                          <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearch?.(e.target.value)}
                            placeholder="Search products..."
                            className="bg-transparent border-none focus:ring-0 text-white text-xs w-full p-0"
                            onBlur={() => !searchTerm && setIsSearchExpanded(false)}
                          />
                          <button onClick={() => setIsSearchExpanded(false)} className="text-slate-400 hover:text-white ml-2">
                            <span className="material-icons text-sm">close</span>
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsSearchExpanded(true)}
                          className="p-2 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          <span className="material-icons text-sm">search</span>
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSmartPasteOpen(true)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full text-[clamp(0.9rem,1.2vw,1.1rem)] font-bold transition-all whitespace-nowrap text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <span className="material-icons text-sm">content_paste</span>
                  <span className="hidden sm:inline">Smart Paste</span>
                </motion.button>
              </div>
            </div>

            <div className="flex items-center ml-2 sm:ml-4 gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() => setActivePage('Cart')}
                className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ${activePage === 'Cart' ? 'text-[var(--color-accent-light)]' : 'text-slate-300 hover:text-white'}`}
              >
                <span className="material-icons text-base">shopping_cart</span> <span className="hidden xs:inline">Cart</span>
              </button>
              <div className="hidden sm:block w-px h-5 bg-slate-700"></div>
              <button onClick={() => setActivePage('Login')} className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white flex items-center gap-1.5">
                <span className="material-icons text-base">login</span> <span className="hidden sm:inline">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  };

export const SupermarketApp: React.FC<{
  activePage: SupermarketPage,
  setActivePage: (p: SupermarketPage) => void,
  isSmartPasteOpen: boolean,
  setIsSmartPasteOpen: (o: boolean) => void,
  searchOutOfView?: boolean,
  setSearchOutOfView?: (v: boolean) => void,
  searchTerm?: string,
  setSearchTerm?: (s: string) => void
}> = ({
  activePage,
  setActivePage,
  isSmartPasteOpen,
  setIsSmartPasteOpen,
  searchOutOfView = false,
  setSearchOutOfView,
  searchTerm = '',
  setSearchTerm
}) => {
    const [storefrontView, setStorefrontView] = useState('home');
    const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);

    // Scroll to top on page change
    useEffect(() => {
      if (!pendingAnchor) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [activePage, pendingAnchor]);

    const navigateWithAnchor = (target: string) => {
      if (target.includes('#')) {
        const [page, anchor] = target.split('#');
        setActivePage(page as SupermarketPage);
        setPendingAnchor(anchor);
      } else {
        setPendingAnchor(null);
        setActivePage(target as SupermarketPage);
      }
    };

    const renderContent = () => {
      if (activePage === 'Login') return <Login onNavigate={setActivePage} />;
      if (activePage === 'Register') return <Register onNavigate={setActivePage} />;

      return (
        <div className="min-h-screen flex flex-col font-sans relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <main className="flex-1 relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="min-h-full"
              >
                {activePage === 'Home' && (
                  <>
                    {storefrontView === 'home' && <MarketNarrativeArc />}
                    <LuxeStorefront
                      onNavigate={navigateWithAnchor}
                      onOpenSmartPaste={() => setIsSmartPasteOpen(true)}
                      onSearchOutOfView={setSearchOutOfView}
                      extSearchTerm={searchTerm}
                      onExtSearchChange={setSearchTerm}
                      onViewChange={setStorefrontView}
                      pendingAnchor={pendingAnchor}
                      clearAnchor={() => setPendingAnchor(null)}
                    />
                  </>
                )}
                {activePage === 'Wholesale' && <Wholesale />}
                {activePage === 'Deals' && <Deals onNavigate={navigateWithAnchor} />}
                {activePage === 'Dashboard' && <UserDashboard onNavigate={navigateWithAnchor} />}
                {activePage === 'Cart' && <Cart />}
                {activePage === 'Produce' && <Produce onNavigate={navigateWithAnchor} />}
                {activePage === 'Aisles' && <Aisles onNavigate={navigateWithAnchor} />}
                {activePage === 'PreviouslyBought' && <PreviouslyBought onNavigate={navigateWithAnchor} />}
                {activePage === 'BOGOF' && <BOGOF onNavigate={navigateWithAnchor} />}
                {activePage === 'Under5' && <Under5 onNavigate={navigateWithAnchor} />}
                {activePage === 'Bundles' && <Bundles onNavigate={navigateWithAnchor} />}
                {activePage === 'Bakery' && <Bakery onNavigate={navigateWithAnchor} />}
                {activePage === 'Receipts' && <Receipts onNavigate={navigateWithAnchor} />}
                {activePage === 'Favorites' && <Favorites onNavigate={navigateWithAnchor} />}
                {activePage === 'Loyalty' && <Loyalty onNavigate={navigateWithAnchor} />}
                {activePage === 'Settings' && <Settings onNavigate={navigateWithAnchor} />}
              </motion.div>
            </AnimatePresence>
          </main>

          <AnimatePresence>
            {isSmartPasteOpen && <SmartPaste onClose={() => setIsSmartPasteOpen(false)} />}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <AuthProvider>
        <CartProvider>
          {renderContent()}
        </CartProvider>
      </AuthProvider>
    );
  };
