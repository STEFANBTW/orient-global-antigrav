import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CartItem = { sku: string; qty: number; price: number };

export const Wholesale: React.FC = () => {
  // We manage the quantities of the top items to drive the dynamic calculator
  const [cart, setCart] = useState<Record<string, CartItem>>({
    'OB-W-001': { sku: 'OB-W-001', qty: 50, price: 1200 },
    'OB-P-045': { sku: 'OB-P-045', qty: 10, price: 12500 },
    'OB-W-003': { sku: 'OB-W-003', qty: 25, price: 1500 },
    'OB-D-112': { sku: 'OB-D-112', qty: 5, price: 8000 },
    'OB-B-088': { sku: 'OB-B-088', qty: 100, price: 1800 },
  });

  const updateQty = (sku: string, qty: number) => {
    setCart(prev => ({
      ...prev,
      [sku]: { ...prev[sku], qty: Math.max(0, qty) }
    }));
  };

  // Dynamic calculations based precisely on the table inputs
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

  const thermometerColor = tier === 3 ? 'bg-purple-500' : tier === 2 ? 'bg-emerald-500' : tier === 1 ? 'bg-primary' : 'bg-slate-700';
  const thermometerGlow = tier === 3 ? 'shadow-purple-500/50' : tier === 2 ? 'shadow-emerald-500/50' : tier === 1 ? 'shadow-primary/50' : 'shadow-none';
  const progressPercent = Math.min(100, (totalUnits / 1000) * 100);

  return (
    <div className="bg-slate-950 text-slate-100 font-sans selection:bg-primary selection:text-white pt-0">
      {/* Section 1: Professional Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="High-end banquet catering setup with chefs serving food"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF_lco6zprEdQlI2LmcDLCSaXVyBB8sfTNRNQBZtPsBrXL6WpfVvb_Rhvg8zDIa-fYvgnDxVUQX-66V4dPxxANmhZdEaMyMlV1R2DZ5AvRfCgjRipVcBIS0HCdHjN5qrXr4CObMPzHS9HXJQHExewlvcHHpf8PDRLfpxYmjw0LFXE-88dpfDQfpkEWHnfqTD6V9dipw-i5Jl4N7SbYSfjM_StPM4T9Y6ww6OIWhf4iWRpr7Utv6DsIBvyjVA64s7c4Ye0yc2R8DPrQ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Premium B2B Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tighter"
          >
            Feeding the Crowd <br/> with <span className="text-primary">Excellence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-slate-300 font-light"
          >
            The trusted partner for hotels, schools, and large-scale events across Plateau State. Precision baking meets reliable logistics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => {document.getElementById('quick-order')?.scrollIntoView({ behavior: 'smooth' })}} className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 active:scale-95 text-sm">
              <span className="material-icons text-lg">inventory_2</span> Wholesale Portal
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 text-sm">
              <span className="material-icons text-lg">calendar_month</span> Event Catering
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
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8"
          >
            {[
              { val: "50k+", lbl: "Daily Loaves" },
              { val: "200+", lbl: "Corporate Partners" },
              { val: "99%", lbl: "On-Time Delivery" },
              { val: "Jos", lbl: "HQ & Distribution" }
            ].map(stat => (
              <motion.div key={stat.lbl} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 }}}>
                <div className="text-2xl font-bold text-white">{stat.val}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{stat.lbl}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 2: The Logistics Map (Moved Up to build trust before the sale) */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="order-1 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] mb-4">
                  <span className="material-icons text-lg">local_shipping</span> Logistics Network
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Precision Delivery Across The Plateau</h2>
                <p className="text-slate-400 text-base mb-8 leading-relaxed">
                  Our dedicated fleet ensures your wholesale orders arrive fresh and on schedule. We operate specialized routes for schools, hotels, and retail partners with real-time tracking capabilities.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary mt-1">
                      <span className="material-icons text-xl">schedule</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-bold text-white tracking-tight">Scheduled Windows</h4>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1">Choose from Morning (6AM-9AM) or Afternoon (2PM-5PM) delivery slots guaranteed.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary mt-1">
                      <span className="material-icons text-xl">thermostat</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-bold text-white tracking-tight">Climate Controlled</h4>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1">Our vans are equipped to maintain optimal temperature for pastries and sensitive items.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-2 relative"
            >
              <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  alt="Stylized dark map of Jos city showing road networks"
                  className="w-full h-full object-cover opacity-30 grayscale invert"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmprho5MDhuLhOfVgQEqJ-MUQ5tryytP6ON6i2vb0Yoas281JrIx5dNJAucfKXPOOFFUgNLyIFF4GZuXazlicapLXhwWNXITxICQlPYIF5qZZniDLtCUMgTKpW_oYroBsTc7QQXHjG5DrZB2-GZhlhc50WljO155_6CVN9WtYDkI7vb0cr3eUJuULhifa5fu8oEtvjoUZQZig2wEWyhSS28U56WA_hXDK5WNWmWJpkPusDA0D68wwI5alXHGVzZnbZty1Hr66H0pYU"
                />
                <div className="absolute inset-0 p-6 pointer-events-none">
                  <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 10 }}>
                    <path className="opacity-60" d="M 100 250 Q 200 150 350 100 T 500 150" fill="none" stroke="#f26c0d" strokeDasharray="5,5" strokeWidth="2"></path>
                    <circle cx="100" cy="250" fill="#f26c0d" r="4"></circle>
                    <circle cx="500" cy="150" fill="#f26c0d" r="4"></circle>
                  </svg>
                  {/* Hub Marker 1 */}
                  <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer">
                    <div className="w-4 h-4 bg-primary rounded-full relative">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg max-w-xs pointer-events-auto">
                    <h4 className="text-white font-bold text-xs mb-1 uppercase tracking-widest">Route: North Jos</h4>
                    <div className="flex items-center text-[10px] text-emerald-400 mb-2 font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span> Active Now
                    </div>
                    <p className="text-[10px] text-slate-400">Truck #OB-44 is currently near University of Jos. ETA to next stop: 15 mins.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 3: Gamified Bulk Ordering Portal */}
      <section className="py-20 bg-slate-900 relative border-y border-white/5" id="quick-order">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Bulk Ordering Portal</h2>
              <p className="text-slate-400 text-sm">Update quantities below. Discounts apply automatically as you scale.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Dynamic Data Table */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="xl:col-span-2 bg-slate-950/50 rounded-2xl border border-white/5 overflow-hidden shadow-2xl"
            >
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-sm text-slate-400 min-w-max">
                  <thead className="bg-slate-900 border-b border-white/5 text-slate-200 font-bold uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Item Name</th>
                      <th className="px-6 py-4 text-right">Unit Price</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-center">Quantity</th>
                      <th className="px-6 py-4 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { sku: 'OB-W-001', name: "Premium Family Loaf (Sliced)", stock: "High", color: "text-emerald-500" },
                      { sku: 'OB-P-045', name: "Meat Pie Catering Box (24pcs)", stock: "Med", color: "text-amber-500", bg: true },
                      { sku: 'OB-W-003', name: "Whole Wheat Healthy Loaf", stock: "High", color: "text-emerald-500" },
                      { sku: 'OB-D-112', name: "Glazed Doughnut Tray (50pcs)", stock: "High", color: "text-emerald-500", bg: true },
                      { sku: 'OB-B-088', name: "Burger Buns (Pack of 12)", stock: "Low", color: "text-rose-500" },
                    ].map((row) => {
                      const item = cart[row.sku];
                      return (
                        <tr key={row.sku} className={`hover:bg-white/5 transition-colors ${row.bg ? 'bg-white/[0.02]' : ''}`}>
                          <td className="px-6 py-4 font-bold text-white text-xs">
                            {row.name}
                            <div className="font-mono text-primary text-[10px] mt-1">{row.sku}</div>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-slate-200 text-xs">₦{item.price.toLocaleString()}</td>
                          <td className={`px-6 py-4 text-center font-bold text-[10px] uppercase tracking-widest ${row.color}`}>{row.stock}</td>
                          <td className="px-6 py-4 flex justify-center items-center gap-2">
                            <button onClick={() => updateQty(row.sku, item.qty - 1)} className="w-8 h-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">-</button>
                            <input 
                              className="w-16 bg-slate-950 border border-white/10 rounded-lg px-2 py-1.5 text-center text-white focus:ring-primary focus:border-primary text-xs outline-none font-bold" 
                              type="number" 
                              value={item.qty}
                              onChange={(e) => updateQty(row.sku, parseInt(e.target.value) || 0)} 
                            />
                            <button onClick={() => updateQty(row.sku, item.qty + 1)} className="w-8 h-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">+</button>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-white">
                            ₦{(item.qty * item.price).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Dynamic Savings Calculator Widget */}
            <div className="xl:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-white/10 shadow-2xl sticky top-24"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-primary">analytics</span>
                    <h3 className="text-lg font-bold text-white">Volume Intelligence</h3>
                  </div>
                  {tier > 0 && <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${thermometerColor} text-white shadow-lg ${thermometerGlow} transition-all`}>Tier {tier} Unlocked</span>}
                </div>
                
                <div className="space-y-6">
                  {/* Dynamic Thermometer */}
                  <div className="relative pt-4">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 relative z-10">
                      <span>Tier 1 (150)</span>
                      <span>Tier 2 (400)</span>
                      <span>Tier 3 (800)</span>
                    </div>
                    {/* Tick marks */}
                    <div className="absolute w-full flex justify-between px-1 top-8 pb-1 opacity-30">
                       <span className="h-2 w-px bg-white ml-[15%]"></span>
                       <span className="h-2 w-px bg-white mr-[60%]"></span>
                       <span className="h-2 w-px bg-white mr-[20%]"></span>
                    </div>
                    {/* Bar Background */}
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5 relative">
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
                    <div className="text-center mt-3">
                      <span className="text-white font-bold text-2xl">{totalUnits}</span>
                      <span className="text-slate-400 text-xs ml-1 font-bold uppercase tracking-widest">Total Units</span>
                    </div>
                    
                    {tier < 3 && (
                      <div className="text-center mt-2 text-[10px] text-primary font-bold">
                         Add {tier === 0 ? 150 - totalUnits : tier === 1 ? 400 - totalUnits : 800 - totalUnits} more items to unlock {tier === 0 ? '5%' : tier === 1 ? '12%' : '20%'} off!
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Base Order Value</span>
                      <span className="text-white font-bold">₦{baseTotal.toLocaleString()}</span>
                    </div>
                    
                    <AnimatePresence mode="popLayout">
                      {discountAmount > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className={`${tier === 3 ? 'text-purple-400' : tier === 2 ? 'text-emerald-400' : 'text-primary'} font-bold flex items-center gap-1`}>
                            <span className="material-icons text-[14px]">auto_awesome</span> Volume Discount ({(discountRate * 100).toFixed(0)}%)
                          </span>
                          <span className="text-emerald-400 font-bold">- ₦{discountAmount.toLocaleString()}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>
                    
                    <div className="flex justify-between items-end">
                      <span className="text-slate-300 font-bold text-sm uppercase tracking-widest">Final Total</span>
                      <div className="flex flex-col items-end">
                        {discountAmount > 0 && <span className="text-slate-500 text-xs line-through mb-1">₦{baseTotal.toLocaleString()}</span>}
                        <span className="text-white font-black text-3xl">₦{finalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 text-sm uppercase tracking-widest ${
                    totalUnits === 0 ? 'bg-slate-800 cursor-not-allowed text-slate-500' : 'bg-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/40'
                  }`}>
                    Proceed to Checkout
                  </button>
                </div>
              </motion.div>

              {/* Delivery Alert Box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`border-l-4 p-4 rounded-r-xl transition-colors ${finalTotal > 200000 ? 'bg-emerald-500/10 border-emerald-500' : 'bg-slate-900 border-slate-700'}`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className={`material-icons text-xl transition-colors ${finalTotal > 200000 ? 'text-emerald-500' : 'text-slate-500'}`}>local_shipping</span>
                  </div>
                  <div className="ml-3">
                    <p className={`text-xs font-bold uppercase tracking-widest transition-colors ${finalTotal > 200000 ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {finalTotal > 200000 ? 'Free Delivery Activated' : 'Delivery Subsidy'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {finalTotal > 200000 ? 'Your order qualifies for free same-day logistics.' : 'Orders over ₦200k qualify for free same-day logistics within Jos metropolis.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Event Inquiry */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Plan Your Event Catering</h2>
            <p className="text-slate-400 text-sm">Tell us about your occasion. We'll craft the perfect bakery menu.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 rounded-3xl border border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Event Type</label>
                    <select className="block w-full bg-slate-950 border border-white/10 rounded-xl text-white py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none text-xs font-bold">
                      <option>Wedding Reception</option>
                      <option>Corporate Gala</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expected Guests</label>
                    <input type="number" placeholder="e.g. 250" className="block w-full bg-slate-950 border border-white/10 rounded-xl text-white py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-xs font-bold" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl mt-6">
                   <div>
                    <h4 className="text-white font-bold text-sm">Schedule a Tasting Session?</h4>
                    <p className="text-[10px] text-slate-400">Visit our HQ to sample selected menu items before finalizing.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex justify-end pt-6 border-t border-white/5 mt-8">
                  <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all transform active:scale-95 text-sm" type="button">
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Trust Pillars */}
      <section className="py-16 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <span className="material-icons text-5xl text-emerald-500 mb-4">verified_user</span>
              <h3 className="text-lg font-bold text-white mb-2">NAFDAC Certified</h3>
              <p className="text-slate-400 text-xs max-w-xs">Fully compliant with all national food safety regulations. Reg No: A1-4589L.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary mb-6 relative">
                <div className="absolute inset-0 border border-primary rounded-full animate-ping opacity-20"></div>
                <span className="font-bold text-lg text-primary tracking-tighter leading-tight">NAIJA<br/>MADE</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Proudly Nigerian</h3>
              <p className="text-slate-400 text-xs max-w-xs">Sourcing 90% of our flour and ingredients from local farmers in Northern Nigeria.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-icons text-5xl text-sky-400 mb-4">workspace_premium</span>
              <h3 className="text-lg font-bold text-white mb-2">Premium Standards</h3>
              <p className="text-slate-400 text-xs max-w-xs">ISO 9001:2015 compliant processes ensuring consistency in every loaf.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
