import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDb } from './lib/mockDb';
import { useBakeryCms } from './lib/bakeryCmsData';

type CartItem = { sku: string; qty: number; price: number };

export const Wholesale: React.FC<{ setCurrentView?: (v: any) => void; currentUser?: any }> = ({ setCurrentView, currentUser }) => {
  const { data: bakeryData } = useBakeryCms();
  const wholesale = bakeryData.wholesale;
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);

  // Prefill with 20 items for testing
  const [cart, setCart] = useState<Record<string, CartItem>>({
    'OB-W-001': { sku: 'OB-W-001', qty: 50, price: 1200 },
    'OB-P-045': { sku: 'OB-P-045', qty: 10, price: 12500 },
    'OB-W-003': { sku: 'OB-W-003', qty: 25, price: 1500 },
    'OB-D-112': { sku: 'OB-D-112', qty: 5, price: 8000 },
    'OB-B-088': { sku: 'OB-B-088', qty: 100, price: 1800 },
    'OB-C-001': { sku: 'OB-C-001', qty: 15, price: 4500 },
    'OB-V-002': { sku: 'OB-V-002', qty: 20, price: 4750 },
    'OB-K-003': { sku: 'OB-K-003', qty: 12, price: 5500 },
    'OB-A-004': { sku: 'OB-A-004', qty: 30, price: 5500 },
    'OB-S-005': { sku: 'OB-S-005', qty: 40, price: 5000 },
    'OB-F-001': { sku: 'OB-F-001', qty: 8, price: 6500 },
    'OB-M-002': { sku: 'OB-M-002', qty: 10, price: 8500 },
    'OB-E-003': { sku: 'OB-E-003', qty: 25, price: 7000 },
    'OB-L-004': { sku: 'OB-L-004', qty: 50, price: 6000 },
    'OB-P-005': { sku: 'OB-P-005', qty: 15, price: 8000 },
    'OB-R-006': { sku: 'OB-R-006', qty: 5, price: 9000 },
    'OB-O-007': { sku: 'OB-O-007', qty: 10, price: 7500 },
    'OB-B-001': { sku: 'OB-B-001', qty: 20, price: 4000 },
    'OB-G-002': { sku: 'OB-G-002', qty: 35, price: 3500 },
    'OB-H-003': { sku: 'OB-H-003', qty: 18, price: 4500 },
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Mock Master Menu for search demonstration
  const masterMenu = useMemo(() => [
    { sku: 'OB-W-001', name: "Premium Family Loaf (Sliced)", price: 1200 },
    { sku: 'OB-P-045', name: "Meat Pie Catering Box (24pcs)", price: 12500 },
    { sku: 'OB-W-003', name: "Whole Wheat Healthy Loaf", price: 1500 },
    { sku: 'OB-D-112', name: "Glazed Doughnut Tray (50pcs)", price: 8000 },
    { sku: 'OB-B-088', name: "Burger Buns (Pack of 12)", price: 1800 },
    { sku: 'OB-C-001', name: "Butter Croissant", price: 4500 },
    { sku: 'OB-V-002', name: "Pain au Chocolat", price: 4750 },
    { sku: 'OB-K-003', name: "Kouign-Amann", price: 5500 },
    { sku: 'OB-A-004', name: "Almond Croissant", price: 5500 },
    { sku: 'OB-S-005', name: "Sticky Cinnamon Roll", price: 5000 },
    { sku: 'OB-F-001', name: "Forest Berry Tart", price: 6500 },
    { sku: 'OB-M-002', name: "Vanilla Mille-feuille", price: 8500 },
    { sku: 'OB-E-003', name: "Dark Chocolate & Gold Éclair", price: 7000 },
    { sku: 'OB-L-004', name: "Lemon Meringue Tartlet", price: 6000 },
    { sku: 'OB-P-005', name: "Paris-Brest", price: 8000 },
    { sku: 'OB-R-006', name: "Raspberry Macaron Ispahan", price: 9000 },
    { sku: 'OB-O-007', name: "Opera Cake Slice", price: 7500 },
    { sku: 'OB-B-001', name: "Brown Butter Financiers", price: 4000 },
    { sku: 'OB-G-002', name: "Lemon Glazed Madeleine (3pcs)", price: 3500 },
    { sku: 'OB-H-003', name: "Double Chocolate Brownie", price: 4500 },
    { sku: 'OB-I-004', name: "Marble Pound Cake Slice", price: 3500 },
    { sku: 'OB-J-005', name: "Pistachio Rose Loaf", price: 5000 },
  ], []);

  const filteredResults = masterMenu.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItemToCart = (item: any) => {
    setCart(prev => ({
      ...prev,
      [item.sku]: prev[item.sku] ? prev[item.sku] : { sku: item.sku, qty: 1, price: item.price }
    }));
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const updateQty = (sku: string, qty: number) => {
    setCart(prev => ({
      ...prev,
      [sku]: { ...prev[sku], qty: Math.max(0, qty) }
    }));
  };

  // Dynamic calculations
  const { totalUnits, baseTotal } = useMemo(() => {
    return Object.values(cart).reduce((acc, item) => ({
      totalUnits: acc.totalUnits + item.qty,
      baseTotal: acc.baseTotal + (item.qty * item.price)
    }), { totalUnits: 0, baseTotal: 0 });
  }, [cart]);

  // Determine tier and glow color
  const tier = totalUnits >= 800 ? 3 : totalUnits >= 400 ? 2 : totalUnits >= 150 ? 1 : 0;
  const discountRate = tier === 3 ? 0.20 : tier === 2 ? 0.12 : tier === 1 ? 0.05 : 0;
  const discountAmount = baseTotal * discountRate;
  const finalTotal = baseTotal - discountAmount;

  const thermometerColor = tier === 3 ? 'bg-[var(--bakery-high-tier)]' : tier === 2 ? 'bg-[var(--bakery-success)]' : tier === 1 ? 'bg-[var(--bakery-primary)]' : 'bg-[var(--bakery-text-muted)]';
  const thermometerGlow = tier === 3 ? 'shadow-[var(--bakery-high-tier)]/50' : tier === 2 ? 'shadow-[var(--bakery-success)]/50' : tier === 1 ? 'shadow-[var(--bakery-primary)]/50' : 'shadow-none';
  const progressPercent = Math.min(100, (totalUnits / 1000) * 100);

  return (
    <div className="bakery-theme bg-[var(--bakery-bg)] text-[var(--bakery-text)] font-sans selection:bg-[var(--bakery-primary)] selection:text-white pt-0">
      {/* Section 1: Professional Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="High-end banquet catering setup with chefs serving food"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF_lco6zprEdQlI2LmcDLCSaXVyBB8sfTNRNQBZtPsBrXL6WpfVvb_Rhvg8zDIa-fYvgnDxVUQX-66V4dPxxANmhZdEaMyMlV1R2DZ5AvRfCgjRipVcBIS0HCdHjN5qrXr4CObMPzHS9HXJQHExewlvcHHpf8PDRLfpxYmjw0LFXE-88dpfDQfpkEWHnfqTD6V9dipw-i5Jl4N7SbYSfjM_StPM4T9Y6ww6OIWhf4iWRpr7Utv6DsIBvyjVA64s7c4Ye0yc2R8DPrQ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bakery-bg)] via-[var(--bakery-bg)]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bakery-primary)]/20 border border-[var(--bakery-primary)]/30 text-[var(--bakery-primary)] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--bakery-primary)] animate-pulse"></span>
            Premium B2B Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[var(--bakery-heading)] mb-6 leading-tight tracking-tighter"
          >
            {wholesale.title.split(' ').map((word: string, i: number) => i === 2 ? <span key={i} className="font-['Dancing_Script',_cursive] italic text-6xl md:text-8xl text-[var(--bakery-primary)] pr-2">{word} </span> : word + ' ')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-[var(--bakery-text-muted)] font-light"
          >
            {wholesale.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => { document.getElementById('quick-order')?.scrollIntoView({ behavior: 'smooth' }) }} className="px-8 py-3.5 bg-[var(--bakery-primary)] text-white font-bold rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 active:scale-95 text-xs uppercase tracking-[0.15em]">
              Wholesale Portal
            </button>
            <button
              onClick={() => { document.getElementById('event-inquiry')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 text-xs uppercase tracking-[0.15em] backdrop-blur-md"
            >
              Event Catering
            </button>
          </motion.div>

          {/* Quick Stats - Staggered fade in */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
            }}
            className="mt-16 bg-[var(--bakery-card-bg)]/80 backdrop-blur-md border border-[var(--bakery-card-border)] rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { val: wholesale.metrics.daily, lbl: "Daily Loaves" },
              { val: wholesale.metrics.partners + "+", lbl: "Corporate Partners" },
              { val: wholesale.metrics.rating, lbl: "Partner Rating" },
              { val: "Jos", lbl: "HQ & Distribution" }
            ].map(stat => (
              <motion.div key={stat.lbl} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <div className="text-2xl font-bold text-[var(--bakery-heading)]">{stat.val}</div>
                <div className="text-xs text-[var(--bakery-text-muted)] uppercase tracking-widest font-bold">{stat.lbl}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Section 2: Bulk Ordering Portal */}
      <section className="py-20 bg-[var(--bakery-bg-soft)] relative border-y border-[var(--bakery-card-border)]/50" id="quick-order">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 relative z-[50]">
            <h2 className="text-5xl font-['Dancing_Script',_cursive] text-[var(--bakery-primary)] mb-2 tracking-wide block">Bulk Ordering Portal</h2>
            <p className="text-[var(--bakery-text-muted)] text-sm max-w-2xl mx-auto uppercase tracking-widest font-bold">Build your wholesale order by searching for products. Volume discounts are applied instantly as your order grows.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative px-4 sm:px-0 mt-8">
            <div className="xl:col-span-2 flex flex-col space-y-6">
              {/* Left Column Content */}
              <div className="flex flex-col space-y-0 pt-1 z-1">

                {/* Search Bar - Sticky Alignment */}
                <div className="sticky top-[108px] z-[45] group max-w-full">
                  <div className="absolute left-6 top-0 bottom-0 flex items-center justify-center pointer-events-none">
                    <span className="material-icons text-[var(--bakery-text-muted)] text-xl group-focus-within:text-[var(--bakery-primary)] transition-colors">search</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search and add items to your selection..."
                    className="w-full bg-[var(--bakery-card-bg)] border border-[var(--bakery-card-border)]/50 rounded-full pl-14 pr-6 py-4 text-sm outline-none focus:border-[var(--bakery-primary)] focus:ring-1 focus:ring-[var(--bakery-primary)] transition-all text-[var(--bakery-text)] shadow-sm relative z-20"
                    value={searchQuery}
                    onFocus={() => setShowSearchResults(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(true);
                    }}
                  />

                  {/* Search Results Dropdown */}
                  <AnimatePresence>
                    {showSearchResults && searchQuery.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[var(--bakery-card-bg)] border border-[var(--bakery-card-border)] rounded-2xl shadow-2xl overflow-hidden z-40"
                      >
                        <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                          {filteredResults.length > 0 ? (
                            filteredResults.map(item => (
                              <div
                                key={item.sku}
                                onClick={() => addItemToCart(item)}
                                className="p-4 flex items-center justify-between hover:bg-[var(--bakery-bg-soft)] cursor-pointer border-b border-white/5 last:border-0 transition-colors"
                              >
                                <div className="text-left">
                                  <p className="font-bold text-[var(--bakery-heading)] text-sm">{item.name}</p>
                                  <p className="text-[10px] text-[var(--bakery-text-muted)] tracking-widest uppercase font-mono">{item.sku}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <p className="font-bold text-[var(--bakery-primary)] text-sm">₦{item.price.toLocaleString()}</p>
                                  <span className="material-icons text-[var(--bakery-primary)] text-xl">add_circle_outline</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-10 text-center text-[var(--bakery-text-muted)]">No items found matching "{searchQuery}"</div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* The Northern Seal: Solid background mask starts from portal top and ends at the bottom of this sticky block */}
                  <div className="absolute top-[-180px] l-[-10%] w-full bottom-0 bg-[var(--bakery-bg-soft)]  z-[-5] pointer-events-none" />

                  {/* Unified Table Header (Moved from Table Body) */}
                  <div className="z-30 bg-[var(--bakery-card-bg)]/50 rounded-[2rem] backdrop-blur-md border-b border-[var(--bakery-card-border)]/50 -mx-1 px-1">
                    <div className="grid grid-cols-[2fr_120px_180px_120px_60px] px-10 py-6 text-[var(--bakery-text)] font-bold uppercase text-[10px] tracking-[0.2em] min-w-[800px]">
                      <div>Item Name</div>
                      <div className="text-right">Unit Price</div>
                      <div className="text-center">Quantity</div>
                      <div className="text-right">Subtotal</div>
                      <div></div>
                    </div>
                  </div>
                </div>

                {/* Cart Table Container - Now part of page scroll */}
                <div className="bg-[var(--bakery-card-bg)]/50 rounded-[2rem] border border-[var(--bakery-card-border)]/50 shadow-2xl relative mt-4 overflow-hidden flex flex-col min-h-0">
                  <div className="overflow-x-auto no-scrollbar relative">
                    <div className="min-w-[800px]">
                      {/* Table Header has been moved to the sticky search container above for synchronized scrolling and masking */}

                      {/* Table Body - Natural Grid Rows */}
                      <div className="divide-y divide-white/5 bg-[var(--bakery-card-bg)]/30">
                        {Object.values(cart).map((item, idx) => {
                          const masterItem = masterMenu.find(m => m.sku === item.sku);
                          return (
                            <div
                              key={item.sku}
                              className={`grid grid-cols-[2fr_120px_180px_120px_60px] items-center px-10 py-6 hover:bg-[var(--bakery-bg-soft)] transition-colors ${idx % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                            >
                              <div className="font-bold text-[var(--bakery-heading)] text-base">
                                {masterItem?.name || item.sku}
                                <div className="font-sans text-[var(--bakery-text-muted)] text-[10px] uppercase font-black mt-1.5 tracking-[0.15em]">{item.sku}</div>
                              </div>

                              <div className="text-right font-bold text-[var(--bakery-text)] text-sm">
                                ₦{item.price.toLocaleString()}
                              </div>

                              <div className="flex justify-center items-center">
                                <div className="flex items-center bg-[var(--bakery-bg-soft)] rounded-full p-1 border border-white/5 shadow-inner">
                                  <button onClick={() => updateQty(item.sku, item.qty - 1)} className="w-8 h-8 rounded-full text-[var(--bakery-text)] hover:bg-[var(--bakery-primary)] hover:text-white transition-all flex items-center justify-center font-bold shadow-sm">-</button>
                                  <input
                                    className="w-12 bg-transparent px-1 py-1 text-center text-[var(--bakery-text)] text-sm outline-none font-black"
                                    type="number"
                                    value={item.qty}
                                    onChange={(e) => updateQty(item.sku, parseInt(e.target.value) || 0)}
                                  />
                                  <button onClick={() => updateQty(item.sku, item.qty + 1)} className="w-8 h-8 rounded-full text-[var(--bakery-text)] hover:bg-[var(--bakery-primary)] hover:text-white transition-all flex items-center justify-center font-bold shadow-sm">+</button>
                                </div>
                              </div>

                              <div className="text-right font-black text-[var(--bakery-heading)] text-sm">
                                ₦{(item.qty * item.price).toLocaleString()}
                              </div>

                              <div className="flex justify-end">
                                <button
                                  onClick={() => {
                                    const newCart = { ...cart };
                                    delete newCart[item.sku];
                                    setCart(newCart);
                                  }}
                                  className="text-[var(--bakery-text-muted)] hover:text-[var(--bakery-error)] w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                >
                                  <span className="material-icons text-[16px]">close</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        {Object.keys(cart).length === 0 && (
                          <div className="py-24 text-center">
                            <span className="material-icons text-5xl text-[var(--bakery-card-border)] mb-4">shopping_basket</span>
                            <p className="text-[var(--bakery-text-muted)] italic text-sm font-medium">Search our artisan master menu above to build your bakery selection.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Volume Intelligence Calculator */}
            <div className="xl:col-span-1 relative">
              <div className="sticky top-[108px] z-20">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-gradient-to-br from-[var(--bakery-card-bg)] to-[var(--bakery-bg-soft)] p-8 rounded-2xl border border-[var(--bakery-card-border)] shadow-2xl sticky top-[108px]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-[var(--bakery-primary)] text-xl">analytics</span>
                      <h3 className="text-xl font-bold text-[var(--bakery-heading)] tracking-tight">Wholesale Volume Tier</h3>
                    </div>
                    {tier > 0 && <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${thermometerColor} text-white shadow-lg ${thermometerGlow} transition-all`}>Tier {tier} Unlocked</span>}
                  </div>

                  <div className="space-y-8">
                    {/* Dynamic Thermometer */}
                    <div className="relative pt-4">
                      <div className="flex justify-between text-[10px] font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest mb-3 relative z-10">
                        <span>Tier 1 (150)</span>
                        <span>Tier 2 (400)</span>
                        <span>Tier 3 (800)</span>
                      </div>
                      {/* Bar Background */}
                      <div className="w-full h-4 bg-[var(--bakery-bg-soft)] rounded-full overflow-hidden border border-white/5 relative">
                        {/* Animated Fill */}
                        <motion.div
                          className={`h-full ${thermometerColor} relative transition-colors duration-500`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
                        >
                          <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                        </motion.div>
                      </div>
                      <div className="text-center mt-5">
                        <span className="text-[var(--bakery-heading)] font-bold text-3xl">{totalUnits}</span>
                        <span className="text-[var(--bakery-text-muted)] text-sm ml-2 font-bold uppercase tracking-widest">Selected Pastries</span>
                      </div>

                      {tier < 3 && (
                        <div className="text-center mt-3 text-[var(--bakery-primary)] font-bold text-xs">
                          Add {tier === 0 ? 150 - totalUnits : tier === 1 ? 400 - totalUnits : 800 - totalUnits} more items to unlock {tier === 0 ? '5%' : tier === 1 ? '12%' : '20%'} off!
                        </div>
                      )}
                    </div>

                    <div className="p-6 bg-[var(--bakery-bg-soft)] rounded-2xl border border-[var(--bakery-card-border)]/5 space-y-4">
                      <div className="flex justify-between items-center text-base">
                        <span className="text-[var(--bakery-text-muted)]">Base Bakery Order</span>
                        <span className="text-[var(--bakery-heading)] font-bold">₦{baseTotal.toLocaleString()}</span>
                      </div>

                      <AnimatePresence mode="popLayout">
                        {discountAmount > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="flex justify-between items-center text-base"
                          >
                            <span className={`font-bold flex items-center gap-1 ${tier === 3 ? 'text-[var(--bakery-high-tier)]' : tier === 2 ? 'text-[var(--bakery-success)]' : 'text-[var(--bakery-primary)]'}`}>
                              <span className="material-icons text-[18px]">auto_awesome</span> Partner Discount ({(discountRate * 100).toFixed(0)}%)
                            </span>
                            <span className="text-[var(--bakery-success)] font-bold">- ₦{discountAmount.toLocaleString()}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

                      <div className="flex justify-between items-end">
                        <span className="text-[var(--bakery-text)] font-bold text-sm uppercase tracking-widest mb-1">Final Total</span>
                        <div className="flex flex-col items-end">
                          {discountAmount > 0 && <span className="text-[var(--bakery-text-muted)] text-sm line-through mb-1">₦{baseTotal.toLocaleString()}</span>}
                          <span className="text-[var(--bakery-heading)] font-black text-4xl">₦{finalTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        // Sync to mockDb
                        const itemsToSync = Object.values(cart)
                          .filter(i => i.qty > 0)
                          .map(i => ({
                            id: i.sku,
                            name: masterMenu.find(m => m.sku === i.sku)?.name || i.sku,
                            price: i.price,
                            quantity: i.qty,
                            category: 'Bakery'
                          }));
                        mockDb.updateCart(itemsToSync);

                        if (!currentUser) {
                          setCurrentView?.('auth-login');
                        } else {
                          setCurrentView?.('checkout');
                        }
                      }}
                      className={`w-full py-4 rounded-full shadow-lg transition-all active:scale-[0.98] text-xs font-bold uppercase tracking-[0.15em] border ${totalUnits === 0
                        ? 'bg-transparent border-[var(--bakery-card-border)] text-[var(--bakery-text-muted)] cursor-not-allowed'
                        : 'bg-[var(--bakery-primary)] border-[var(--bakery-primary)] hover:bg-white text-white hover:text-black shadow-[var(--bakery-primary)]/20 hover:shadow-[var(--bakery-primary)]/40'
                        }`}>
                      Finalize Bakery Order
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Logistics Network - Redesigned for Negative Space & Centering */}
      <section className="py-32 bg-[var(--bakery-bg)] relative overflow-hidden border-y border-[var(--bakery-card-border)]/50" id="logistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 text-[var(--bakery-primary)] font-bold uppercase tracking-widest text-xs mb-4">
              <span className="material-icons text-xl">local_shipping</span> Logistics Network
            </div>
            <h2 className="text-4xl font-bold text-[var(--bakery-heading)] mb-4 tracking-tight">Precision Delivery</h2>
            <p className="text-[var(--bakery-text-muted)] text-base max-w-2xl mx-auto">Select a delivery zone to visualize route intelligence and delivery metrics from our Jos headquarters.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Location List */}
            <div className="xl:col-span-3 space-y-4 lg:sticky lg:top-[100px] self-start mt-4">
              <div className="mb-6 px-2">
                <h3 className="text-sm font-bold text-[var(--bakery-heading)] uppercase tracking-[0.1em]">Select your location from the list below</h3>
                <p className="text-[10px] text-[var(--bakery-text-muted)] mt-1 font-bold">(Maximum 5 zones supported for logistics comparison)</p>
              </div>
              <div className="h-[60vh] overflow-y-auto no-scrollbar pr-6 space-y-4 pb-10 overscroll-contain">
                {[
                  { id: 'rayfield', name: "Rayfield", time: "18 mins", dist: "8.4 km", x: 65, y: 70 },
                  { id: 'bukuru', name: "Bukuru", time: "25 mins", dist: "12.2 km", x: 70, y: 85 },
                  { id: 'terminus', name: "Terminus", time: "12 mins", dist: "4.5 km", x: 45, y: 35 },
                  { id: 'tudun-wada', name: "Tudun Wada", time: "15 mins", dist: "5.8 km", x: 35, y: 55 },
                  { id: 'lamingo', name: "Lamingo", time: "22 mins", dist: "9.5 km", x: 80, y: 40 },
                  { id: 'du', name: "Du", time: "30 mins", dist: "14.1 km", x: 85, y: 75 },
                  { id: 'chwelnyap', name: "Chwelnyap", time: "10 mins", dist: "3.2 km", x: 50, y: 25 },
                  { id: 'anglo-jos', name: "Anglo Jos", time: "14 mins", dist: "5.1 km", x: 55, y: 60 },
                  { id: 'hwolshe', name: "Hwolshe", time: "16 mins", dist: "6.7 km", x: 40, y: 65 },
                  { id: 'old-airport', name: "Old Airport", time: "20 mins", dist: "8.9 km", x: 30, y: 70 },
                  { id: 'dadin-kowa', name: "Dadin Kowa", time: "18 mins", dist: "7.4 km", x: 25, y: 50 },
                  { id: 'millionaires', name: "Millionaires Quarters", time: "14 mins", dist: "5.5 km", x: 60, y: 45 },
                  { id: 'rantya', name: "Rantya", time: "24 mins", dist: "10.8 km", x: 20, y: 80 },
                  { id: 'zaria-rd', name: "Zaria Road", time: "12 mins", dist: "4.2 km", x: 25, y: 30 },
                  { id: 'bauchi-rd', name: "Bauchi Road", time: "15 mins", dist: "6.1 km", x: 75, y: 20 },
                ].map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocations(prev => {
                        const isAlreadySelected = prev.find(p => p.id === loc.id);
                        if (isAlreadySelected) {
                          return prev.filter(p => p.id !== loc.id);
                        }
                        if (prev.length >= 5) return prev;
                        return [...prev, loc];
                      });
                    }}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-500 flex items-center justify-between group ${selectedLocations.find(p => p.id === loc.id)
                      ? 'bg-[var(--bakery-primary)]/10 border-[var(--bakery-primary)] shadow-2xl scale-[1.02]'
                      : 'bg-transparent border-transparent hover:bg-[var(--bakery-bg-soft)]'
                      }`}
                  >
                    <div>
                      <h4 className={`font-bold text-sm ${selectedLocations.find(p => p.id === loc.id) ? 'text-[var(--bakery-primary)]' : 'text-[var(--bakery-heading)]'}`}>{loc.name}</h4>
                      <p className="text-[10px] text-[var(--bakery-text-muted)] font-bold uppercase tracking-widest mt-1">Zone {loc.id.substring(0, 2).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-xs ${selectedLocations.find(p => p.id === loc.id) ? 'text-[var(--bakery-primary)]' : 'text-[var(--bakery-text)]'}`}>{loc.time}</p>
                      <p className="text-[10px] text-[var(--bakery-text-muted)] font-bold">{loc.dist}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Center Column: SVG Map */}
            <div className="xl:col-span-5 lg:sticky lg:top-[100px] self-start lg:-mx-4 xl:mx-0">
              <div className="w-full h-[65vh] relative bg-[#e0ecf8] border border-[var(--bakery-card-border)]/50 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] group/map transition-all duration-700 hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] rounded-none lg:rounded-2xl shrink-0">
                {/* Animated SVG Map Engine (Google Maps Aesthetic) */}
                <div className="absolute inset-0">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full opacity-90 select-none scale-[1.05] transition-transform duration-700 group-hover/map:scale-[1.02]"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    {/* Map Layers */}
                    <defs>
                      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1" />
                      </filter>
                    </defs>

                    {/* Landmass */}
                    <rect width="100%" height="100%" fill="#f8f9fa" />

                    {/* Water Bodies (Lakes/Rivers) */}
                    <path d="M 0,20 Q 20,25 30,15 T 60,0 L 0,0 Z" fill="#d1e3f8" />
                    <path d="M 100,50 Q 80,60 90,80 T 100,100 Z" fill="#d1e3f8" />
                    <path d="M 40,100 Q 50,80 30,70 T 0,80 L 0,100 Z" fill="#d1e3f8" />

                    {/* Parks / Green Areas */}
                    <path d="M 15,40 Q 25,35 30,45 T 20,55 Z" fill="#e8f4eb" />
                    <path d="M 70,25 Q 85,20 80,35 T 65,40 Z" fill="#e8f4eb" />
                    <path d="M 50,70 Q 65,65 75,75 T 60,85 Z" fill="#e8f4eb" />

                    {/* Arterial Roads (Highways) */}
                    <path d="M -10,10 Q 30,40 50,50 T 110,90" fill="none" stroke="#fff" strokeWidth="2.5" filter="url(#shadow)" />
                    <path d="M 30,-10 Q 40,30 50,50 T 70,110" fill="none" stroke="#fff" strokeWidth="2.5" filter="url(#shadow)" />
                    <path d="M 110,10 Q 70,40 50,50 T -10,90" fill="none" stroke="#fff" strokeWidth="2.5" filter="url(#shadow)" />

                    {/* Secondary Roads */}
                    <path d="M 10,20 Q 30,30 50,20 T 90,30" fill="none" stroke="#ffffff" strokeWidth="1" />
                    <path d="M 20,80 Q 40,70 50,80 T 80,70" fill="none" stroke="#ffffff" strokeWidth="1" />
                    <path d="M 15,15 L 15,85 M 85,15 L 85,85" fill="none" stroke="#ffffff" strokeWidth="0.8" />


                    {/* Orient Base (Jos HQ) - Center Point (50, 50) */}
                    <g className="relative z-50">
                      <circle cx="50" cy="50" r="12" fill="var(--bakery-primary)" opacity="0.1" className="animate-pulse" />
                      <circle cx="50" cy="50" r="6" fill="var(--bakery-primary)" opacity="0.2" className="animate-[ping_4s_infinite]" />
                      <circle cx="50" cy="50" r="3" fill="#ffffff" filter="url(#shadow)" />
                      <circle cx="50" cy="50" r="1.5" fill="var(--bakery-primary)" />
                    </g>

                    <AnimatePresence mode="popLayout">
                      {selectedLocations.map(loc => {
                        // Create a natural Bezier curve from HQ (50,50) to the destination
                        // The control point is calculated to give a slight arc to the path
                        const midX = (50 + loc.x) / 2;
                        const midY = (50 + loc.y) / 2;
                        const offset = 10; // Arc intensity
                        const cx = midX + (loc.y > 50 ? offset : -offset);
                        const cy = midY + (loc.x > 50 ? -offset : offset);
                        const pathData = `M 50,50 Q ${cx},${cy} ${loc.x},${loc.y}`;

                        return (
                          <motion.g key={`route-${loc.id}`}>
                            {/* Path Shadow / Outline for realism */}
                            <motion.path
                              d={pathData}
                              fill="none"
                              stroke="rgba(0,0,0,0.1)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              exit={{ pathLength: 0, opacity: 0 }}
                              transition={{ duration: 1, ease: "easeInOut" }}
                            />
                            {/* Actual Animated Route */}
                            <motion.path
                              d={pathData}
                              fill="none"
                              stroke="var(--bakery-primary)"
                              strokeWidth="1"
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              exit={{ pathLength: 0, opacity: 0 }}
                              transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
                              strokeDasharray="2,2"
                              className="animate-[dash_20s_linear_infinite]"
                            />
                            {/* Destination Pin */}
                            <motion.circle
                              cx={loc.x}
                              cy={loc.y}
                              r="1.5"
                              fill="#222"
                              stroke="#fff"
                              strokeWidth="0.5"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ delay: 0.8, type: "spring" }}
                            />
                          </motion.g>
                        );
                      })}
                    </AnimatePresence>

                    {/* Inactive Location Markers (Subtle Dots) */}
                    {[
                      { x: 65, y: 70 }, { x: 70, y: 85 }, { x: 45, y: 35 }, { x: 35, y: 55 }, { x: 80, y: 40 },
                      { x: 85, y: 75 }, { x: 50, y: 25 }, { x: 55, y: 60 }, { x: 40, y: 65 }, { x: 30, y: 70 },
                      { x: 25, y: 50 }, { x: 60, y: 45 }, { x: 20, y: 80 }, { x: 25, y: 30 }, { x: 75, y: 20 },
                    ].map((m, i) => (
                      <circle
                        key={`inactive-${i}`}
                        cx={m.x}
                        cy={m.y}
                        r="0.8"
                        fill={selectedLocations.find(loc => loc.x === m.x && loc.y === m.y) ? "transparent" : "#cbd5e1"}
                        className="transition-colors duration-300"
                      />
                    ))}
                  </svg>
                </div>

              </div>
            </div>

            {/* Right Column: Route Details */}
            <div className="xl:col-span-4 lg:sticky lg:top-[100px] self-start relative h-[65vh] flex flex-col justify-center min-h-[500px]">
              <AnimatePresence mode="wait">
                {selectedLocations.length > 0 ? (
                  <motion.div
                    key="active-routes"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full bg-[var(--bakery-card-bg)] border border-[var(--bakery-primary)]/30 rounded-2xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden relative"
                  >
                    {/* Decorative background glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--bakery-primary)]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[var(--bakery-primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--bakery-primary)]/20">
                          <span className="material-icons text-2xl">route</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--bakery-heading)]">Logistics Intelligence</h3>
                          <div className="flex items-center text-[10px] text-[var(--bakery-success)] font-black uppercase tracking-widest mt-0.5">
                            <span className="w-1.5 h-1.5 bg-[var(--bakery-success)] rounded-full mr-2 animate-pulse"></span> {selectedLocations.length} Zones Active
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8 max-h-[180px] overflow-y-auto no-scrollbar pr-2">
                        {selectedLocations.map(loc => (
                          <div key={`detail-${loc.id}`} className="p-4 rounded-xl bg-[var(--bakery-bg-soft)] border border-[var(--bakery-card-border)] flex justify-between items-center group/item hover:border-[var(--bakery-primary)]/30 transition-colors">
                            <div>
                              <p className="text-[10px] font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest leading-none mb-1">{loc.name}</p>
                              <p className="text-xs font-black text-[var(--bakery-heading)]">{loc.time} • {loc.dist}</p>
                            </div>
                            <button
                              onClick={() => setSelectedLocations(prev => prev.filter(p => p.id !== loc.id))}
                              className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[var(--bakery-text-muted)] hover:text-[var(--bakery-error)]"
                            >
                              <span className="material-icons text-sm">close</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 bg-[var(--bakery-bg-soft)]/50 rounded-2xl border border-dashed border-[var(--bakery-card-border)] mb-8">
                        <div className="flex items-center gap-3 text-xs text-[var(--bakery-text-muted)] font-medium">
                          <span className="material-icons text-[var(--bakery-primary)] text-sm">hub</span>
                          <span>Unified fulfillment from Jos HQ Central Hub.</span>
                        </div>
                      </div>

                      <button className="w-full py-4 bg-[var(--bakery-primary)]/10 text-[var(--bakery-primary)] font-black uppercase tracking-widest text-[10px] rounded-xl border border-[var(--bakery-primary)]/20 hover:bg-[var(--bakery-primary)] hover:text-white transition-all">
                        Update Fleet Profile
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-center justify-center p-8 lg:p-12 h-full bg-[var(--bakery-card-bg)]/30 border border-transparent rounded-2xl"
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-[var(--bakery-bg-soft)] flex items-center justify-center mx-auto mb-8 border border-[var(--bakery-primary)]/10 shadow-inner">
                        <span className="material-icons text-5xl text-[var(--bakery-primary)]/30">explore</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--bakery-heading)] mb-3">Fleet Visualization</h3>
                      <p className="text-[var(--bakery-text-muted)] text-sm mx-auto font-medium max-w-[250px]">Select up to 5 locations from the list to visualize routing, timing, and distribution intelligence.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section >

      {/* Section 4: Event Catering */}
      < section className="py-24 bg-[var(--bakery-bg-soft)]" id="event-catering-section" >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-['Dancing_Script',_cursive] text-[var(--bakery-primary)] mb-2 tracking-wide">Artisanal Event Catering</h2>
            <p className="text-[var(--bakery-text-muted)] text-sm max-w-2xl mx-auto uppercase tracking-widest font-bold">From elegant corporate galas to intimate celebrations, we craft bespoke pastry experiences tailored to your vision.</p>
          </div>

          <motion.div
            id="event-inquiry"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-[80vh] min-h-[700px] bg-[var(--bakery-card-bg)] rounded-[32px] border border-[var(--bakery-card-border)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Left Info Panel */}
              <div className="md:col-span-2 bg-[var(--bakery-primary)] p-10 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-8 tracking-tight">Concierge Planning</h3>
                  <ul className="space-y-8">
                    <li className="flex gap-4">
                      <span className="material-icons opacity-70">cake</span>
                      <div>
                        <p className="font-bold text-sm uppercase tracking-[0.15em] mb-1">Custom Pastry Menus</p>

                        <p className="text-white/70 text-xs leading-relaxed">Work with our head baker to create a unique selection of pastries and breads.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="material-icons opacity-70">liquor</span>
                      <div>
                        <p className="font-bold text-sm uppercase tracking-widest mb-1">Pairing Advice</p>
                        <p className="text-white/70 text-xs leading-relaxed">Expert recommendations on beverage pairings for every item on your menu.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="material-icons opacity-70">event_seat</span>
                      <div>
                        <p className="font-bold text-sm uppercase tracking-widest mb-1">Full Setup</p>
                        <p className="text-white/70 text-xs leading-relaxed">Optional on-site display and service team for premium events.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <motion.div
                  initial={{ rotate: -2, y: 10 }}
                  animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="p-6 bg-[#f7f3eb] text-[#333] rounded-2xl border-4 border-dashed border-[var(--bakery-primary)]/30 mt-auto shadow-2xl relative w-full h-[180px] flex flex-col justify-center origin-top-left"
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[var(--bakery-primary)] text-white flex items-center justify-center font-bold text-xl leading-none">"</div>
                  <p className="text-sm font-bold italic leading-relaxed z-10 relative">The Sourdough grazing table was the absolute highlight of our corporate summit. Impeccable service and unparalleled taste.</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-4 text-[var(--bakery-primary)]">— Zenith Bank HQ</p>
                </motion.div>
              </div>

              {/* Right Form Panel */}
              <div className="md:col-span-3 p-10 md:p-14">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest">Event Type</label>
                      <div className="relative group">
                        <select className="block w-full bg-[var(--bakery-bg-soft)] border border-[var(--bakery-card-border)] rounded-xl text-[var(--bakery-heading)] py-4 px-5 focus:border-[var(--bakery-primary)] outline-none transition-all text-sm font-bold appearance-none cursor-pointer [&::-ms-expand]:hidden">
                          <option>Wedding Reception</option>
                          <option>Corporate Gala</option>
                          <option>Private Birthday</option>
                          <option>Conference / Summit</option>
                        </select>
                        <span className="material-icons absolute right-5 top-1/2 -translate-y-1/2 text-[var(--bakery-text-muted)] pointer-events-none group-hover:text-[var(--bakery-primary)] transition-colors">expand_more</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest">Expected Guests</label>
                      <input type="number" placeholder="e.g. 250" className="block w-full bg-[var(--bakery-bg-soft)] border border-[var(--bakery-card-border)] rounded-xl text-[var(--bakery-heading)] py-4 px-5 focus:border-[var(--bakery-primary)] outline-none transition-all text-sm font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest">Event Date</label>
                      <input type="date" className="block w-full bg-[var(--bakery-bg-soft)] border border-[var(--bakery-card-border)] rounded-xl text-[var(--bakery-heading)] py-4 px-5 focus:border-[var(--bakery-primary)] outline-none transition-all text-sm font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-[var(--bakery-text-muted)] uppercase tracking-[0.15em]">Inquiry Type</label>
                      <div className="relative group">
                        <select className="block w-full bg-[var(--bakery-bg-soft)] border border-[var(--bakery-card-border)] rounded-xl text-[var(--bakery-heading)] py-4 px-5 focus:border-[var(--bakery-primary)] outline-none transition-all text-sm font-bold appearance-none cursor-pointer [&::-ms-expand]:hidden">
                          <option>Drop-off Pastry Boxes</option>
                          <option>Full Dessert Display Setup</option>
                          <option>Corporate Gift Hampers</option>
                        </select>
                        <span className="material-icons absolute right-5 top-1/2 -translate-y-1/2 text-[var(--bakery-text-muted)] pointer-events-none group-hover:text-[var(--bakery-primary)] transition-colors">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest">Dietary Requirements</label>
                    <div className="flex flex-wrap gap-3">
                      {['Vegan', 'Gluten-Free', 'Nut-Free', 'Dairy-Free', 'Halal'].map(diet => (
                        <label key={diet} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bakery-bg-soft)] border border-[var(--bakery-card-border)] cursor-pointer hover:border-[var(--bakery-primary)]/50 transition-colors">
                          <input type="checkbox" className="w-4 h-4 accent-[var(--bakery-primary)]" />
                          <span className="text-xs font-bold text-[var(--bakery-text)]">{diet}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest">Describe Your Vision</label>
                    <textarea rows={4} placeholder="Tell us about your event theme, favorite pastries, or specific needs..." className="block w-full bg-[var(--bakery-bg-soft)] border border-[var(--bakery-card-border)] rounded-2xl text-[var(--bakery-heading)] py-4 px-5 focus:border-[var(--bakery-primary)] outline-none transition-all text-sm font-medium resize-none shadow-sm hover:shadow-md focus:shadow-lg" />
                  </div>

                  {/* New Custom Tasting Session Toggle */}
                  <label className="flex items-center justify-between p-6 sm:p-8 bg-[var(--bakery-card-bg)] border-2 border-[var(--bakery-card-border)] shadow-sm rounded-[24px] mt-12 hover:border-[var(--bakery-primary)]/40 transition-all duration-300 group/tasting cursor-pointer relative overflow-hidden group/toggle">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bakery-primary)]/5 to-transparent -translate-x-full group-hover/toggle:animate-[shimmer_2.5s_infinite]"></div>

                    <div className="flex-1 pr-6 relative z-10">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-[var(--bakery-primary)]/10 flex items-center justify-center group-hover/tasting:bg-[var(--bakery-primary)]/20 transition-colors">
                          <span className="material-icons text-[var(--bakery-primary)] text-2xl group-hover/tasting:scale-110 transition-transform duration-300">restaurant</span>
                        </div>
                        <h4 className="text-[var(--bakery-heading)] font-black text-base tracking-wide">Schedule a Tasting Session</h4>
                      </div>
                      <p className="text-xs text-[var(--bakery-text-muted)] mt-1 font-bold leading-relaxed sm:ml-16">
                        Visit our Jos HQ to sample selected menu items and discuss pairings before finalizing your booking.
                      </p>
                    </div>

                    <div className="relative z-10 shrink-0">
                      <div className="relative inline-block w-16 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="tasting-toggle" className="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 ease-in-out border-[var(--bakery-card-border)] shadow-md z-10 checked:translate-x-8 checked:border-[var(--bakery-success)] checked:bg-[var(--bakery-success)]" defaultChecked />
                        <label htmlFor="tasting-toggle" className="toggle-label block overflow-hidden h-8 rounded-full bg-[var(--bakery-bg-soft)] cursor-pointer border border-[var(--bakery-card-border)] transition-colors duration-300"></label>
                      </div>
                      <style dangerouslySetInnerHTML={{
                        __html: `
                        .toggle-checkbox:checked + .toggle-label {
                            background-color: #e8f4eb;
                            border-color: var(--bakery-success);
                        }
                        .toggle-checkbox:checked {
                            border-color: white;
                            background-color: var(--bakery-success);
                        }
                      `}} />
                    </div>
                  </label>

                  <div className="flex justify-end pt-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Thank you! Your inquiry has been sent. Our head baker will contact you within 24 hours.");
                      }}
                      className="bg-[var(--bakery-heading)] text-[var(--bakery-bg)] font-black px-10 py-5 rounded-full hover:bg-[var(--bakery-primary)] hover:text-white shadow-xl shadow-[var(--bakery-heading)]/10 hover:shadow-[var(--bakery-primary)]/30 transition-all active:scale-[0.98] text-xs uppercase tracking-[0.15em] flex items-center gap-3 w-full sm:w-auto justify-center"
                      type="button"
                    >
                      Submit Booking Inquiry
                      <span className="material-icons text-sm">arrow_forward</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Section 5: Trust Pillars */}
      < section className="py-24 bg-[var(--bakery-bg)] border-t border-[var(--bakery-card-border)]/50" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-3xl bg-[var(--bakery-bg-soft)] flex items-center justify-center text-[var(--bakery-success)] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-icons text-5xl">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--bakery-heading)] mb-3">NAFDAC Certified</h3>
              <p className="text-[var(--bakery-text-muted)] text-sm leading-relaxed max-w-xs">Fully compliant with all national food safety regulations. Reg No: A1-4589L. Guaranteed quality in every batch.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="h-20 w-20 rounded-full bg-[var(--bakery-primary)]/10 flex items-center justify-center border-2 border-[var(--bakery-primary)] mb-6 relative group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 border border-[var(--bakery-primary)] rounded-full animate-ping opacity-20"></div>
                <span className="font-black text-lg text-[var(--bakery-primary)] tracking-tighter leading-tight">NAIJA<br />MADE</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--bakery-heading)] mb-3">Proudly Nigerian</h3>
              <p className="text-[var(--bakery-text-muted)] text-sm leading-relaxed max-w-xs">Sourcing 90% of our premium flour and artisanal ingredients from local farmers across Northern Nigeria.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-3xl bg-[var(--bakery-bg-soft)] flex items-center justify-center text-[var(--bakery-accent)] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-icons text-5xl">workspace_premium</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--bakery-heading)] mb-3">Premium Standards</h3>
              <p className="text-[var(--bakery-text-muted)] text-sm leading-relaxed max-w-xs">ISO 9001:2015 compliant processes ensuring uncompromising consistency and excellence in every loaf.</p>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};
