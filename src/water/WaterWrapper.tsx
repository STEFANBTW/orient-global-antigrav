import React, { useState, useEffect, createContext, useContext } from "react";
import { useGlobalCart } from "../context/GlobalCartContext";
import {
  Droplets, Truck, ShoppingCart, ShieldCheck, MapPin,
  Minus, Plus, RefreshCw, PackageSearch, Clock, ArrowRight,
  CheckCircle2, Beaker, Zap, GlassWater, Factory,
  ChevronRight, Phone, Mail, Instagram, Twitter, Trash2, Check, User,
  Building2, Home as HomeIcon, CalendarDays, CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WaterHome from "./components/WaterHome";
import {
  PurityHubView,
  DirectStoreView,
  B2BView,
  ProcessView,
  CartView,
  TrackDeliveryView
} from "./components/WaterSubViews";

export type WaterPage = 'home' | 'd2c' | 'b2b' | 'process' | 'cart' | 'track' | 'logistics' | 'quality' | 'impact';

// Local context removed in favor of GlobalCartContext

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
  const { cart } = useGlobalCart();
  const cartCount = cart.filter(item => item.division === 'water').length;

  const navItems = [
    { id: "home", label: "The Purity Hub" },
    { id: "d2c", label: "Direct Store" },
    { id: "b2b", label: "Wholesale & B2B" },
    { id: "process", label: "Our Process" },
  ];

  return (
    <nav
      className={`transition-all duration-500 sticky top-0 w-full z-40 h-16 theme-transition bg-white/95 backdrop-blur-md border-b border-slate-200/60`}
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

        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('track')} className="hidden sm:flex items-center gap-2 text-sm text-slate-600 hover:text-cyan-600 transition-colors">
            <Truck size={16} /> Track Delivery
          </button>
          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
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
  const { addToCart } = useGlobalCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      ...product,
      quantity: 1,
      division: 'water'
    });
  };

  const renderView = () => {
    switch (currentPage) {
      case "home": return <WaterHome onNavigate={onNavigate} />;
      case "d2c": return <DirectStoreView />;
      case "b2b": return <B2BView />;
      case "process": return <ProcessView />;
      case "cart": return <CartView onNavigate={onNavigate} />;
      case "track": return <TrackDeliveryView navigateTo={onNavigate} />;
      default: return <WaterHome onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <style dangerouslySetInnerHTML={{__html: `
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
    </div>
  );
};


// NOTE: Original views moved to backup/OriginalWaterViews.tsx as per user request.

