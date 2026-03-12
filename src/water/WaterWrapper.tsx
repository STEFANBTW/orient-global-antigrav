import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Droplets, Truck, ShoppingCart, ShieldCheck, MapPin,
  Minus, Plus, RefreshCw, PackageSearch, Clock, ArrowRight,
  CheckCircle2, Beaker, Zap, GlassWater, Factory,
  ChevronRight, Phone, Mail, Instagram, Twitter, Trash2, Check, User,
  Building2, Home as HomeIcon, CalendarDays, CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WaterHome from "./components/WaterHome";
import Process from "./components/Process";
import Logistics from "./components/Logistics";
import Quality from "./components/Quality";
import Impact from "./components/Impact";
import {
  DirectStoreView,
  B2BView,
  CartView,
  TrackDeliveryView
} from "./backup/OriginalWaterViews";

export type WaterPage = 'home' | 'd2c' | 'b2b' | 'process' | 'logistics' | 'quality' | 'impact' | 'cart' | 'track';

interface WaterContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  addToCart: () => void;
}

const WaterContext = createContext<WaterContextType | undefined>(undefined);

export const useWater = () => {
  const context = useContext(WaterContext);
  if (!context) throw new Error("useWater must be used within a WaterProvider");
  return context;
};

// ============================================================================
// PROVIDER
// ============================================================================

export const WaterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <WaterContext.Provider value={{ cartCount, setCartCount, addToCart }}>
      {children}
    </WaterContext.Provider>
  );
};

// ============================================================================
// COMPONENTS
// ============================================================================

export const WaterNav: React.FC<{
  currentPage: WaterPage,
  onNavigate: (p: WaterPage) => void,
  isAppNavHovered?: boolean,
  onHoverChange?: (hovered: boolean) => void,
  heroOutOfView?: boolean
}> = ({ currentPage, onNavigate, isAppNavHovered = false, onHoverChange, heroOutOfView = false }) => {
  const { cartCount } = useWater();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "process", label: "Process" },
    { id: "logistics", label: "Logistics" },
    { id: "quality", label: "Quality Control" },
    { id: "impact", label: "Impact" },
    { id: "d2c", label: "Store" },
  ];

  return (
    <nav
      className={`transition-all duration-500 sticky top-0 w-full z-40 h-[68px] theme-transition`}
      style={{
        backgroundColor: heroOutOfView
          ? 'var(--water-nav-opaque)'
          : ((isAppNavHovered) ? 'var(--water-nav-blur)' : 'transparent'),
        backdropFilter: (heroOutOfView || isAppNavHovered) ? 'blur(20px)' : 'none',
        borderBottom: heroOutOfView ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
        color: heroOutOfView ? '#fff' : 'inherit'
      }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate("home")}>
          <div className="size-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-md flex items-center justify-center text-white shadow-sm transition-transform">
            <Droplets size={18} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-lg font-medium tracking-tight text-blue-950 leading-none">Orient</h1>
            <p className="text-[9px] font-medium text-cyan-600 uppercase tracking-[0.15em] leading-none mt-1">Water Div.</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as WaterPage)}
              className={`text-sm transition-colors ${currentPage === item.id ? "text-cyan-600 font-medium" : "text-slate-500 hover:text-blue-900"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button onClick={() => onNavigate('track')} className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-sky-500 hover:bg-sky-400 transition-colors text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            Subscribe
          </button>
          <button onClick={() => onNavigate('cart')} className="relative p-1.5 text-slate-600 hover:text-blue-950 transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 size-4 bg-cyan-500 text-white text-[9px] font-medium flex items-center justify-center rounded-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export const WaterApp: React.FC<{ currentPage: WaterPage, onNavigate: (p: WaterPage) => void }> = ({ currentPage, onNavigate }) => {
  const { addToCart } = useWater();

  const renderView = () => {
    switch (currentPage) {
      case "home": return <WaterHome onNavigate={onNavigate} />;
      case "d2c": return <DirectStoreView addToCart={addToCart} />;
      case "b2b": return <B2BView />;
      case "process": return <Process />;
      case "logistics": return <Logistics />;
      case "quality": return <Quality />;
      case "impact": return <Impact />;
      case "cart": return <CartView onNavigate={onNavigate} />;
      case "track": return <TrackDeliveryView />;
      default: return <WaterHome onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16 lg:pt-[72px]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        .water-theme { font-family: 'Plus Jakarta Sans', sans-serif; }
        .fade-in { animation: fadeIn 0.6s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }
      `}} />
      <main className="flex-1 water-theme bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <WaterFooter />
    </div>
  );
};

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

function WaterFooter() {
  return (
    <footer className="bg-blue-950 text-slate-300 py-20 border-t-2 border-cyan-500">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between gap-12">
        <div>
          <h2 className="text-white font-medium text-xl mb-4">Orient Water</h2>
          <p className="max-w-xs text-sm text-blue-200/60 font-light">Sourced from Plateau State. Purified for Nigeria.</p>
        </div>
        <div className="flex gap-16 text-xs uppercase tracking-widest text-blue-200/40">
          <span>© 2026 Orient Global</span>
          <div className="flex gap-4"><Instagram size={14} /><Twitter size={14} /></div>
        </div>
      </div>
    </footer>
  );
}

// NOTE: Original views moved to backup/OriginalWaterViews.tsx as per user request.

