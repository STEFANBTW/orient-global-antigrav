import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Wholesale from './pages/Wholesale';
import Deals from './pages/Deals';
import Dashboard from './pages/Dashboard';
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

export type SupermarketPage = 'Home' | 'Wholesale' | 'Deals' | 'Dashboard' | 'Cart' | 'Produce' | 'Aisles' | 'PreviouslyBought' | 'BOGOF' | 'Under5' | 'Bundles' | 'Bakery' | 'Receipts' | 'Favorites' | 'Loyalty' | 'Settings' | 'Login' | 'Register';

export const SupermarketNav: React.FC<{ navHidden: boolean, activePage: SupermarketPage, setActivePage: (p: SupermarketPage) => void, setIsSmartPasteOpen: (o: boolean) => void, localTheme?: 'dark'|'light', toggleLocalTheme?: () => void }> = ({ navHidden, activePage, setActivePage, setIsSmartPasteOpen, localTheme, toggleLocalTheme }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pages: { id: SupermarketPage; label: string; icon: string }[] = [
    { id: 'Home', label: 'Storefront', icon: 'storefront' },
    { id: 'Produce', label: 'Produce', icon: 'eco' },
    { id: 'Deals', label: 'Deals', icon: 'local_offer' },
    { id: 'Wholesale', label: 'Wholesale', icon: 'inventory_2' },
    { id: 'Dashboard', label: 'Dashboard', icon: 'dashboard' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: navHidden ? -100 : 0 }}
      transition={{ duration: navHidden ? 0.1 : 0.4, ease: "easeOut" }}
      className="bg-slate-900/90 backdrop-blur-md text-white border-b border-white/10 sticky top-12 sm:top-14 w-full z-40 shadow-lg"
    >
      <div className="max-w-[1600px] mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1 mr-2 sm:mr-6 shrink-0 cursor-pointer" onClick={() => setActivePage('Home')}>
             <motion.span 
               whileHover={{ rotate: 180 }}
               transition={{ duration: 0.6 }}
               className="material-icons text-orange-500 text-lg sm:text-xl"
             >
               api
             </motion.span>
             <span className="font-bold tracking-tight text-sm sm:text-base">Orient<span className="font-normal text-slate-400">Suite</span></span>
          </div>
          <div className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar px-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-[clamp(0.75rem,1vw,0.9rem)] font-bold transition-all whitespace-nowrap z-10 ${
                  activePage === page.id
                    ? 'text-slate-900'
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
                <span className="material-icons text-sm">{page.icon}</span>
                <span className="hidden sm:inline">{page.label}</span>
              </button>
            ))}
            <div className="w-px h-6 bg-slate-700 mx-1 sm:mx-2 shrink-0"></div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSmartPasteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[clamp(0.75rem,1vw,0.9rem)] font-bold transition-all whitespace-nowrap text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <span className="material-icons text-sm">content_paste</span>
              <span className="hidden sm:inline">Smart Paste</span>
            </motion.button>
          </div>
          
          <div className="flex items-center ml-2 sm:ml-4 gap-2 sm:gap-4 shrink-0">
             {toggleLocalTheme && (
               <button onClick={toggleLocalTheme} className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300">
                 <span className="material-icons text-sm">{localTheme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
               </button>
             )}
             <button 
               onClick={() => setActivePage('Cart')} 
               className={`text-[10px] sm:text-xs font-bold flex items-center gap-1 transition-colors ${activePage === 'Cart' ? 'text-[#ff6a00]' : 'text-slate-300 hover:text-white'}`}
             >
                <span className="material-icons text-sm">shopping_cart</span> <span className="hidden xs:inline">Cart</span>
             </button>
             <div className="hidden sm:block w-px h-4 bg-slate-700"></div>
             <button onClick={() => setActivePage('Login')} className="text-[10px] sm:text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1">
                <span className="material-icons text-sm">login</span> <span className="hidden sm:inline">Sign In</span>
             </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export const SupermarketApp: React.FC<{ activePage: SupermarketPage, setActivePage: (p: SupermarketPage) => void, isSmartPasteOpen: boolean, setIsSmartPasteOpen: (o: boolean) => void }> = ({ activePage, setActivePage, isSmartPasteOpen, setIsSmartPasteOpen }) => {
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
              {activePage === 'Home' && <Home onNavigate={setActivePage} onOpenSmartPaste={() => setIsSmartPasteOpen(true)} />}
              {activePage === 'Wholesale' && <Wholesale />}
              {activePage === 'Deals' && <Deals onNavigate={setActivePage} />}
              {activePage === 'Dashboard' && <Dashboard onNavigate={setActivePage} />}
              {activePage === 'Cart' && <Cart />}
              {activePage === 'Produce' && <Produce onNavigate={setActivePage} />}
              {activePage === 'Aisles' && <Aisles onNavigate={setActivePage} />}
              {activePage === 'PreviouslyBought' && <PreviouslyBought onNavigate={setActivePage} />}
              {activePage === 'BOGOF' && <BOGOF onNavigate={setActivePage} />}
              {activePage === 'Under5' && <Under5 onNavigate={setActivePage} />}
              {activePage === 'Bundles' && <Bundles onNavigate={setActivePage} />}
              {activePage === 'Bakery' && <Bakery onNavigate={setActivePage} />}
              {activePage === 'Receipts' && <Receipts onNavigate={setActivePage} />}
              {activePage === 'Favorites' && <Favorites onNavigate={setActivePage} />}
              {activePage === 'Loyalty' && <Loyalty onNavigate={setActivePage} />}
              {activePage === 'Settings' && <Settings onNavigate={setActivePage} />}
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
