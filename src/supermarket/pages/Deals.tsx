import React from 'react';
import { motion } from 'framer-motion';

interface DealsProps {
   onNavigate: (page: any) => void;
}

const Deals: React.FC<DealsProps> = ({ onNavigate }) => {
   const links = [
      { label: 'All Deals', page: 'Deals' },
      { label: 'BOGOF', page: 'BOGOF' },
      { label: 'Under $5', page: 'Under5' },
      { label: 'Bundles', page: 'Bundles' },
      { label: 'Bakery', page: 'Bakery' },
   ];

   return (
      <div className="font-display bg-[#f8f6f6] min-h-screen pt-[68px]">
         <header className="bg-white border-b border-gray-200 sticky top-[68px] z-40">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
               <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('Home')}>
                  <span className="material-icons text-[var(--color-accent-light)] text-3xl group-hover:rotate-12 transition-transform">shopping_basket</span>
                  <h1 className="text-2xl font-bold tracking-tight">
                     <span className="text-[var(--color-accent-light)]">ORIENT</span> <span className="text-slate-900">SUPERMARKET</span>
                  </h1>
               </div>
               <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {links.map(link => (
                     <button
                        key={link.label}
                        onClick={() => onNavigate(link.page)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 hover:bg-[var(--color-accent-light)] hover:text-white transition-colors whitespace-nowrap ${link.page === 'Deals' ? 'bg-[var(--color-accent-light)] text-white' : 'bg-white text-gray-600'}`}
                     >
                        {link.label}
                     </button>
                  ))}
               </div>
            </div>
         </header>

         <main className="pb-24">
            {/* Hero */}
            <section className="relative bg-[#ef4343] overflow-hidden py-12 px-4">
               <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-24 -right-24 w-64 h-64 bg-orange-400 rounded-full blur-3xl"
               ></motion.div>
               <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                  <div className="text-white max-w-2xl">
                     <motion.span initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-[var(--color-accent-light)] px-3 py-1 rounded text-xs font-bold uppercase mb-4 inline-block shadow-md">Limited Time Offer</motion.span>
                     <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-6xl font-black mb-4 leading-none">FLASH <br /><span className="text-orange-200">DEALS</span></motion.h1>
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl font-light opacity-90">Up to <span className="font-bold text-yellow-300">70% OFF</span> on select items.</motion.p>
                  </div>
                  <motion.div
                     initial={{ rotate: 1, scale: 0.9, opacity: 0 }}
                     animate={{ rotate: [1, -1, 1], scale: 1, opacity: 1 }}
                     transition={{ rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
                     className="bg-white rounded-xl shadow-2xl p-6 transform rotate-1"
                  >
                     <p className="text-center text-gray-500 font-bold uppercase text-xs mb-4 tracking-widest">Ends In</p>
                     <div className="flex items-center gap-4 text-center">
                        <div><div className="bg-gray-100 text-[#ef4343] font-black text-4xl w-16 h-16 rounded-lg flex items-center justify-center">02</div><span className="text-xs text-gray-400">HRS</span></div>
                        <span className="text-2xl font-bold text-gray-300 animate-pulse">:</span>
                        <div><div className="bg-gray-100 text-[#ef4343] font-black text-4xl w-16 h-16 rounded-lg flex items-center justify-center">14</div><span className="text-xs text-gray-400">MIN</span></div>
                        <span className="text-2xl font-bold text-gray-300 animate-pulse">:</span>
                        <div><div className="bg-gray-100 text-[#ef4343] font-black text-4xl w-16 h-16 rounded-lg flex items-center justify-center text-[var(--color-accent-light)]">55</div><span className="text-xs text-gray-400">SEC</span></div>
                     </div>
                  </motion.div>
               </div>
            </section>

            {/* BOGOF Section */}
            <section className="container mx-auto px-4 py-12">
               <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-2"><span className="material-icons text-[#ef4343] text-4xl">local_offer</span> BOGOF Madness</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                     { name: "Italian Penne Pasta", price: "2.49", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXHoapzHeb1VAPEs6czxDQyvWwduFy91nT-Drp_8nE1SyGtHCVjAT37yLzElXag6I_iuWbvvn3rXicnFwJbZK6_saydnAr5JMl2ZAbbt-npsIKEgbZlIicshunGdLBZqV_jllJM0yZfx0ST0DcjCV9quCoxmCTuc9rl_YY47qHdhClvIqTI4MUOXqUj_YG6igsq_Y8vTNSDMW6Ns8hfeTHBVkeso2GuVsE71yVuNPrxLnmZquU1I4cQrwmOV35Ph63vhNswuB0XPz5" },
                     { name: "Crunchy Honey Oats", price: "5.99", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXBjKg17kvDr-yZMkA48mT0lE3Xbt4JdLlpvYBXczFNBE8tetypNpxK63qyjbo4BD1q7hYNuYBuXyMnKAmdoBoJCHc3e2XEt0Zxt-1NnRMUgN4tF6M_wz5k5IglIfb5d4EYamk02-tYZmmgkrA28peT1TUqjZXXfvLB-oSob3KJSxcD_RfV2blGe4UojAy4kFgp1y40sZ_iFVNBwcE7BKn-rn_rz2ktAJ5suXl3yfKQMD0MpkzqBKZss6ejH4UDb406R4XbWhVPPm1" },
                     { name: "Basmati Royal Rice", price: "8.50", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJz7jDkUIg86_TDT-v0KLZPgAO2-9V1pv3RjvCTMcP2qbT01BI4V3idRe0PEcz_r2vmzFKmQW5NV-pJfbSy0LMvmpvLfACa4XrwDwqL2fvs6fl9xW0L1Q27K054mIGVnFLCOm7AqHdPBsT9eNLpjf36h9OOcJmFoPEdqwlT56Xwub4ZPB-teHtwt-C8wf2BBFKqb8E6dI8mO-Xr4rA3uX8GxYHVFrJHBhsOSIkago-Lg7IVnpVJixqjiUQ5VarxA96fq1-7BKGuqEM" },
                     { name: "Napoli Pasta Sauce", price: "3.25", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPS-DzsRxxDMIbFUppQkGvVi5uAk3JOnX_sonuAN2jiZ4kKJ0z8iWrWheNqy499jUiN_4J6mqQ9CmhzWJv4nsTQxiUOeEiBXjLf3_O8qZVzKlfGBMaSQG8mW496ppb1IslRyL3FtzHdTYmTwDBtc0bWKPiLG9_eoYO4Y04sTabgnC2ZL-pFuBlWdnRLMwtbztRHsLO4dmcKkcxuPnQTRWAmxQhnsb2VfigD6R8k58is0rkwXEcSDDwQ30Jcvv31OSqejf7o7vDjLRB" }
                  ].map((item, idx) => (
                     <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group cursor-pointer"
                     >
                        <div className="relative aspect-square p-4 flex items-center justify-center">
                           <span className="absolute top-3 left-3 bg-[#ef4343] text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">BUY 1 GET 1 FREE</span>
                           <motion.img
                              src={item.img}
                              className="object-contain h-full w-full"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              alt={item.name}
                           />
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                           <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                           <div className="flex items-end gap-2 mb-4 mt-auto">
                              <span className="text-2xl font-black text-[#ef4343]">${item.price}</span>
                              <span className="text-sm text-gray-400 line-through mb-1">${(parseFloat(item.price) * 2).toFixed(2)}</span>
                           </div>
                           <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-gray-100 hover:bg-[#ef4343] hover:text-white text-gray-700 font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                              <span className="material-icons text-lg">content_cut</span> Clip Coupon
                           </motion.button>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </section>
         </main>

         {/* Sticky Widget */}
         <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-4xl px-4 pointer-events-none">
            <motion.div
               initial={{ y: 100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ type: "spring", stiffness: 100, delay: 1 }}
               className="bg-gray-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between pointer-events-auto ring-4 ring-white"
            >
               <div className="flex items-center gap-4">
                  <div className="bg-[#ef4343] p-2 rounded-lg"><span className="material-icons text-white">savings</span></div>
                  <div>
                     <p className="text-xs text-gray-400 font-medium">Potential Savings</p>
                     <p className="font-bold text-xl">$15.50</p>
                  </div>
               </div>
               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg text-sm">Sign in to Save</motion.button>
            </motion.div>
         </div>
      </div>
   );
};

export default Deals;