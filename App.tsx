
import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { BakeryApp, BakeryNav } from './src/BakeryComponents';
import { SupermarketApp, SupermarketNav, SupermarketPage } from './src/supermarket/SupermarketWrapper';
import { DiningApp, DiningNav, DiningView } from './src/dining/DiningWrapper';
import { GamesApp, GamesNav, Page as GamesPage } from './src/games/GamesWrapper';
import { WaterApp, WaterNav, WaterPage } from './src/water/WaterWrapper';
import { LoungeApp, LoungeNav, LoungePage } from './src/lounge/LoungeWrapper';
import About from './src/components/About';
import { AmbientGlow } from './src/components/AmbientGlow';
import Reveal from './src/components/Reveal';
import { SectionWrapper } from './src/components/SectionWrapper';
import StudioApp from './src/StudioApp';
import { ScrollContext } from './src/ScrollContext';

// --- Utility: Magnetic Tilt Hook ---
function useMagneticTilt() {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  // Physics-based spring for realistic weight/lag
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });

  const rotateX = useTransform(springY, [0, 1], [12, -12]);
  const rotateY = useTransform(springX, [0, 1], [-12, 12]);
  
  const spotlightX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(springY, [0, 1], ["0%", "100%"]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  }

  function onMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return { onMouseMove, onMouseLeave, rotateX, rotateY, spotlightX, spotlightY };
}

// --- Navigation Function Declaration for AI ---
const navigateToSectionTool: FunctionDeclaration = {
  name: 'navigateToSection',
  parameters: {
    type: Type.OBJECT,
    description: 'Scroll the visitor to a specific section of the website based on their request.',
    properties: {
      sectionId: {
        type: Type.STRING,
        description: 'The ID of the section to navigate to. Options: hero, services, bakery, market, lounge, standard, voices, location.',
      },
    },
    required: ['sectionId'],
  },
};

// --- Components ---


const ScrollItem: React.FC<{ children: React.ReactNode; className?: string; index?: number }> = ({ children, className = "", index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-20% 0% -20% 0%", once: false }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LiquidBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
          x: [0, 20, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[140px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          rotate: [0, -5, 0],
          x: [0, -20, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-600/10 blur-[120px]" 
      />
      
      {/* Dynamic SVG Elements for Depth */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1] dark:opacity-[0.2]" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <motion.circle 
          cx="10%" cy="20%" r="100" fill="none" stroke="currentColor" strokeWidth="0.5"
          animate={{ r: [100, 150, 100], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.path 
          d="M0,500 Q250,400 500,500 T1000,500" fill="none" stroke="currentColor" strokeWidth="0.5"
          animate={{ d: ["M0,500 Q250,400 500,500 T1000,500", "M0,500 Q250,600 500,500 T1000,500", "M0,500 Q250,400 500,500 T1000,500"] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.rect 
          x="80%" y="70%" width="200" height="200" fill="none" stroke="currentColor" strokeWidth="0.5"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
      <div className="absolute inset-0 bg-noir-black/10 dark:bg-noir-black/20 backdrop-blur-[1px]" />
    </div>
  );
};

// Text Reveal Component for High-End Typography
export const TextReveal: React.FC<{ text: string; className?: string; delay?: number; stagger?: number }> = ({ text, className = "", delay = 0, stagger = 0.05 }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.2em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] } }}
      className="fixed inset-0 z-[100] dark:bg-noir-black bg-slate-50 flex items-center justify-center"
    >
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setTimeout(onComplete, 1200)}
          className="flex flex-col items-center gap-6"
        >
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="w-20 h-20 rounded bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-heading font-black text-4xl shadow-[0_0_50px_rgba(242,158,13,0.4)]"
            >
              O
            </motion.div>
           <div className="flex flex-col items-center">
             <span className="dark:text-white text-slate-900 font-heading font-bold text-3xl tracking-[0.3em] uppercase">Orient</span>
             <span className="text-primary font-serif italic text-xl tracking-widest">Global</span>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const ref = useRef(null);
  const { scrollContainerRef } = React.useContext(ScrollContext);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainerRef || undefined,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden border-2 border-blue-500 ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[125%] -top-[12.5%]">
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

const Navbar: React.FC<{ 
  theme: 'dark' | 'light', 
  toggleTheme: () => void, 
  setCurrentView: (v: any) => void, 
  scrolled: boolean, 
  navHidden: boolean,
  isSubpage?: boolean
}> = ({ theme, toggleTheme, setCurrentView, scrolled, navHidden, isSubpage = false }) => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (tab: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveTab(tab);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setActiveTab(null);
      }, 300);
    };

    const handleNavigation = (view: string, sectionId: string) => {
      setCurrentView(view as any);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // A small delay to allow the new view to render
    };

    useEffect(() => {
      const checkMobile = () => window.innerWidth < 1024;
      const handleResize = () => setIsMobile(checkMobile());
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
      { name: 'Bakery', view: 'bakery', icon: 'bakery_dining', 
        menu: {
          cols: [
            { title: 'Products', items: ['Artisan Breads', 'French Pastries', 'Custom Cakes'] },
            { title: 'Services', items: ['Wholesale', 'Catering', 'Subscription'] }
          ]
        }
      },
      { name: 'Market', view: 'supermarket', icon: 'storefront',
        menu: {
          cols: [
            { title: 'Shop', items: ['Fresh Produce', 'Global Spices', 'Organic Dairy'] },
            { title: 'Tools', items: ['Smart Paste', 'Daily Deals', 'Store Map'] }
          ]
        }
      },
      { name: 'Dining', view: 'dining', icon: 'restaurant',
        menu: {
          cols: [
            { title: 'Menu', items: ['Traditional', 'Continental', 'Wine List'] },
            { title: 'Booking', items: ['Reservations', 'Private Dining', 'Delivery'] }
          ]
        }
      },
      { name: 'Games', view: 'games', icon: 'sports_esports',
        menu: {
          cols: [
            { title: 'Arena', items: ['FIFA Arena', 'CODM Zone', 'VR Pods'] },
            { title: 'Events', items: ['Tournaments', 'Leaderboards', 'Hardware'] }
          ]
        }
      },
      { name: 'Water', view: 'water', icon: 'water_drop',
        menu: {
          cols: [
            { title: 'Quality', items: ['7-Step Process', 'Lab Reports', 'Sustainability'] },
            { title: 'Orders', items: ['Home Delivery', 'Bulk Supply', 'Logistics'] }
          ]
        }
      },
      { name: 'Lounge', view: 'lounge', icon: 'nightlife',
        menu: {
          cols: [
            { title: 'Experience', items: ['The Lab', 'Visualizer', 'Concierge'] },
            { title: 'Access', items: ['Membership', 'Booking', 'Events'] }
          ]
        }
      },
      { name: 'About', view: 'about', icon: 'info',
        menu: {
          cols: [
            { title: 'Company', items: ['Our Story', 'Mission', 'Contact'] },
            { title: 'Community', items: ['Careers', 'Impact', 'News'] }
          ]
        }
      }
    ];

    return (
      <motion.div 
        animate={{ y: navHidden ? (isMobile ? 128 : -128) : 0 }}
        transition={{ duration: navHidden ? 0.1 : 0.4, ease: "easeOut" }}
        className={`fixed z-[100] ${isMobile ? 'bottom-6 left-0 right-0 mx-auto w-[95%]' : 'top-0 left-0 w-full'}`}
      >
        {/* Main Nav Container */}
        <nav className={`relative transition-all duration-200 flex items-center 
          ${isMobile 
            ? `rounded-[40px] h-14 sm:h-16 px-4 sm:px-6 ${scrolled || isSubpage ? 'shadow-soft bg-white/5 dark:bg-zinc-900/5 backdrop-blur-sm border border-black/5 dark:border-white/10' : 'bg-transparent border-transparent'}` 
            : `h-12 sm:h-14 px-6 sm:px-12 border-b transition-all duration-300 ${scrolled || isSubpage || activeTab ? 'shadow-soft backdrop-blur-xl border-black/5 dark:border-white/10' : 'bg-transparent border-transparent shadow-none'} 
               ${(scrolled || isSubpage) ? (activeTab ? 'bg-white/90 dark:bg-background-dark/80' : 'bg-white/5 dark:bg-background-dark/5') : (activeTab ? 'bg-transparent' : 'bg-transparent')}`
          }`}
        >
          <div className={`${isMobile ? 'w-full flex items-center justify-between' : 'mx-auto w-full flex items-center justify-between'}`}>
            {/* Logo Section */}
            <div className={`flex items-center gap-2 sm:gap-3 cursor-pointer ${isMobile ? 'pl-2 pr-4 border-r border-white/10' : ''}`} onClick={() => { setCurrentView('home'); document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons text-white text-lg sm:text-xl">diamond</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xs sm:text-sm tracking-tighter dark:text-white text-slate-900 leading-none uppercase">Orient</span>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.3em] text-primary uppercase leading-none mt-0.5">Global</span>
              </div>
            </div>

            {/* Links Section */}
            {!isMobile && (
              <div 
                className="flex-1 flex items-center relative h-full justify-center space-x-1 sm:space-x-2"
                onMouseLeave={() => handleMouseLeave()}
              >
                {navLinks.map((link) => (
                  <button 
                    key={link.name}
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onClick={() => {
                      setCurrentView(link.view as any);
                      document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative z-10 px-2 sm:px-3 h-full flex items-center justify-center transition-all duration-300 text-[clamp(0.75rem,1.1vw,0.9rem)] font-bold uppercase tracking-widest hover:text-primary dark:hover:text-white ${scrolled ? 'dark:text-gray-300 text-slate-600' : 'dark:text-white text-slate-900'}`}
                  >
                    <div className="flex flex-col items-center group">
                      <motion.span whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }} className="relative py-1 block">
                        {link.name}
                        {activeTab === link.name && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-[0_0_15px_rgba(242,158,13,0.8)] rounded-full"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Actions Section */}
            <div className={`flex items-center gap-1 sm:gap-3 ${isMobile ? 'pl-4 border-l border-white/10' : ''}`}>
              <button onClick={toggleTheme} className="p-1.5 sm:p-2 rounded-full hover:bg-primary/10 transition-all duration-300 dark:text-white text-slate-900">
                <span className="material-icons text-sm sm:text-base">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
              </button>
              <button 
                onClick={() => setCurrentView('login')}
                className="p-1.5 sm:p-2 rounded-full bg-primary/10 dark:bg-white/5 text-primary dark:text-white hover:bg-primary hover:text-white transition-all duration-300"
                title="Portal"
              >
                <span className="material-icons text-sm sm:text-base">person</span>
              </button>
              {isMobile && (
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 sm:p-2 rounded-full bg-primary/10 dark:bg-white/5 text-primary dark:text-white hover:bg-primary hover:text-white transition-all duration-300 ml-1"
                >
                  <span className="material-icons text-sm sm:text-base">{mobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Mega Menu & Mobile Menu */}
        <AnimatePresence>
          {(!isMobile && activeTab) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => handleMouseEnter(activeTab)}
              onMouseLeave={() => handleMouseLeave()}
              className={`absolute w-full border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-[0_32px_64px_rgba(0,0,0,0.4)] z-[-1] overflow-hidden top-full left-0 rounded-none border-t-0 p-12 ${scrolled ? 'bg-white/90 dark:bg-background-dark/80' : 'bg-transparent dark:bg-transparent'}`}
            >
              <div className="lg:max-w-[67vw] mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-24">
                {(() => {
                  const activeLink = navLinks.find(l => l.name === activeTab);
                  if (!activeLink) return null;
                  
                  return activeLink.menu.cols.map((col, idx) => (
                    <div key={idx} className="space-y-6">
                      <motion.h4 
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                        className="text-primary font-black text-xs uppercase tracking-[0.4em] border-b border-primary/20 pb-3"
                      >
                        {col.title}
                      </motion.h4>
                      <ul className="space-y-4">
                        {col.items.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                          >
                            <button 
                              onClick={() => handleNavigation(activeLink.view, item.toLowerCase().replace(/\s+/g, '-'))} 
                              className="text-lg sm:text-xl font-medium dark:text-white/90 text-slate-800 hover:text-primary dark:hover:text-white transition-all hover:translate-x-2 flex items-center gap-3 group"
                            >
                              <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                              {item}
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ));
                })()}
              </div>

              {/* Large Background Text */}
              <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden h-full flex items-end justify-end p-8 lg:p-12">
                <motion.h3 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 0.15 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-[12rem] lg:text-[20rem] font-black uppercase tracking-tighter italic leading-none text-slate-400 dark:text-white"
                >
                  {activeTab}
                </motion.h3>
              </div>
            </motion.div>
          )}

          {(isMobile && mobileMenuOpen) && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-20 left-0 w-full rounded-[2.5rem] p-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] z-[-1] overflow-hidden flex flex-col gap-2 max-h-[70vh] overflow-y-auto"
            >
              {navLinks.map((link, linkIdx) => (
                <motion.div 
                  key={link.name} 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: linkIdx * 0.05 }}
                  className="flex flex-col"
                >
                  <button 
                    onClick={() => setActiveTab(activeTab === link.name ? null : link.name)}
                    className="flex items-center justify-between py-4 text-sm font-black uppercase tracking-widest dark:text-white text-slate-900 border-b border-black/5 dark:border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-icons text-primary">{link.icon}</span>
                      {link.name}
                    </div>
                    <span className="material-icons text-sm">{activeTab === link.name ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  <AnimatePresence>
                    {activeTab === link.name && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="py-4 grid grid-cols-2 gap-4">
                          {link.menu.cols.map((col, idx) => (
                            <div key={idx} className="space-y-3">
                              <h4 className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">{col.title}</h4>
                              <ul className="space-y-2">
                                {col.items.map((item, i) => (
                                  <li key={i}>
                                    <button 
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setActiveTab(null);
                                        handleNavigation(link.view, item.toLowerCase().replace(/\s+/g, '-'));
                                      }} 
                                      className="text-xs font-bold dark:text-gray-300 text-slate-600 hover:text-primary transition-colors text-left"
                                    >
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
};

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollContainerRef } = React.useContext(ScrollContext);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainerRef || undefined,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.15]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(12px)"]);
  const springYText = useSpring(yText, { stiffness: 70, damping: 20 });

  return (
    <div ref={ref} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-transparent">
      <motion.div style={{ y: yBg, scale, filter: blur }} className="absolute inset-0 z-0">
        <motion.img 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-70 dark:opacity-40" 
            alt="Luxury Ambience" 
        />
      </motion.div>
      <motion.div style={{ y: springYText, opacity }} className="content-container relative z-20 max-w-5xl">
        <ScrollItem index={0} className="mb-6">
          <span className="text-primary font-black tracking-[0.4em] uppercase text-xs">Welcome to Orient Global</span>
        </ScrollItem>
        <ScrollItem index={1} className="font-heading font-black text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] dark:text-white text-slate-900 mb-8 tracking-tighter leading-[0.8] uppercase">
          <TextReveal text="ELEVATE" delay={0} />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-gray-500">
             <TextReveal text="EVERYDAY." delay={0.4} />
          </span>
        </ScrollItem>
        <ScrollItem index={2}>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl dark:text-white/90 text-slate-800 max-w-4xl mx-auto font-light tracking-wide mb-16 leading-relaxed drop-shadow-md dark:drop-shadow-lg">
            Experience a convergence of global excellence and Plateau soul across six premium lifestyle divisions.
          </p>
        </ScrollItem>
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-24 z-20">
        <div className="w-[1px] h-32 bg-gradient-to-b from-primary via-primary/50 to-transparent mx-auto" />
      </motion.div>
    </div>
  );
};

const FinalCTA: React.FC = () => {
  return (
    <section className="relative flex flex-col justify-center bg-transparent border-t border-black/5 dark:border-white/5 items-center">
      <div className="content-container relative z-10 text-center">
        <Reveal>
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[9px]">The New Standard of Excellence</span>
          </div>
        </Reveal>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black dark:text-white text-slate-900 mb-6 leading-[0.8] uppercase tracking-tighter">
          ORIENT<br />
          <span className="text-primary">Global</span>
        </h2>

        <Reveal>
          <p className="text-sm md:text-base dark:text-gray-400 text-slate-500 max-w-xl mx-auto leading-relaxed font-medium mb-8">
            Ready to experience the future of Jos? Join us at the flagship destination where every detail is engineered for perfection.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-[0_10px_20px_rgba(242,158,13,0.3)] hover:scale-105 hover:shadow-[0_15px_30px_rgba(242,158,13,0.4)] transition-all duration-500">Visit Us Today</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const BakeryShowcase: React.FC<{ setCurrentView: (v: any) => void }> = ({ setCurrentView }) => {
  return (
    <section id="bakery" className="flex flex-col justify-center px-4 md:px-12 lg:max-w-[67vw] mx-auto dark:bg-background-dark bg-white transition-colors duration-500 relative items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="md:w-1/2">
          <Reveal>
            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">The Bakery</span>
            <h2 className="text-4xl md:text-6xl font-black dark:text-white text-slate-900 mb-6 font-heading leading-[0.85] uppercase tracking-tighter">
              GOLDEN<br/><span className="text-primary">Crust</span>
            </h2>
            <p className="dark:text-gray-400 text-slate-500 text-base leading-relaxed mb-8 font-medium max-w-lg">Morning excellence starts here. From artisanal sourdoughs to delicate pastries, our bakery combines European techniques with local flavors like Coconut and Plantain.</p>
            <button onClick={() => { setCurrentView('bakery'); document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-2 dark:text-white text-slate-900 border-b-2 border-primary pb-1 hover:text-primary transition-all uppercase text-xs font-black tracking-[0.3em] font-heading">
              <span>View Menu</span>
              <span className="material-icons text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </Reveal>
        </div>
        <div className="md:w-1/2 grid grid-cols-1 gap-8">
          <Reveal animation="slide-from-right">
            <ParallaxImage src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop" alt="Golden Crust Croissants" className="rounded-3xl h-[50vh] border border-black/5 dark:border-white/5 shadow-elite" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const BakeryDeepDive: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-6 bg-transparent border-t border-black/5 dark:border-white/5 relative items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal animation='slide-from-left' className="order-2 lg:order-1">
          <ParallaxImage src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" alt="Baking Process" className="rounded-3xl aspect-square border border-black/5 dark:border-white/10 shadow-elite" />
        </Reveal>
        <Reveal animation='slide-from-right' className="order-1 lg:order-2">
          <span className="text-primary font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">Artisanal Process</span>
          <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter mb-6 leading-tight">THE SCIENCE OF <br/><span className="text-primary">Fermentation</span></h2>
          <p className="text-base dark:text-gray-400 text-slate-600 leading-relaxed mb-8 font-medium">Our master bakers utilize a 48-hour cold fermentation process, allowing complex flavors to develop naturally. We source our grains from sustainable farms, ensuring every loaf meets the Orient Global standard of purity.</p>
          <ul className="space-y-4">
            {['Natural Sourdough Starters', 'Stone-Ground Flour', 'No Artificial Additives'].map((item, i) => (
              <Reveal key={item} delay={`delay-${i * 300}`}>
                <li className="flex items-center gap-4 dark:text-white text-slate-900 font-bold uppercase tracking-widest text-xs">
                  <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(242,158,13,0.5)]" />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
};

const MarketShowcase: React.FC<{ setCurrentView: (v: any) => void }> = ({ setCurrentView }) => {
  return (
    <section id="market" className="flex flex-col justify-center px-4 md:px-12 lg:max-w-[67vw] mx-auto dark:bg-background-dark bg-white transition-colors duration-500 relative items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="md:w-1/2">
          <Reveal>
            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">The Market</span>
            <h2 className="text-4xl md:text-6xl font-black dark:text-white text-slate-900 mb-6 font-heading leading-[0.85] uppercase tracking-tighter">
              GLOBAL<br/><span className="text-primary">Standards</span>
            </h2>
            <p className="dark:text-gray-400 text-slate-500 text-base leading-relaxed mb-8 font-medium max-w-lg">We've redefined the shopping experience. Wide aisles, perfect lighting, and a curated selection of international and local products. Quality you can trust, right here in Rayfield, Jos.</p>
            <button onClick={() => { setCurrentView('supermarket'); document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-2 dark:text-white text-slate-900 border-b-2 border-primary pb-1 hover:text-primary transition-all uppercase text-xs font-black tracking-[0.3em] font-heading">
              <span>Shop Online</span>
              <span className="material-icons text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </Reveal>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <Reveal animation="slide-from-left" className="col-span-2">
            <ParallaxImage src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" alt="Supermarket Wide" className="rounded-3xl h-[35vh] border border-black/5 dark:border-white/5 shadow-elite" />
          </Reveal>
          <Reveal animation="slide-from-left" delay="delay-150">
            <ParallaxImage src="https://images.unsplash.com/photo-1543083477-4f7f4b23832c?q=80&w=1970&auto=format&fit=crop" alt="Fresh Produce" className="rounded-3xl h-[20vh] border border-black/5 dark:border-white/5 shadow-soft" />
          </Reveal>
          <Reveal animation="slide-from-left" delay="delay-300">
            <ParallaxImage src="https://images.unsplash.com/photo-1506484334402-40ff22e05a6d?q=80&w=2070&auto=format&fit=crop" alt="Market Shelves" className="rounded-3xl h-[20vh] border border-black/5 dark:border-white/5 shadow-soft" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const MarketDeepDive: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-6 bg-transparent border-t border-black/5 dark:border-white/5 relative items-center h-screen cinematic-section">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col">
          <Reveal animation='slide-from-right' delay="delay-100">
            <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Supply Chain</span>
          </Reveal>
          <Reveal animation='slide-from-right' delay="delay-200">
            <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter mb-6 leading-tight">INSTITUTIONAL <br/><span className="text-primary">Quality</span></h2>
          </Reveal>
          <Reveal animation='slide-from-right' delay="delay-300">
            <p className="text-base dark:text-gray-400 text-slate-600 leading-relaxed mb-8 font-medium">Our global procurement network ensures that the finest products from around the world are available in Jos. From organic dairy to international spices, we maintain a strict cold chain and quality control protocol.</p>
          </Reveal>
          <Reveal animation='slide-from-right' delay="delay-400">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-black/5 shadow-soft">
                <h4 className="dark:text-white text-slate-900 font-black uppercase text-xs tracking-widest mb-2">Cold Chain</h4>
                <p className="dark:text-gray-500 text-slate-500 text-xs font-medium">24/7 Temperature Monitoring</p>
              </div>
              <div className="p-6 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-black/5 shadow-soft">
                <h4 className="dark:text-white text-slate-900 font-black uppercase text-xs tracking-widest mb-2">Sourcing</h4>
                <p className="dark:text-gray-500 text-slate-500 text-xs font-medium">Direct from Global Producers</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal animation='slide-from-left'>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-elite">
            <ParallaxImage src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1974&auto=format&fit=crop" alt="Market Logistics" className="w-full h-full" />
          </div>
        </Reveal>
      </div>
    </div>
  );
};

const RestaurantShowcase: React.FC<{ setCurrentView: (v: any) => void }> = ({ setCurrentView }) => {
  return (
    <section id="restaurant" className="flex flex-col justify-center px-4 md:px-12 lg:max-w-[67vw] mx-auto dark:bg-background-dark bg-white transition-colors duration-500 relative items-center h-screen cinematic-section">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="md:w-1/2">
          <Reveal delay="delay-100">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">The Restaurant</span>
          </Reveal>
          <Reveal delay="delay-200">
            <h2 className="text-4xl md:text-6xl font-black dark:text-white text-slate-900 mb-6 font-heading leading-[0.85] uppercase tracking-tighter">
              CULINARY<br/><span className="text-primary">Artistry</span>
            </h2>
          </Reveal>
          <Reveal delay="delay-300">
            <p className="dark:text-gray-400 text-slate-500 text-base leading-relaxed mb-8 font-medium max-w-lg">A symphony of flavors crafted by world-class chefs. From local delicacies like Pounded Yam & Egusi to international fusion, every dish is a masterpiece of taste and presentation.</p>
          </Reveal>
          <Reveal delay="delay-400">
            <button onClick={() => { setCurrentView('dining'); document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-2 dark:text-white text-slate-900 border-b-2 border-primary pb-1 hover:text-primary transition-all uppercase text-xs font-black tracking-[0.3em] font-heading">
              <span>View Menu</span>
              <span className="material-icons text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </Reveal>
        </div>
        <div className="md:w-1/2">
          <Reveal animation="slide-from-right">
            <ParallaxImage src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" alt="Fine Dining Experience" className="rounded-3xl h-[50vh] border border-black/5 dark:border-white/5 shadow-elite" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const DiningDeepDive: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-6 bg-transparent border-t border-black/5 dark:border-white/5 relative items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal animation='rotate-in' className="order-2 lg:order-1 relative aspect-square rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-elite">
          <ParallaxImage src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" alt="Chef at Work" className="w-full h-full" />
        </Reveal>
        <Reveal animation='slide-from-right' className="order-1 lg:order-2">
          <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Chef's Philosophy</span>
          <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter mb-6 leading-tight">FUSION OF <br/><span className="text-primary">Heritage</span></h2>
          <p className="text-base dark:text-gray-400 text-slate-600 leading-relaxed mb-8 font-medium">Our culinary team explores the intersection of traditional Plateau ingredients and modern gastronomic techniques. We believe in "Root-to-Table" dining, where every ingredient tells a story of the land.</p>
          <div className="space-y-4">
            {['Locally Sourced Produce', 'Artisanal Plating', 'Curated Wine Pairings'].map(item => (
              <div key={item} className="flex items-center gap-6 p-6 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-black/5 shadow-soft">
                <span className="material-icons text-primary text-2xl">restaurant_menu</span>
                <span className="dark:text-white text-slate-900 font-bold uppercase tracking-widest text-xs">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

const WaterShowcase: React.FC<{ setCurrentView: (v: any) => void }> = ({ setCurrentView }) => {
  return (
    <section id="water" className="flex flex-col justify-center px-4 md:px-12 lg:max-w-[67vw] mx-auto dark:bg-background-dark bg-white transition-colors duration-500 relative items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="md:w-1/2">
          <Reveal>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Orient Water</span>
            <h2 className="text-5xl md:text-6xl font-black dark:text-white text-slate-900 mb-6 font-heading leading-[0.85] uppercase tracking-tighter">
              PURE<br/><span className="text-primary">Hydration</span>
            </h2>
            <p className="dark:text-gray-400 text-slate-500 text-base leading-relaxed mb-8 font-medium max-w-xl">The gold standard of purity. Our 7-step filtration process ensures every drop is as crisp and clean as nature intended. NAFDAC Certified quality for your peace of mind.</p>
            <button onClick={() => { setCurrentView('water'); document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-4 dark:text-white text-slate-900 border-b-2 border-primary pb-2 hover:text-primary transition-all uppercase text-xs font-black tracking-[0.3em] font-heading">
              <span>Explore Purity</span>
              <span className="material-icons text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </Reveal>
        </div>
        <div className="md:w-1/2">
          <Reveal animation="slide-from-left">
            <ParallaxImage src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1888&auto=format&fit=crop" alt="Orient Water Bottle" className="rounded-3xl h-[45vh] border border-black/5 dark:border-white/5 shadow-elite" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const WaterDeepDive: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-6 bg-transparent border-t border-black/5 dark:border-white/5 relative items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal animation='slide-from-left'>
          <div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Technical Purity</span>
            <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter mb-6 leading-tight">7-STEP <br/><span className="text-primary">Filtration</span></h2>
            <p className="text-base dark:text-gray-400 text-slate-600 leading-relaxed mb-8 font-medium">Beyond standard purification, Orient Water undergoes a rigorous 7-step process including Reverse Osmosis, UV Sterilization, and Ozone Treatment. We test every batch in our on-site laboratory to ensure absolute safety.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Reverse Osmosis', 'UV Sterilization', 'Ozone Treatment', 'Mineral Balancing'].map(step => (
                <div key={step} className="flex items-center gap-4 p-4 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/10 border-black/5 shadow-soft">
                  <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                  <span className="dark:text-white text-slate-900 text-[10px] font-black uppercase tracking-widest">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal animation='slide-from-right'>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-elite">
            <ParallaxImage src="https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=2036&auto=format&fit=crop" alt="Water Laboratory" className="w-full h-full" />
          </div>
        </Reveal>
      </div>
    </div>
  );
};

const CuratedExperiences: React.FC<{ setCurrentView: (v: any) => void }> = ({ setCurrentView }) => {
  return (
    <section id="lounge" className="relative h-screen flex flex-col justify-center dark:bg-background-dark bg-white transition-colors duration-500 items-center">
      <div className="lg:max-w-[67vw] mx-auto px-6">
        <div className="mb-16 text-center">
          <Reveal>
            <h2 className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-4">Our Worlds</h2>
            <h3 className="text-5xl md:text-6xl font-serif dark:text-white text-slate-900 italic font-light tracking-tight leading-none">Curated <br/><span className="not-italic font-display font-black dark:text-gray-500 text-slate-400 uppercase tracking-tighter">Experiences</span></h3>
          </Reveal>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <Reveal animation="slide-from-left">
              <ParallaxImage src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop" alt="Lounge Experience" className="rounded-3xl aspect-[4/5] border border-black/5 dark:border-white/10 shadow-elite" />
            </Reveal>
          </div>
          <div className="w-full md:w-1/2">
            <Reveal animation="slide-from-right">
              <div className="w-12 h-1 bg-primary mb-8 rounded-full"></div>
              <h4 className="text-4xl font-black dark:text-white text-slate-900 mb-6 uppercase tracking-tighter leading-none">The <br/><span className="text-primary">Nightscape</span> Lounge</h4>
              <p className="dark:text-gray-400 text-slate-500 text-base leading-relaxed mb-8 font-medium">Where mixology meets mystery. Our lounge offers a secluded environment perfect for high-stakes meetings or unwinding after a long week. Featuring Zobo-infused cocktails and a curated cigar selection.</p>
              <ul className="space-y-4 mb-8">
                {['Premium Bottle Service', 'Private Booths', 'Live Jazz Weekends'].map(li => (
                  <li key={li} className="flex items-center dark:text-gray-300 text-slate-600 font-bold text-sm tracking-wide uppercase">
                    <span className="w-2 h-2 bg-primary rounded-full mr-4 shadow-[0_0_20px_rgba(242,158,13,0.5)]"></span>
                    {li}
                  </li>
                ))}
              </ul>
              <button onClick={() => { setCurrentView('lounge'); document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-4 dark:text-white text-slate-900 border-b-2 border-primary pb-2 hover:text-primary transition-all uppercase text-xs font-black tracking-[0.3em] font-heading">
                <span>Explore Menu</span>
                <span className="material-icons text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const LoungeDeepDive: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-6 bg-transparent border-t border-black/5 dark:border-white/5 items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal animation='slide-from-left' className="order-2 lg:order-1 relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-3xl">
          <ParallaxImage src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" alt="Mixology" className="w-full h-full" />
        </Reveal>
        <Reveal animation='slide-from-right' className="order-1 lg:order-2">
          <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Mixology Art</span>
          <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter mb-6">THE NIGHTSCAPE <span className="dark:text-white/40 text-slate-400 italic">ETHOS.</span></h2>
          <p className="text-base dark:text-gray-400 text-slate-600 leading-relaxed mb-8">Our mixologists are alchemists, blending local botanicals with premium spirits to create unique sensory experiences. The Nightscape Lounge is more than a bar; it's a sanctuary for the discerning.</p>
          <div className="grid grid-cols-2 gap-4">
            {['Signature Cocktails', 'Rare Spirits', 'Bespoke Service', 'Acoustic Excellence'].map((item, i) => (
              <Reveal key={item} delay={`delay-${i * 200}`}>
                <div className="p-4 rounded-2xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 text-center">
                  <span className="dark:text-white text-slate-900 font-black uppercase tracking-widest text-[10px]">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

const GamesShowcase: React.FC<{ setCurrentView: (v: any) => void }> = ({ setCurrentView }) => {
  return (
    <section id="games" className="flex flex-col justify-center px-4 md:px-12 lg:max-w-[67vw] mx-auto dark:bg-background-dark bg-white transition-colors duration-500 relative items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="md:w-1/2">
          <Reveal>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">The Arena</span>
            <h2 className="text-5xl md:text-6xl font-black dark:text-white text-slate-900 mb-6 font-heading leading-[0.85] uppercase tracking-tighter">
              HIGH<br/><span className="text-primary">Performance</span>
            </h2>
            <p className="dark:text-gray-400 text-slate-500 text-base leading-relaxed mb-8 font-medium max-w-xl">Step into the future of competitive gaming. From high-refresh rate PC arenas to immersive VR pods, we provide the infrastructure for champions.</p>
            <button onClick={() => { setCurrentView('games'); document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-4 dark:text-white text-slate-900 border-b-2 border-primary pb-2 hover:text-primary transition-all uppercase text-xs font-black tracking-[0.3em] font-heading">
              <span>Enter Arena</span>
              <span className="material-icons text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </Reveal>
        </div>
        <div className="md:w-1/2">
          <Reveal animation="slide-from-right">
            <ParallaxImage src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" alt="Gaming Arena" className="rounded-3xl h-[45vh] border border-black/5 dark:border-white/5 shadow-elite" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const GamesDeepDive: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-6 bg-transparent border-t border-black/5 dark:border-white/5 relative items-center h-screen">
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal animation='slide-from-right'>
          <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Tech Ecosystem</span>
          <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter mb-6 leading-tight">ZERO LAG <br/><span className="text-primary">Infrastructure</span></h2>
          <p className="text-base dark:text-gray-400 text-slate-600 leading-relaxed mb-8 font-medium">We've built a dedicated fiber-optic network to ensure sub-10ms latency for competitive play. Our hardware is refreshed quarterly, featuring the latest RTX GPUs and high-fidelity VR peripherals.</p>
          <div className="space-y-4">
            {['Fiber-Optic Backbone', 'RTX 40-Series GPUs', '240Hz Displays'].map(spec => (
              <div key={spec} className="flex items-center justify-between p-6 rounded-3xl dark:bg-white/5 bg-white border dark:border-white/10 border-black/5 shadow-soft">
                <span className="dark:text-white text-slate-900 font-bold uppercase tracking-widest text-xs">{spec}</span>
                <span className="material-icons text-primary text-xl">bolt</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal animation='rotate-in'>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-elite">
            <ParallaxImage src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" alt="Gaming Hardware" className="w-full h-full" />
          </div>
        </Reveal>
      </div>
    </div>
  );
};

const VoicesOfJos: React.FC = () => {
  const reviews = [
    { name: 'Sarah N.', role: 'Rayfield Resident', text: "I've never seen a supermarket this clean in Jos. It feels like I'm abroad...", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
    { name: 'David O.', role: 'Gamer', text: "The internet speed at the gaming lounge is insane. No lag at all.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
    { name: 'Fatima A.', role: 'Foodie', text: "The jollof rice at the restaurant... honestly, it's the best I've had in years.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop" }
  ];
  return (
    <section className="flex flex-col justify-center bg-transparent border-y border-black/5 dark:border-white/5 transition-colors duration-500 relative overflow-hidden items-center h-screen">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(242,158,13,0.03),transparent_70%)] pointer-events-none" />
      <div className="lg:max-w-[67vw] mx-auto flex flex-col justify-center">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black dark:text-white text-slate-900 mb-4 uppercase tracking-tighter leading-none">VOICES OF <br/><span className="text-primary">Jos</span></h2>
            <p className="dark:text-gray-400 text-slate-500 font-bold text-sm uppercase tracking-[0.3em]">Real stories from our community.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <Reveal key={rev.name} delay={`delay-${idx * 300}`}>
              <motion.div whileHover={{ y: -10 }} className="dark:bg-background-dark bg-white p-8 rounded-3xl border border-black/5 dark:border-white/5 hover:border-primary/50 transition-all group shadow-soft hover:shadow-elite relative">
                <div className="flex items-center gap-4 mb-8">
                  <img src={rev.img} className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover shadow-lg" alt={rev.name} />
                  <div>
                    <h4 className="dark:text-white text-slate-900 font-black text-base uppercase tracking-tight">{rev.name}</h4>
                    <p className="text-[9px] dark:text-gray-500 text-slate-400 uppercase font-black tracking-[0.2em] mt-0.5">{rev.role}</p>
                  </div>
                </div>
                <div className="dark:bg-zinc-800/50 bg-slate-50 rounded-2xl p-4 flex items-center gap-4 mb-6">
                  <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-xl hover:bg-orange-600 transition-colors">
                    <span className="material-icons text-xl">play_arrow</span>
                  </button>
                  <div className="flex gap-1.5 h-8 items-center flex-1">
                    {[...Array(15)].map((_, i) => (
                      <div key={i} className="w-1 bg-primary/40 rounded-full wave-bar" style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 100}%` }}></div>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono font-bold">0:24</span>
                </div>
                <p className="dark:text-gray-300 text-slate-500 text-sm italic font-medium leading-relaxed">"{rev.text}"</p>
                <span className="material-icons absolute top-6 right-6 text-primary/10 text-4xl">format_quote</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const MagneticCard: React.FC<{ 
  id: string; 
  title: string; 
  subtitle?: string; 
  icon: string; 
  img: string; 
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick?: () => void;
  className?: string;
  style?: any;
  titleSize?: string;
}> = ({ id, title, subtitle, icon, img, isHovered, onHover, onClick, className = "", style = {}, titleSize = "text-2xl" }) => {
  const { onMouseMove, onMouseLeave, rotateX, rotateY, spotlightX, spotlightY } = useMagneticTilt();

  const ref = useRef(null);
  const { scrollContainerRef } = React.useContext(ScrollContext);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainerRef || undefined,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      layout
      id={id}
      onHoverStart={() => onHover(id)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ y: -15 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative rounded-[3rem] overflow-hidden cursor-pointer border border-black/5 dark:border-white/10 dark:bg-zinc-900/40 bg-white shadow-soft hover:shadow-elite transition-all duration-500 group ${className}`}
      style={{ ...style, perspective: 1000, rotateX: isHovered ? rotateX : 0, rotateY: isHovered ? rotateY : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
      onClick={onClick}
    >
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[125%] -top-[12.5%]">
        <motion.img 
            src={img} 
            className="w-full h-full object-cover opacity-60 dark:opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
            alt={title} 
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-noir-black opacity-90" />
      <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: useTransform([spotlightX, spotlightY], ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, rgba(242,158,13,0.08), transparent 40%)`) }} />
      <div className="absolute inset-0 p-10 flex flex-col justify-end items-start z-10">
        <span className="material-icons text-primary text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">{icon}</span>
        <h3 className={`${titleSize} font-black dark:text-white text-slate-900 font-heading uppercase tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500`}>{title}</h3>
        {subtitle && !className.includes('h-') && (
          <p className="text-[10px] dark:text-gray-400 text-slate-500 mt-2 font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">{subtitle}</p>
        )}
      </div>
      <div className="absolute inset-0 border-[1px] border-white/5 pointer-events-none rounded-[3rem]" />
    </motion.div>
  );
};

const ServicesGrid: React.FC<{ setCurrentView: (v: any) => void }> = ({ setCurrentView }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const gridTransition = { type: "spring" as const, stiffness: 120, damping: 25, mass: 1 };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGridStyles = () => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) {
      return {
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(6, 450px)',
      };
    }

    let cols = '1fr 1fr 1fr';
    let rows = '1fr 1fr';

    if (hovered === 'card-bakery') { cols = '1.4fr 0.8fr 0.8fr'; rows = '1.2fr 0.8fr'; }
    if (hovered === 'card-market') { cols = '1.4fr 0.8fr 0.8fr'; rows = '0.8fr 1.2fr'; }
    if (hovered === 'card-restaurant') { cols = '0.8fr 1.4fr 0.8fr'; rows = '1.2fr 0.8fr'; }
    if (hovered === 'card-water') { cols = '0.8fr 1.4fr 0.8fr'; rows = '0.8fr 1.2fr'; }
    if (hovered === 'card-lounge') { cols = '0.8fr 0.8fr 1.4fr'; rows = '1.2fr 0.8fr'; }
    if (hovered === 'card-games') { cols = '0.8fr 0.8fr 1.4fr'; rows = '0.8fr 1.2fr'; }

    return {
      gridTemplateColumns: cols,
      gridTemplateRows: rows,
    };
  };

  return (
    <section className="relative z-30 bg-transparent h-screen flex flex-col justify-center px-4 sm:px-8 items-center">
      <div className="lg:max-w-[67vw] mx-auto w-full">
        <Reveal>
          <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">
            Bespoke Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter max-w-3xl mb-8">
            FOR THOSE WHO DEMAND <span className="dark:text-white/40 text-slate-300 italic">EXCELLENCE.</span>
          </h2>
        </Reveal>

        <motion.div 
          layout 
          className="grid gap-6 w-full h-full min-h-[50vh]" 
          style={getGridStyles()}
          transition={gridTransition}
        >
          <Reveal delay={0.4} className='h-full'>
            <MagneticCard 
              id="card-bakery" 
              title="Bakery" 
              subtitle="Artisanal Breads" 
              icon="bakery_dining" 
              img="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" 
              isHovered={hovered === 'card-bakery'}
              onHover={setHovered}
              onClick={() => handleNavigate('bakery')}
              className="h-full"
            />
          </Reveal>
          <Reveal delay={0.4} className='h-full'>
            <MagneticCard 
              id="card-restaurant" 
              title="Dining" 
              subtitle="Chef-Curated" 
              icon="restaurant" 
              img="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
              isHovered={hovered === 'card-restaurant'}
              onHover={setHovered}
              onClick={() => handleNavigate('dining')}
              className="h-full"
            />
          </Reveal>
          <Reveal delay={0.6} className='h-full'>
            <MagneticCard 
              id="card-lounge" 
              title="Lounge" 
              subtitle="Premium Spirits" 
              icon="liquor" 
              img="https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=2070&auto=format&fit=crop" 
              isHovered={hovered === 'card-lounge'}
              onHover={setHovered}
              onClick={() => handleNavigate('lounge')}
              className="h-full"
            />
          </Reveal>
          <Reveal delay={0.8} className='h-full'>
            <MagneticCard 
              id="card-market" 
              title="Market" 
              subtitle="Global Sourcing" 
              icon="shopping_cart" 
              img="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop" 
              isHovered={hovered === 'card-market'}
              onHover={setHovered}
              onClick={() => handleNavigate('supermarket')}
              className="h-full"
            />
          </Reveal>
          <Reveal delay={1.0} className='h-full'>
            <MagneticCard 
              id="card-water" 
              title="Water" 
              subtitle="Pure Excellence" 
              icon="water_drop" 
              img="https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=2070&auto=format&fit=crop" 
              isHovered={hovered === 'card-water'}
              onHover={setHovered}
              onClick={() => handleNavigate('water')}
              className="h-full"
            />
          </Reveal>
          <Reveal delay={1.2} className='h-full'>
            <MagneticCard 
              id="card-games" 
              title="Games" 
              subtitle="VR Frontier" 
              icon="sports_esports" 
              img="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=2012&auto=format&fit=crop" 
              isHovered={hovered === 'card-games'}
              onHover={setHovered}
              onClick={() => handleNavigate('games')}
              className="h-full"
            />
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
};

const TrustSection: React.FC = () => {
  const certifications = [
    { name: "NAFDAC Certified", icon: "verified", desc: "Meeting the highest national safety standards for food and water production." },
    { name: "ISO 9001:2015", icon: "workspace_premium", desc: "International quality management systems ensuring consistent excellence." },
    { name: "Global Standards", icon: "public", desc: "Imported hardware and premium ingredients sourced from world-class partners." }
  ];

  return (
    <section className="flex flex-col justify-center px-6 relative overflow-hidden bg-transparent border-t border-black/5 dark:border-white/5 items-center h-screen">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(242,158,13,0.02),transparent_50%)] pointer-events-none" />
      <div className="lg:max-w-[67vw] mx-auto flex flex-col justify-center">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">
              The Standard of Trust
            </span>
            <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter leading-tight">
              UNCOMPROMISING <br/><span className="text-primary">Quality</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={`delay-${i * 300}`}>
              <div 
                className="p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 shadow-soft group hover:border-primary/30 transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="material-icons text-primary text-3xl">{cert.icon}</span>
                </div>
                <h3 className="text-xl font-black dark:text-white text-slate-900 uppercase mb-4 tracking-tight leading-none">{cert.name}</h3>
                <p className="dark:text-gray-400 text-slate-600 leading-relaxed font-medium text-sm">{cert.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationSection: React.FC = () => {
  return (
    <section className="flex flex-col justify-center px-6 bg-transparent border-t border-black/5 dark:border-white/5 relative overflow-hidden items-center h-screen">
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(242,158,13,0.02),transparent_50%)] pointer-events-none" />
      <div className="lg:max-w-[67vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal animation='slide-from-left'>
          <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">
            Our Presence
          </span>
          <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter mb-6 leading-tight">
            RAYFIELD, <br/><span className="text-primary">Jos</span>
          </h2>
          <p className="text-base dark:text-gray-400 text-slate-600 leading-relaxed mb-8 font-medium">
            Visit our flagship destination at Amanda Plaza. A convergence of all lifestyle divisions in the heart of Plateau State.
          </p>
          <div className="space-y-4">
            <Reveal delay='delay-75'>
              <div className="flex items-center gap-6 p-6 rounded-3xl dark:bg-white/5 bg-white border border-black/5 dark:border-white/10 shadow-soft group hover:border-primary/30 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="material-icons text-primary text-3xl">location_on</span>
                </div>
                <div>
                  <h4 className="dark:text-white text-slate-900 font-black uppercase tracking-tight text-lg mb-1">Amanda Plaza</h4>
                  <p className="dark:text-gray-500 text-slate-400 text-sm font-medium">Rayfield, Jos, Plateau State</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay='delay-150'>
              <div className="flex items-center gap-6 p-6 rounded-3xl dark:bg-white/5 bg-white border border-black/5 dark:border-white/10 shadow-soft group hover:border-primary/30 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="material-icons text-primary text-3xl">schedule</span>
                </div>
                <div>
                  <h4 className="dark:text-white text-slate-900 font-black uppercase tracking-tight text-lg mb-1">Open Daily</h4>
                  <p className="dark:text-gray-500 text-slate-400 text-sm font-medium">8:00 AM - 11:00 PM</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
        <Reveal animation='slide-from-right'>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-elite">
            <ParallaxImage src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" alt="Jos Landscape" className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="flex items-center gap-4 text-white">
                <span className="material-icons text-primary">explore</span>
                <span className="font-black uppercase tracking-widest text-xs">Discover Plateau State</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
const VoicesSection: React.FC = () => {
  return null; // This will be removed as we are using VoicesOfJos
};

const Footer: React.FC<{ setCurrentView: (v: any) => void }> = ({ setCurrentView }) => {
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="h-screen bg-slate-50 dark:bg-background-dark dark:text-white text-slate-900 border-t border-black/5 dark:border-white/10 relative flex flex-col justify-center">
      <div className="lg:max-w-[67vw] mx-auto px-4 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-heading font-black text-xl shadow-xl shadow-primary/20">O</div>
              <span className="font-heading font-black text-2xl tracking-tight dark:text-white text-slate-900 uppercase">Orient Global</span>
            </div>
            <p className="dark:text-gray-400 text-slate-500 text-sm leading-relaxed mb-8 font-medium max-w-sm">
              Redefining lifestyle standards in Plateau State. A convergence of culinary art, premium retail, and luxury entertainment environments.
            </p>
            <div className="flex gap-4">
              {[
                { icon: 'facebook', label: 'Facebook' },
                { icon: 'camera_alt', label: 'Instagram' },
                { icon: 'alternate_email', label: 'Email' },
                { icon: 'business', label: 'LinkedIn' }
              ].map(social => (
                <a key={social.icon} className="w-10 h-10 rounded-xl dark:bg-white/5 bg-white dark:text-white text-slate-900 hover:bg-primary hover:text-white flex items-center justify-center transition-all shadow-soft border border-black/5 dark:border-white/10" href="#" aria-label={social.label}>
                  <i className="material-icons text-lg">{social.icon}</i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="dark:text-white text-slate-900 font-black uppercase tracking-[0.2em] mb-6 text-xs">Divisions</h3>
            <ul className="space-y-3 dark:text-gray-400 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              {[
                { name: 'The Bakery', view: 'bakery' },
                { name: 'Supermarket', view: 'supermarket' },
                { name: 'Restaurant', view: 'dining' },
                { name: 'Gaming Arena', view: 'games' },
                { name: 'Orient Water', view: 'water' },
                { name: 'VIP Lounge', view: 'lounge' }
              ].map(li => (
                <li key={li.name}><button onClick={() => handleNavigate(li.view)} className="hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest text-[10px]">{li.name}</button></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="dark:text-white text-slate-900 font-black uppercase tracking-[0.2em] mb-6 text-xs">Corporate</h3>
            <ul className="space-y-3 dark:text-gray-400 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              {['About Us', 'Careers', 'Investor Relations', 'Press & Media', 'Contact Support'].map(li => (
                <li key={li}><a className="hover:text-primary transition-colors flex items-center gap-2" href="#">{li}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="dark:text-white text-slate-900 font-black uppercase tracking-[0.2em] mb-6 text-xs">Newsletter</h3>
            <p className="text-xs dark:text-gray-400 text-slate-500 mb-4 leading-relaxed font-medium">Subscribe to receive corporate updates and exclusive offers.</p>
            <div className="relative">
              <input className="w-full dark:bg-white/5 bg-white border border-black/5 dark:border-white/10 rounded-xl py-3 px-4 dark:text-white text-slate-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-medium shadow-inner" placeholder="Email Address" type="email"/>
              <button className="absolute right-2 top-2 bg-primary text-white p-1.5 rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20">
                <span className="material-icons text-lg">arrow_forward</span>
              </button>
            </div>
            <p className="text-[9px] dark:text-gray-600 text-slate-400 mt-4 uppercase tracking-widest font-black">By subscribing, you agree to our Privacy Policy.</p>
          </div>
        </div>
        
        <div className="border-t border-black/5 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] dark:text-gray-500 text-slate-400 uppercase tracking-[0.2em] font-black">
          <p>© {new Date().getFullYear()} Orient Global Services Ltd. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Cookie Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string | React.ReactNode}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      // Strictly defined tools configuration: Only Function calling is enabled to avoid conflicts.
      // Search Grounding is not used here to ensure 'navigateToSectionTool' works reliably as per strict exclusivity rules.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are the Orient Global AI Concierge. Your primary goal is to help users navigate this website. If a user asks to see the bakery, market, restaurant, lounge, or standard sections, you MUST use the `navigateToSection` tool. If they ask general questions, answer them as a helpful luxury concierge. Be brief, elite, and polite.",
          tools: [{ 
            functionDeclarations: [navigateToSectionTool]
          }],
        }
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        for (const fc of response.functionCalls) {
          if (fc.name === 'navigateToSection') {
            const sectionId = (fc.args as any).sectionId;
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              setMessages(prev => [...prev, { role: 'bot', text: `Certainly. I have navigated you to the ${sectionId} section.` }]);
            } else {
               // Fallback if ID doesn't exist (should not happen with correct enum)
              setMessages(prev => [...prev, { role: 'bot', text: `I attempted to take you to the ${sectionId}, but I am unable to locate it on the map.` }]);
            }
          }
        }
      } else if (response.text) {
        setMessages(prev => [...prev, { role: 'bot', text: response.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "I'm here to serve. How may I assist you?" }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'bot', text: "I apologize, but I am currently updating my navigational systems. Please try again momentarily." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 sm:bottom-12 sm:right-12 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} className="absolute bottom-20 sm:bottom-24 right-0 w-[calc(100vw-3rem)] sm:w-[380px] h-[45vh] sm:h-[480px] max-h-[500px] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden dark:bg-zinc-900 bg-white">
            <div className="p-6 sm:p-8 border-b border-white/5 bg-gradient-to-r from-primary/20 to-transparent">
               <div className="flex items-center gap-4 mb-2">
                 <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black"><span className="material-icons text-xl">smart_toy</span></div>
                 <div><h4 className="dark:text-white text-slate-900 font-black uppercase tracking-tight text-lg leading-none">AI Concierge</h4><p className="text-green-500 text-[10px] uppercase tracking-widest font-black mt-1">Online Now</p></div>
               </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
               {messages.length === 0 && (<div className="bg-primary/10 border border-primary/20 p-6 rounded-[2rem] rounded-tl-none"><p className="dark:text-gray-200 text-slate-700 text-sm leading-relaxed italic font-medium">"Welcome to Orient Global. I can help you find products, check our filtration standards, or navigate the site for you. What would you like to see?"</p></div>)}
               {messages.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed font-medium ${m.role === 'user' ? 'bg-primary text-black rounded-br-none shadow-lg' : 'dark:bg-white/10 bg-slate-100 dark:text-gray-200 text-slate-700 border border-white/5 rounded-bl-none shadow-md'}`}>{m.text}</div></div>))}
               {isTyping && (<div className="flex justify-start"><div className="dark:bg-white/10 bg-slate-100 p-5 rounded-[2rem] rounded-bl-none flex gap-1.5 shadow-md"><span className="w-2 h-2 bg-primary rounded-full animate-bounce" /><span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" /><span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" /></div></div>)}
            </div>
            <div className="p-6 dark:bg-black/50 bg-slate-50 border-t border-white/5"><div className="flex gap-4 items-center dark:bg-white/5 bg-white px-6 py-4 rounded-[2rem] border border-white/10 focus-within:border-primary/50 transition-all shadow-inner"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Take me to the bakery..." className="bg-transparent border-none focus:ring-0 dark:text-white text-slate-900 text-sm flex-1 placeholder:text-gray-600 font-bold" /><button onClick={handleSend} className="text-primary hover:text-orange-500 transition-colors"><span className="material-icons font-black">send</span></button></div></div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 10 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-black shadow-2xl shadow-primary/40 z-50 relative group border-2 border-transparent hover:border-white/10 transition-all"
      >
        <span className="material-icons text-2xl">{isOpen ? 'close' : 'smart_toy'}</span>
        {!isOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background-dark animate-pulse shadow-lg" />}
      </motion.button>
    </div>
  );
};

const Login: React.FC<{ onLogin: () => void, onCancel: () => void }> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'orient2024') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-background-dark bg-slate-50 px-4">
      <div className="max-w-md w-full p-8 rounded-[3rem] border border-white/10 shadow-2xl dark:bg-zinc-900/80 bg-white/80 backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-heading font-black text-3xl shadow-[0_0_30px_rgba(242,158,13,0.4)] mb-6">O</div>
          <h2 className="text-3xl font-black dark:text-white text-slate-900 uppercase tracking-tighter">Admin Access</h2>
          <p className="dark:text-gray-400 text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">Orient Global Systems</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">{error}</div>}
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.2em] dark:text-gray-400 text-slate-500 mb-2">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 dark:text-white text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium" placeholder="Enter username" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.2em] dark:text-gray-400 text-slate-500 mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 dark:text-white text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium" placeholder="Enter password" />
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onCancel} className="flex-1 py-4 rounded-2xl border border-black/10 dark:border-white/10 dark:text-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 transition-all shadow-lg shadow-primary/20">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const divisions = ['Bakery', 'Market', 'Restaurant', 'Games', 'Water', 'Lounge'];
  const [activeTab, setActiveTab] = useState(divisions[0]);

  return (
    <div className="min-h-screen dark:bg-background-dark bg-slate-50 pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter font-heading">Command Center</h1>
            <p className="dark:text-gray-400 text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">Manage Orient Global Divisions</p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 dark:text-white text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group">
            <span className="material-icons text-sm group-hover:-translate-x-1 transition-transform">logout</span>
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            {divisions.map(div => (
              <button 
                key={div}
                onClick={() => setActiveTab(div)}
                className={`w-full text-left px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-between ${activeTab === div ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'dark:bg-zinc-900/50 bg-white dark:text-gray-400 text-slate-500 hover:dark:bg-zinc-800 hover:bg-slate-100 border border-black/5 dark:border-white/5'}`}
              >
                {div}
                <span className="material-icons text-lg">{activeTab === div ? 'chevron_right' : ''}</span>
              </button>
            ))}
          </div>
          
          <div className="lg:col-span-3">
            <div className="rounded-[3rem] p-8 md:p-12 border border-black/5 dark:border-white/10 shadow-2xl dark:bg-zinc-900/40 bg-white/60 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-icons text-2xl">settings_applications</span>
                </div>
                <h2 className="text-3xl font-black dark:text-white text-slate-900 uppercase tracking-tight">{activeTab} Configuration</h2>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] dark:text-gray-400 text-slate-500 mb-3">Division Name</label>
                    <input type="text" defaultValue={activeTab} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 dark:text-white text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] dark:text-gray-400 text-slate-500 mb-3">Status</label>
                    <select className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 dark:text-white text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium appearance-none">
                      <option>Active / Operational</option>
                      <option>Maintenance Mode</option>
                      <option>Coming Soon</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] dark:text-gray-400 text-slate-500 mb-3">Hero Description</label>
                  <textarea rows={4} defaultValue={`Experience the finest ${activeTab.toLowerCase()} offerings at Orient Global.`} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 dark:text-white text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] dark:text-gray-400 text-slate-500 mb-3">Featured Image URL</label>
                  <div className="flex gap-4">
                    <input type="text" defaultValue={`https://images.unsplash.com/photo-placeholder-${activeTab.toLowerCase()}`} className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 dark:text-white text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium" />
                    <button className="px-6 py-4 rounded-2xl bg-zinc-800 text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-700 transition-all">Preview</button>
                  </div>
                </div>

                <div className="pt-8 border-t border-black/10 dark:border-white/10 flex justify-end gap-4">
                  <button className="px-8 py-4 rounded-2xl border border-black/10 dark:border-white/10 dark:text-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-all">Discard Changes</button>
                  <button className="px-8 py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                    <span className="material-icons text-sm">save</span>
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SnakeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Snake Configuration
    const segmentCount = 150; // Long snake
    const segmentDist = 2;
    const segments: { x: number; y: number }[] = [];
    
    // Initialize segments
    for (let i = 0; i < segmentCount; i++) {
      segments.push({ x: width / 2, y: height / 2 });
    }

    let angle = Math.random() * Math.PI * 2;
    let targetAngle = angle;
    let speed = 2;
    let turnSpeed = 0.02;
    let mode: 'cruising' | 'hunting' = 'cruising';
    let modeTimer = 0;
    
    // Target position (food)
    let target = { x: Math.random() * width, y: Math.random() * height };

    const update = () => {
      // Mode Switching Logic
      modeTimer++;
      if (modeTimer > 300) { // Switch every ~5 seconds
        modeTimer = 0;
        mode = Math.random() > 0.7 ? 'hunting' : 'cruising';
        
        if (mode === 'hunting') {
          speed = 5 + Math.random() * 3; // Fast
          turnSpeed = 0.1 + Math.random() * 0.1; // Sharp turns
        } else {
          speed = 1.5 + Math.random(); // Slow
          turnSpeed = 0.01 + Math.random() * 0.02; // Gentle turns
        }
      }

      // Target Logic
      const dx = target.x - segments[0].x;
      const dy = target.y - segments[0].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100 || Math.random() < 0.005) {
        // Pick new target
        target = { 
          x: Math.random() * width, 
          y: Math.random() * height 
        };
      }

      // Steering
      const desiredAngle = Math.atan2(dy, dx);
      let angleDiff = desiredAngle - angle;
      
      // Normalize angle diff
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      // Apply turn
      if (Math.abs(angleDiff) < turnSpeed) {
        angle = desiredAngle;
      } else {
        angle += Math.sign(angleDiff) * turnSpeed;
      }

      // Move Head
      const head = segments[0];
      const nextX = head.x + Math.cos(angle) * speed;
      const nextY = head.y + Math.sin(angle) * speed;

      // Boundary Wrap
      segments[0].x = (nextX + width) % width;
      segments[0].y = (nextY + height) % height;

      // Move Body (Inverse Kinematics / Follow)
      for (let i = 1; i < segmentCount; i++) {
        const curr = segments[i];
        const prev = segments[i - 1];
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Handle wrapping for body segments
        if (dist > 100) {
           curr.x = prev.x;
           curr.y = prev.y;
        } else if (dist > segmentDist) {
           const angle = Math.atan2(dy, dx);
           curr.x = prev.x + Math.cos(angle) * segmentDist;
           curr.y = prev.y + Math.sin(angle) * segmentDist;
        }
      }
    };

    const draw = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.0)'; // Transparent clear
      ctx.clearRect(0, 0, width, height);

      // Draw Snake
      ctx.beginPath();
      ctx.moveTo(segments[0].x, segments[0].y);
      
      // Smooth curve through points
      for (let i = 1; i < segmentCount - 1; i++) {
        const xc = (segments[i].x + segments[i + 1].x) / 2;
        const yc = (segments[i].y + segments[i + 1].y) / 2;
        ctx.quadraticCurveTo(segments[i].x, segments[i].y, xc, yc);
      }
      
      // Styling
      const gradient = ctx.createLinearGradient(segments[0].x, segments[0].y, segments[segmentCount-1].x, segments[segmentCount-1].y);
      gradient.addColorStop(0, 'rgba(249, 115, 22, 0.8)'); // Primary Orange
      gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');   // Transparent tail
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 15;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(249, 115, 22, 0.6)';
      
      ctx.stroke();
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40 blur-xl" />
      <div className="absolute inset-0 bg-white/5 dark:bg-white/5 backdrop-blur-[1px]" />
    </div>
  );
};

const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const [globalTheme, setGlobalTheme] = useState<'dark' | 'light'>('light');
  const [divisionThemes, setDivisionThemes] = useState<Record<string, 'dark' | 'light'>>({
    home: 'light', login: 'dark', admin: 'dark', bakery: 'dark',
    supermarket: 'dark', dining: 'dark', games: 'dark', water: 'dark', lounge: 'dark'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'admin' | 'bakery' | 'supermarket' | 'dining' | 'games' | 'water' | 'lounge' | 'about'>('home');
  const [bakeryView, setBakeryView] = useState<'home' | 'architect' | 'wholesale' | 'story'>('home');
  const [supermarketPage, setSupermarketPage] = useState<SupermarketPage>('Home');
  const [isSmartPasteOpen, setIsSmartPasteOpen] = useState(false);
  const [diningView, setDiningView] = useState<DiningView>('about');
  const [gamesPage, setGamesPage] = useState<GamesPage>(GamesPage.LANDING);
  const [waterPage, setWaterPage] = useState<WaterPage>('home');
  const [loungePage, setLoungePage] = useState<LoungePage>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    // Native scroll handling
    const container = document.getElementById('main-scroll-container');
    if (!container) return;

    // Initialize Lenis on the specific container
    const isMobile = window.innerWidth < 1024;
    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild as HTMLElement,
      duration: isMobile ? 1.2 : 2.0, // Standard duration for mobile, cinematic for desktop
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isMobile, // Enable smooth wheel on mobile (standard), disable on desktop (custom)
      touchMultiplier: isMobile ? 2 : 0, // Enable touch on mobile, disable on desktop (custom)
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Custom "Cinematic" Scroll Logic (Desktop Only)
    let isAnimating = false;
    let snapEnabled = true;
    let snapTimeout: ReturnType<typeof setTimeout> | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return; // Allow native scrolling on mobile

      // If the scroll velocity is high, disable snapping
      if (Math.abs(e.deltaY) > 50) {
        snapEnabled = false;
        if (snapTimeout) clearTimeout(snapTimeout);
        // Re-enable snap after 300ms of inactivity
        snapTimeout = setTimeout(() => {
          snapEnabled = true;
        }, 300);
        return;
      }
      
      // If snap is disabled, allow native scroll
      if (!snapEnabled || isAnimating) return;

      const sections = Array.from(document.querySelectorAll('.cinematic-section'));
      if (!sections.length) return;

      // Find the section closest to the center of the viewport
      const viewportCenter = window.innerHeight / 2;
      let closestSection = sections[0];
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      // Determine which section to snap to based on scroll direction
      const currentIndex = sections.indexOf(closestSection);
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Apply directional bias: if scrolling down, we favor the next section
      let targetIndex = currentIndex;
      if (direction > 0 && currentIndex < sections.length - 1) {
        targetIndex = currentIndex + 1;
      } else if (direction < 0 && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      } else {
        targetIndex = currentIndex;
      }
      
      const targetSection = sections[targetIndex] as HTMLElement;

      if (targetSection) {
        e.preventDefault(); // Prevent the native small scroll since we are snapping
        isAnimating = true;
        
        // Custom easing with a subtle overshoot (backOut)
        const backOut = (t: number) => {
          const s = 1.70158;
          return --t * t * ((s + 1) * t + s) + 1;
        };

        // Dynamic duration based on distance
        const rect = targetSection.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        const duration = Math.min(Math.max(distance / 1000, 0.5), 1.5);

        lenis.scrollTo(targetSection, {
          duration: duration,
          easing: backOut,
          onComplete: () => {
            isAnimating = false;
          }
        });
      }
    };

    // Touch handling for mobile "swipe" to scroll (Desktop/Tablet only if needed, but mostly disabled for mobile native scroll)
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (isMobile) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile) return;
      e.preventDefault(); // Prevent native scroll on desktop
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isMobile) return;
      if (isAnimating) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) < 50) return; // Ignore small taps
      
      const sections = Array.from(document.querySelectorAll('.cinematic-section'));
      if (!sections.length) return;

      const viewportCenter = window.innerHeight / 2;
      let closestSection = sections[0];
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      const currentIndex = sections.indexOf(closestSection);
      const direction = deltaY > 0 ? 1 : -1; // Swipe up = scroll down
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
      const targetSection = sections[nextIndex];

      if (targetSection) {
        isAnimating = true;
        lenis.scrollTo(targetSection as HTMLElement, {
          duration: 2.0,
          lock: true,
          onComplete: () => {
            isAnimating = false;
          },
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile) return;
      if (isAnimating) return;
      
      const sections = Array.from(document.querySelectorAll('.cinematic-section'));
      if (!sections.length) return;

      let direction = 0;
      if (e.key === 'ArrowDown' || e.key === ' ') {
        direction = 1;
      } else if (e.key === 'ArrowUp') {
        direction = -1;
      }

      if (direction !== 0) {
        e.preventDefault();
        
        const viewportCenter = window.innerHeight / 2;
        let closestSection = sections[0];
        let minDistance = Infinity;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        });

        const currentIndex = sections.indexOf(closestSection);
        const nextIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
        const targetSection = sections[nextIndex];

        if (targetSection) {
          isAnimating = true;
          lenis.scrollTo(targetSection as HTMLElement, {
            duration: 2.0,
            lock: true,
            onComplete: () => {
              isAnimating = false;
            },
          });
        }
      }
    };

    if (!isMobile) {
        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
    }

    const handleScroll = () => {
      // Use lenis.scroll or container.scrollTop depending on what drives the value
      // Since Lenis is scrolling the container, container.scrollTop should be valid
      const currentScrollY = container.scrollTop;
      setScrolled(currentScrollY > 50);
      
      const diff = currentScrollY - lastScrollY.current;
      
      if (diff > 0 && currentScrollY > 10) {
        // Instant hide on scroll down
        setNavHidden(true);
      } else if (diff < -15 && currentScrollY > 0) {
        // Intentional show on scroll up (threshold of 15px)
        setNavHidden(false);
      } else if (currentScrollY <= 0) {
        setNavHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    // Lenis emits 'scroll' events too, but native listener on container is safer for UI state
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      if (snapTimeout) clearTimeout(snapTimeout);
      lenis.destroy();
    };
  }, [currentView]);

  useEffect(() => {
    const activeTheme = divisionThemes[currentView] || 'dark';
    document.documentElement.classList.toggle('dark', activeTheme === 'dark');
  }, [currentView, divisionThemes]);

  const toggleGlobalTheme = () => {
    const newTheme = globalTheme === 'dark' ? 'light' : 'dark';
    setGlobalTheme(newTheme);
    setDivisionThemes(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => updated[key] = newTheme);
      return updated;
    });
  };

  const toggleLocalTheme = (division: string) => {
    setDivisionThemes(prev => ({
      ...prev,
      [division]: prev[division] === 'dark' ? 'light' : 'dark'
    }));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const getAmbientColor = () => {
    switch(currentView) {
      case 'bakery': return 'bg-amber-500';
      case 'supermarket': return 'bg-emerald-500';
      case 'dining': return 'bg-rose-600';
      case 'games': return 'bg-cyan-500';
      case 'water': return 'bg-sky-500';
      case 'lounge': return 'bg-yellow-600';
      default: return 'bg-primary';
    }
  };

  return (
    <>
        <AnimatePresence>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>
        <div className="bg-slate-50 dark:bg-background-dark transition-colors duration-700 dark:text-white text-slate-900 selection:bg-primary selection:text-black relative z-10 h-[100dvh] overflow-hidden">
          <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 h-[120%]">
            <SnakeBackground />
          </motion.div>
          
          <div ref={scrollContainerRef} className="w-full mx-auto h-[100dvh] overflow-y-auto overflow-x-hidden scroll-smooth bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']" id="main-scroll-container">
            <ScrollContext.Provider value={{ scrollContainerRef, activeSectionId, setActiveSectionId }}>
            {currentView === 'home' && (
              <div className="relative">
                <Navbar theme={globalTheme} toggleTheme={toggleGlobalTheme} setCurrentView={setCurrentView} scrolled={scrolled} navHidden={navHidden} />
                <SectionWrapper id="hero" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                  <Hero />
                </SectionWrapper>
                <div className="relative z-10 bg-transparent">
                  <SectionWrapper id="services" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                      <ServicesGrid setCurrentView={setCurrentView} />
                  </SectionWrapper>
                  <SectionWrapper id="trust" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                      <TrustSection />
                  </SectionWrapper>
                  <SectionWrapper id="water-deep" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                      <WaterDeepDive />
                  </SectionWrapper>
                  <SectionWrapper id="market-deep" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                      <MarketDeepDive />
                  </SectionWrapper>
                  <SectionWrapper id="bakery-deep" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                    <BakeryDeepDive />
                  </SectionWrapper>
                  <SectionWrapper id="dining-deep" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                    <DiningDeepDive />
                  </SectionWrapper>
                  <SectionWrapper id="lounge-deep" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                    <LoungeDeepDive />
                  </SectionWrapper>
                  <SectionWrapper id="games-deep" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                    <GamesDeepDive />
                  </SectionWrapper>
                  <SectionWrapper id="voices" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                    <VoicesOfJos />
                  </SectionWrapper>
                  <SectionWrapper id="location" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                    <LocationSection />
                  </SectionWrapper>
                  <SectionWrapper id="cta" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                    <FinalCTA />
                  </SectionWrapper>
                  <SectionWrapper id="footer" className="relative w-full min-h-[100dvh] flex flex-col justify-center cinematic-section">
                    <Footer setCurrentView={setCurrentView} />
                  </SectionWrapper>
                </div>
                <ChatBot />
              </div>
            )}
            {(currentView === 'login' || currentView === 'admin') && (
              <div className="pt-16 sm:pt-20 min-h-screen">
                <StudioApp onCancel={() => setCurrentView('home')} />
              </div>
            )}
            {currentView === 'bakery' && (
              <div className="relative">
                <Navbar theme={globalTheme} toggleTheme={toggleGlobalTheme} setCurrentView={setCurrentView} scrolled={scrolled} navHidden={navHidden} isSubpage />
                <div className="pt-12 sm:pt-14">
                  <BakeryNav navHidden={navHidden} currentView={bakeryView} setView={setBakeryView} localTheme={divisionThemes['bakery']} toggleLocalTheme={() => toggleLocalTheme('bakery')} />
                  <div className="pt-12">
                    <BakeryApp currentView={bakeryView} />
                  </div>
                  <Footer setCurrentView={setCurrentView} />
                </div>
              </div>
            )}
            {currentView === 'supermarket' && (
              <div className="relative">
                <Navbar theme={globalTheme} toggleTheme={toggleGlobalTheme} setCurrentView={setCurrentView} scrolled={scrolled} navHidden={navHidden} isSubpage />
                <div className="pt-12 sm:pt-14">
                  <SupermarketNav navHidden={navHidden} activePage={supermarketPage} setActivePage={setSupermarketPage} setIsSmartPasteOpen={setIsSmartPasteOpen} localTheme={divisionThemes['supermarket']} toggleLocalTheme={() => toggleLocalTheme('supermarket')} />
                  <div className="pt-12">
                    <SupermarketApp activePage={supermarketPage} setActivePage={setSupermarketPage} isSmartPasteOpen={isSmartPasteOpen} setIsSmartPasteOpen={setIsSmartPasteOpen} />
                  </div>
                  <Footer setCurrentView={setCurrentView} />
                </div>
              </div>
            )}
            {currentView === 'dining' && (
              <div className="relative">
                <Navbar theme={globalTheme} toggleTheme={toggleGlobalTheme} setCurrentView={setCurrentView} scrolled={scrolled} navHidden={navHidden} isSubpage />
                <div className="pt-12 sm:pt-14">
                  <DiningNav navHidden={navHidden} currentView={diningView} setView={setDiningView} localTheme={divisionThemes['dining']} toggleLocalTheme={() => toggleLocalTheme('dining')} />
                  <div className="pt-12">
                    <DiningApp currentView={diningView} />
                  </div>
                  <Footer setCurrentView={setCurrentView} />
                </div>
              </div>
            )}
            {currentView === 'games' && (
              <div className="relative">
                <Navbar theme={globalTheme} toggleTheme={toggleGlobalTheme} setCurrentView={setCurrentView} scrolled={scrolled} navHidden={navHidden} isSubpage />
                <div className="pt-12 sm:pt-14">
                  <GamesNav navHidden={navHidden} currentPage={gamesPage} onNavigate={setGamesPage} localTheme={divisionThemes['games']} toggleLocalTheme={() => toggleLocalTheme('games')} />
                  <div className="pt-12">
                    <GamesApp currentPage={gamesPage} onNavigate={setGamesPage} />
                  </div>
                  <Footer setCurrentView={setCurrentView} />
                </div>
              </div>
            )}
            {currentView === 'water' && (
              <div className="relative">
                <Navbar theme={globalTheme} toggleTheme={toggleGlobalTheme} setCurrentView={setCurrentView} scrolled={scrolled} navHidden={navHidden} isSubpage />
                <div className="pt-12 sm:pt-14">
                  <WaterNav navHidden={navHidden} currentPage={waterPage} onNavigate={setWaterPage} localTheme={divisionThemes['water']} toggleLocalTheme={() => toggleLocalTheme('water')} />
                  <div className="pt-12">
                    <WaterApp currentPage={waterPage} onNavigate={setWaterPage} />
                  </div>
                  <Footer setCurrentView={setCurrentView} />
                </div>
              </div>
            )}
            {currentView === 'lounge' && (
              <div className="relative">
                <Navbar theme={globalTheme} toggleTheme={toggleGlobalTheme} setCurrentView={setCurrentView} scrolled={scrolled} navHidden={navHidden} isSubpage />
                <div className="pt-12 sm:pt-14">
                  <LoungeNav navHidden={navHidden} currentPage={loungePage} onNavigate={setLoungePage} localTheme={divisionThemes['lounge']} toggleLocalTheme={() => toggleLocalTheme('lounge')} />
                  <div className="pt-12">
                    <LoungeApp currentPage={loungePage} onNavigate={setLoungePage} />
                  </div>
                  <Footer setCurrentView={setCurrentView} />
                </div>
              </div>
            )}
            {currentView === 'about' && (
              <div className="relative">
                <Navbar theme={globalTheme} toggleTheme={toggleGlobalTheme} setCurrentView={setCurrentView} scrolled={scrolled} navHidden={navHidden} isSubpage />
                <div className="pt-12 sm:pt-14">
                  <About setCurrentView={setCurrentView} />
                  <Footer setCurrentView={setCurrentView} />
                </div>
              </div>
            )}
            </ScrollContext.Provider>
          </div>
        </div>
    </>
  );
};

export default App;
