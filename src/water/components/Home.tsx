import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { cmsApi } from '@/services/cmsApi';

const steps = [
  { id: '01', title: 'Sediment', desc: 'Removes large particles.', icon: 'filter_alt', note: '5-micron polypropylene filter catches rust, dust, and sand.' },
  { id: '02', title: 'Carbon', desc: 'Absorbs chlorine & odors.', icon: 'grain', note: 'Activated carbon block removes volatile organic compounds.' },
  { id: '03', title: 'RO', desc: 'Reverse Osmosis Core.', icon: 'blur_on', note: '0.0001 micron membrane rejects heavy metals and salts.' },
  { id: '04', title: 'UV Ray', desc: 'Biological sterilization.', icon: 'light_mode', note: '254nm UV light deactivates 99.9% of bacteria and viruses.' },
  { id: '05', title: 'Mineral', desc: 'Re-mineralization.', icon: 'science', note: 'Addition of Calcium and Magnesium for pH balance.' },
  { id: '06', title: 'Polish', desc: 'Taste enhancement.', icon: 'diamond', note: 'Final coconut shell carbon stage for crisp taste.' },
  { id: '07', title: 'Bottling', desc: 'Sealed for purity.', icon: 'inventory_2', note: 'ISO 9001 certified sterile bottling environment.' },
];

const Home: React.FC<{ onNavigate?: (p: any) => void }> = ({ onNavigate }) => {
  const [guests, setGuests] = useState(50);
  const [hours, setHours] = useState(4);
  const [subscriptionType, setSubscriptionType] = useState<'weekly'|'monthly'>('weekly');
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cmsApi.getDivisionContent('water');
        setCmsData(data);
      } catch (error) {
        console.error("Failed to fetch CMS data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const recommendedLiters = Math.round(guests * hours * 0.5);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex items-center justify-center font-sans text-blue-500">
        <div className="animate-pulse tracking-[0.2em] uppercase text-sm">Loading Water Data...</div>
      </div>
    );
  }

  const heroBlock = cmsData?.blocks?.find((b: any) => b.block_type === 'hero')?.content_payload || {
    title: "Purity in every drop.",
    subtitle: "Experience water refined through seven stages of molecular purification. Traceable quality, delivered to your door."
  };

  const productsBlock = cmsData?.blocks?.find((b: any) => b.block_type === 'products')?.content_payload || {
    items: [
      { id: '1', name: '75cl Premium', description: 'Water Bottle', price: 150, image: 'https://images.unsplash.com/photo-1602143407151-01114195bc03?auto=format&fit=crop&w=400&q=80', volume: '75cl' },
      { id: '2', name: '50cl On-the-Go', description: 'Bottle', price: 100, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=400&q=80', volume: '50cl' },
      { id: '3', name: '19L Dispenser', description: 'Refill', price: 1200, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80', volume: '19L' },
      { id: '4', name: 'Sachet Pack', description: '(20pcs)', price: 300, image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=400&q=80', volume: '20pcs' },
    ]
  };

  const products: Product[] = productsBlock.items;

  return (
    <div className="w-full font-sans">
      {/* Hero Section */}
      <header className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
        
        {/* Soft Radial Gradients for Atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-200/40 dark:bg-blue-900/20 blur-[120px]"
           />
           <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
             transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-sky-200/40 dark:bg-sky-900/20 blur-[100px]"
           />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center px-5 py-1.5 mb-8 border border-blue-500/10 rounded-full bg-white/30 dark:bg-white/5 backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 animate-pulse"></span>
            <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-slate-600 dark:text-slate-300">Medical Grade Purification</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl md:text-[7rem] font-light tracking-tighter text-slate-900 dark:text-white mb-6 leading-[0.85]"
          >
            {heroBlock.title.split(' ').slice(0, -2).join(' ')} <br />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">{heroBlock.title.split(' ').slice(-2).join(' ')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            {heroBlock.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium text-xs tracking-wide hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => onNavigate?.('process')} 
              className="group flex items-center gap-2 px-8 py-3.5 bg-transparent text-slate-900 dark:text-white rounded-full font-medium text-xs tracking-wide hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              Explore Process
              <span className="material-icons text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </motion.div>
        </div>

        {/* Gradient Mask for Scroll Fade */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-10" />
      </header>

      {/* 7 Steps Section - Minimalist */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-4 tracking-tight">7 Steps to Purity</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base font-light">Our proprietary filtration process removes 99.99% of impurities while retaining essential minerals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-24">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="flex flex-col items-start group"
              >
                <div className="text-blue-500/50 font-light text-4xl mb-6 group-hover:text-blue-500 transition-colors duration-500">{step.id}</div>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{step.desc}</p>
                <div className="mt-6 w-8 h-[1px] bg-slate-200 dark:bg-slate-800 group-hover:w-16 group-hover:bg-blue-500 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG SECTION - Glassmorphism & Airy */}
      <section id="catalog" className="py-12 bg-white dark:bg-[#050b1a] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-4 tracking-tight">The Collection</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-light">Reliable hydration for home, office, and events.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-slate-50 dark:bg-slate-900 rounded-3xl mb-8 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light">{product.description}</p>
                  </div>
                  <span className="font-light text-slate-900 dark:text-white text-lg">₦{product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Calculator - Clean Utility */}
          <div className="max-w-3xl mx-auto bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-3">Hydration Calculator</h2>
              <p className="text-slate-500 dark:text-slate-400 font-light text-sm">Ensure your team or guests stay perfectly hydrated.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Number of Guests</label>
                <input 
                  type="number" 
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 pb-4 text-3xl font-light text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Duration (Hours)</label>
                <input 
                  type="number" 
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 pb-4 text-3xl font-light text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-slate-500 dark:text-slate-400 font-light mb-4">Recommended Bundle</p>
              <div className="text-4xl font-light text-slate-900 dark:text-white mb-6">
                ₦{((Math.ceil(recommendedLiters / 19) * 1200) + (Math.ceil(guests/12) * 1800)).toLocaleString()}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
                {Math.ceil(recommendedLiters / 19)}x 19L Refills & {Math.ceil(guests / 12)}x 50cl Cases
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;