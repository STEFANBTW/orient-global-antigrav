import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Visualizer from './components/Visualizer';
import Concierge from './components/Concierge';
import Lab from './components/Lab';
import Booking from './components/Booking';
import Menu from './components/Menu';
import { LoungeNarrativeArc } from './NarrativeArc';

export type LoungePage = 'home' | 'lab' | 'menu' | 'booking' | 'dashboard';

export const LoungeNav: React.FC<{
  currentPage: LoungePage,
  onNavigate: (p: LoungePage) => void,
  isAppNavHovered?: boolean,
  onHoverChange?: (hovered: boolean) => void,
  heroOutOfView?: boolean
}> = ({ currentPage, onNavigate, isAppNavHovered = false, onHoverChange, heroOutOfView = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Lab', id: 'lab' },
    { name: 'Menu', id: 'menu' },
  ];

  return (
    <nav
      className={`transition-all duration-500 sticky top-0 w-full z-40 h-[68px] border-b theme-transition`}
      style={{
        backgroundColor: heroOutOfView
          ? 'var(--lounge-nav-opaque)'
          : (isAppNavHovered ? 'var(--lounge-nav-blur)' : 'transparent'),
        backdropFilter: (heroOutOfView || isAppNavHovered) ? 'blur(20px)' : 'none',
        borderColor: heroOutOfView ? 'rgba(212,175,55,0.2)' : 'transparent',
      }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div className="max-w-7xl mx-auto h-full relative flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 group relative z-10 cursor-pointer shrink-0" onClick={() => onNavigate('home')}>
          <span className="material-icons text-[#d4af37] text-xl sm:text-2xl group-hover:rotate-180 transition-transform duration-700">liquor</span>
          <div className="flex flex-col">
            <span className={`font-serif italic font-semibold text-sm sm:text-base leading-none tracking-wide text-white`}>Orient</span>
            <span className="font-display uppercase text-[8px] sm:text-[10px] tracking-[0.3em] text-[#d4af37]">Lounge</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id as LoungePage);
                document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold transition-all duration-300 group py-1.5 whitespace-nowrap ${currentPage === item.id
                ? 'text-[#d4af37]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 h-[1px] bg-[#d4af37] transition-all duration-500 ease-out ${currentPage === item.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'
                }`}></span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 relative z-10 shrink-0">
          <button
            onClick={() => onNavigate('booking')}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap ${currentPage === 'booking' ? 'bg-[#d4af37] text-black' : 'bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black'
              }`}
          >
            <span className="hidden xs:inline">Reservations</span>
            <span className="xs:hidden">Book</span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 group ${currentPage === 'dashboard'
              ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
              : 'border-white/10 text-white/70 hover:text-[#d4af37] hover:border-[#d4af37] hover:bg-white/5'
              }`}
          >
            <span className="material-icons text-lg sm:text-xl group-hover:scale-110 transition-transform">person</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export const LoungeApp: React.FC<{ currentPage: LoungePage, onNavigate: (p: LoungePage) => void }> = ({ currentPage, onNavigate }) => {
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <><LoungeNarrativeArc /><Visualizer onNavigate={onNavigate} /></>;
      case 'dashboard': return <Concierge />;
      case 'lab': return <Lab />;
      case 'booking': return <Booking />;
      case 'menu': return <Menu />;
      default: return <Visualizer onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="bg-black min-h-screen">
      {renderPage()}
    </div>
  );
};
