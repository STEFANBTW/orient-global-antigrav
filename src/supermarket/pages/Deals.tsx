import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cmsApi } from '@/services/cmsApi';

interface DealsProps {
  onNavigate: (page: any) => void;
}

const Deals: React.FC<DealsProps> = ({ onNavigate }) => {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cmsApi.getDivisionContent('market');
        setCmsData(data);
      } catch (error) {
        console.error("Failed to fetch CMS data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const heroBlock = cmsData?.blocks?.find((b: any) => b.block_type === 'deals_hero')?.content_payload || {
    title: "FLASH \nDEALS",
    subtitle: "Up to 70% OFF on select items.",
    tag: "Limited Time Offer",
    endTime: new Date(Date.now() + 86400000).toISOString()
  };

  const bogofBlock = cmsData?.blocks?.find((b: any) => b.block_type === 'deals_bogof')?.content_payload || { items: [] };

  const bogofItems = bogofBlock.items.length > 0 ? bogofBlock.items : [
     { name: "Italian Penne Pasta", price: 3500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXHoapzHeb1VAPEs6czxDQyvWwduFy91nT-Drp_8nE1SyGtHCVjAT37yLzElXag6I_iuWbvvn3rXicnFwJbZK6_saydnAr5JMl2ZAbbt-npsIKEgbZlIicshunGdLBZqV_jllJM0yZfx0ST0DcjCV9quCoxmCTuc9rl_YY47qHdhClvIqTI4MUOXqUj_YG6igsq_Y8vTNSDMW6Ns8hfeTHBVkeso2GuVsE71yVuNPrxLnmZquU1I4cQrwmOV35Ph63vhNswuB0XPz5" },
     { name: "Crunchy Honey Oats", price: 8500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXBjKg17kvDr-yZMkA48mT0lE3Xbt4JdLlpvYBXczFNBE8tetypNpxK63qyjbo4BD1q7hYNuYBuXyMnKAmdoBoJCHc3e2XEt0Zxt-1NnRMUgN4tF6M_wz5k5IglIfb5d4EYamk02-tYZmmgkrA28peT1TUqjZXXfvLB-oSob3KJSxcD_RfV2blGe4UojAy4kFgp1y40sZ_iFVNBwcE7BKn-rn_rz2ktAJ5suXl3yfKQMD0MpkzqBKZss6ejH4UDb406R4XbWhVPPm1" },
     { name: "Basmati Royal Rice", price: 12000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJz7jDkUIg86_TDT-v0KLZPgAO2-9V1pv3RjvCTMcP2qbT01BI4V3idRe0PEcz_r2vmzFKmQW5NV-pJfbSy0LMvmpvLfACa4XrwDwqL2fvs6fl9xW0L1Q27K054mIGVnFLCOm7AqHdPBsT9eNLpjf36h9OOcJmFoPEdqwlT56Xwub4ZPB-teHtwt-C8wf2BBFKqb8E6dI8mO-Xr4rA3uX8GxYHVFrJHBhsOSIkago-Lg7IVnpVJixqjiUQ5VarxA96fq1-7BKGuqEM" },
     { name: "Napoli Pasta Sauce", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPS-DzsRxxDMIbFUppQkGvVi5uAk3JOnX_sonuAN2jiZ4kKJ0z8iWrWheNqy499jUiN_4J6mqQ9CmhzWJv4nsTQxiUOeEiBXjLf3_O8qZVzKlfGBMaSQG8mW496ppb1IslRyL3FtzHdTYmTwDBtc0bWKPiLG9_eoYO4Y04sTabgnC2ZL-pFuBlWdnRLMwtbztRHsLO4dmcKkcxuPnQTRWAmxQhnsb2VfigD6R8k58is0rkwXEcSDDwQ30Jcvv31OSqejf7o7vDjLRB" }
  ];

  const links = [
    { label: 'All Deals', page: 'Deals' },
    { label: 'BOGOF', page: 'BOGOF' },
    { label: 'Under $5', page: 'Under5' },
    { label: 'Bundles', page: 'Bundles' },
    { label: 'Bakery', page: 'Bakery' },
  ];

  return (
    <div className="font-sans bg-slate-50 min-h-screen text-slate-900">
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-12 sm:top-14 z-30 transition-all duration-300">
        <div className="max-w-[1800px] mx-auto px-4 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('Home')}>
             <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
               <span className="material-icons text-base">shopping_basket</span>
             </div>
             <h1 className="text-base font-sans font-bold">
                <span className="text-orange-600">Orient</span> <span className="text-slate-900">Market</span>
             </h1>
          </div>
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200">
             {links.map(link => (
                <button 
                  key={link.label} 
                  onClick={() => onNavigate(link.page)}
                  className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 whitespace-nowrap ${link.page === 'Deals' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm'}`}
                >
                  {link.label}
                </button>
             ))}
          </div>
        </div>
      </header>
      
      <main className="pb-16">
         {/* Hero */}
         <section className="relative bg-orange-600 overflow-hidden rounded-b-[1.5rem] shadow-xl mx-4 lg:mx-8 mt-2">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
            <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
               <div className="text-white p-4 md:p-8 max-w-2xl">
                  <motion.span initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white text-orange-600 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest mb-3 inline-block rounded-full shadow-lg">{heroBlock.tag}</motion.span>
                  <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-[clamp(2.5rem,6vw,4.5rem)] font-sans font-bold mb-2 leading-none tracking-tight whitespace-pre-line">{heroBlock.title}</motion.h1>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl font-sans font-light opacity-90">{heroBlock.subtitle}</motion.p>
               </div>
               <div className="bg-white/10 backdrop-blur-md p-4 md:p-8 h-full flex flex-col justify-center items-center border-l border-white/10 w-full md:w-auto">
                  <p className="text-center text-white/80 font-bold uppercase text-[9px] mb-2 tracking-[0.2em]">Offer Ends In</p>
                  <div className="flex items-center gap-2 text-center font-mono text-white">
                     <div><div className="font-black text-3xl">02</div><span className="text-[8px] opacity-60 uppercase">HRS</span></div>
                     <span className="text-xl font-light opacity-40 animate-pulse">:</span>
                     <div><div className="font-black text-3xl">14</div><span className="text-[8px] opacity-60 uppercase">MIN</span></div>
                     <span className="text-xl font-light opacity-40 animate-pulse">:</span>
                     <div><div className="font-black text-3xl">55</div><span className="text-[8px] opacity-60 uppercase">SEC</span></div>
                  </div>
               </div>
            </div>
         </section>

         {/* BOGOF Section */}
         <section className="max-w-[1800px] mx-auto px-4 lg:px-8 py-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <span className="material-icons text-lg">local_offer</span>
                </div>
                <h2 className="text-2xl font-sans font-bold text-slate-900">BOGOF Madness</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
               {bogofItems.map((item: any, idx: number) => (
                 <motion.div 
                   key={idx} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="bg-white flex flex-col group cursor-pointer hover:z-10 relative p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
                 >
                    <div className="relative aspect-square mb-4 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden group-hover:bg-white transition-colors">
                       <span className="absolute top-2 left-2 bg-slate-900 text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-widest z-10 rounded-full shadow-lg">Buy 1 Get 1 Free</span>
                       <img 
                        src={item.img} 
                        className="object-contain h-32 w-32 mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                        alt={item.name} 
                       />
                    </div>
                    <div className="flex-grow flex flex-col">
                       <h3 className="font-sans font-bold text-sm text-slate-900 mb-1 leading-tight">{item.name}</h3>
                       <div className="flex items-end gap-2 mb-4 mt-auto">
                          <span className="text-lg font-bold font-sans text-orange-600">₦{item.price.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 line-through mb-1 font-sans">₦{(item.price * 2).toLocaleString()}</span>
                       </div>
                       <button className="w-full bg-white border border-slate-200 hover:border-orange-600 hover:bg-orange-600 hover:text-white text-slate-600 font-bold py-2.5 text-[10px] uppercase tracking-widest transition-all rounded-full flex items-center justify-center gap-2 shadow-sm">
                          <span className="material-icons text-xs">content_cut</span> Clip Coupon
                       </button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </section>
      </main>
      
      {/* Sticky Widget */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md px-4 pointer-events-none">
         <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 1 }}
            className="bg-slate-900 text-white shadow-2xl p-4 flex items-center justify-between pointer-events-auto rounded-full border border-slate-800"
         >
            <div className="flex items-center gap-4 pl-2">
               <div className="bg-orange-600 p-2 rounded-full"><span className="material-icons text-white text-lg">savings</span></div>
               <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Potential Savings</p>
                  <p className="font-bold text-lg font-mono">₦22,000</p>
               </div>
            </div>
            <button className="bg-white text-slate-900 hover:bg-slate-200 font-bold py-2 px-5 text-[10px] uppercase tracking-widest rounded-full transition-colors">Sign in to Save</button>
         </motion.div>
      </div>
    </div>
  );
};

export default Deals;