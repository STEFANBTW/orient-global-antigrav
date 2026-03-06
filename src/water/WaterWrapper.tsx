import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import Process from './components/Process';
import Impact from './components/Impact';
import Logistics from './components/Logistics';

export type WaterPage = 'home' | 'process' | 'impact' | 'logistics';

export const WaterNav: React.FC<{ navHidden: boolean, currentPage: WaterPage, onNavigate: (p: WaterPage) => void, localTheme?: 'dark'|'light', toggleLocalTheme?: () => void }> = ({ navHidden, currentPage, onNavigate, localTheme, toggleLocalTheme }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: navHidden ? -100 : 0 }}
      transition={{ duration: navHidden ? 0.1 : 0.4, ease: "easeOut" }}
      className="sticky top-12 sm:top-14 w-full z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-white/20 dark:border-white/5 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4 cursor-pointer group shrink-0" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-500">
              <span className="material-icons text-blue-500 text-xl font-light">water_drop</span>
            </div>
            <span className="font-sans font-light text-lg tracking-[0.2em] text-slate-900 dark:text-white uppercase">
              Orient<span className="font-medium text-blue-500 ml-1">Water</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {[
              { id: 'home', label: 'Home' },
              { id: 'process', label: 'Process' },
              { id: 'impact', label: 'Impact' },
              { id: 'logistics', label: 'Logistics' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as WaterPage);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className={`relative text-[11px] font-medium uppercase tracking-[0.3em] transition-colors duration-500 ${
                  currentPage === item.id ? 'text-blue-500' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div 
                    layoutId="water-nav-indicator"
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {toggleLocalTheme && (
              <button onClick={toggleLocalTheme} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-500 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <span className="material-icons text-sm font-light">{localTheme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
              </button>
            )}
            <button className="hidden sm:flex items-center justify-center px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-500">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export const WaterApp: React.FC<{ currentPage: WaterPage, onNavigate: (p: WaterPage) => void }> = ({ currentPage, onNavigate }) => {
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={onNavigate} />;
      case 'process': return <Process />;
      case 'impact': return <Impact />;
      case 'logistics': return <Logistics />;
      default: return <Home onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] font-sans selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

