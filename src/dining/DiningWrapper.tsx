import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardScreen from './components/DashboardScreen';
import MenuScreen from './components/MenuScreen';
import AboutScreen from './components/AboutScreen';
import SommelierScreen from './components/SommelierScreen';
import DeliveryScreen from './components/DeliveryScreen';
import ReservationsScreen from './components/ReservationsScreen';
import { DiningNarrativeArc } from './NarrativeArc';

export type DiningView = 'dashboard' | 'menu' | 'about' | 'sommelier' | 'delivery' | 'reservations' | 'booking';

export const DiningNav: React.FC<{
  navHidden: boolean,
  currentView: DiningView,
  setView: (v: DiningView) => void,
  isAppNavHovered?: boolean,
  onHoverChange?: (hovered: boolean) => void,
  heroOutOfView?: boolean,
  scrolled?: boolean
}> = ({ currentView, setView, isAppNavHovered = false, onHoverChange, heroOutOfView = false, scrolled }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav
      className={`transition-all duration-500 sticky top-0 w-full z-40 h-[68px] border-b theme-transition`}
      style={{
        backgroundColor: heroOutOfView
          ? 'var(--dining-nav-opaque)'
          : ((isAppNavHovered) ? 'var(--dining-nav-blur)' : 'transparent'),
        backdropFilter: (heroOutOfView || isAppNavHovered) ? 'blur(20px)' : 'none',
        borderColor: heroOutOfView ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: heroOutOfView ? '#fff' : 'inherit'
      }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-2">
        <div className="flex items-center justify-start sm:justify-center space-x-3 sm:space-x-6 overflow-x-auto no-scrollbar px-2 flex-grow">
          {(['menu', 'sommelier', 'reservations', 'delivery', 'about', 'dashboard'] as DiningView[]).map((view) => (
            <button
              key={view}
              onClick={() => {
                setView(view);
                document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap px-4 py-2 rounded-full ${currentView === view
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : (heroOutOfView ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-black/5')
                }`}
            >
              {view}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button onClick={() => setView('booking')} className="px-3 sm:px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 transition-colors text-white font-bold text-[10px] sm:text-xs">
            Reservations
          </button>
        </div>
      </div>
    </nav>
  );
};

export const DiningApp: React.FC<{ currentView: DiningView }> = ({ currentView }) => {
  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardScreen />;
      case 'menu': return <MenuScreen />;
      case 'about': return <AboutScreen />;
      case 'sommelier': return <SommelierScreen />;
      case 'delivery': return <DeliveryScreen />;
      case 'reservations': return <ReservationsScreen />;
      case 'booking': return <ReservationsScreen />; // Assuming 'booking' also renders ReservationsScreen
      default: return <MenuScreen />;
    }
  };

  return (
    <div className="bg-black min-h-screen">
      {currentView === 'dashboard' && <DiningNarrativeArc />}
      {renderView()}
    </div>
  );
};
