import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Quality: React.FC = () => {
  const [batchId, setBatchId] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if(batchId) setIsVerified(true);
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Hero */}
      <div className="bg-[#0a192f] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1920&q=80')] bg-cover mix-blend-overlay opacity-20"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter"
          >
            TRUST THROUGH DATA.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-cyan-100 mb-12 font-light"
          >
            Our commitment to transparency. Every drop verified. Trace your bottle's journey from source to sip.
          </motion.p>
          
          <form onSubmit={handleVerify} className="max-w-2xl mx-auto relative">
            <span className="material-icons absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              placeholder="ENTER YOUR BOTTLE NECK CODE (e.g., OW-4192)" 
              className="w-full h-16 pl-16 pr-4 rounded-2xl text-slate-900 outline-none focus:ring-4 focus:ring-cyan-500/50 shadow-2xl font-mono text-sm"
            />
            {isVerified && (
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2">
                <span className="material-icons text-white animate-bounce">arrow_downward</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Verification Result */}
      {isVerified ? (
        <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-3xl border-t-8 border-cyan-500 overflow-hidden"
          >
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 border-b border-cyan-100 dark:border-cyan-800 text-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-widest">Batch #{batchId || '4192'} VERIFIED</h2>
            </div>
            
            <div className="p-10 space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons text-cyan-600">schedule</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Bottling Time</h4>
                  <p className="text-xl font-medium text-slate-900 dark:text-white">12:45 PM, OCTOBER 26, 2023</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons text-cyan-600">person</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Lab Technician</h4>
                  <p className="text-xl font-medium text-slate-900 dark:text-white">Dr. A. Yusuf</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons text-cyan-600">science</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Mineral Levels (mg/L)</h4>
                  <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
                    Calcium 42, Magnesium 18, Potassium 5, Bicarbonates 150 <br/>
                    <span className="text-cyan-500 font-bold">pH 7.4 (OPTIMAL)</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-500 dark:bg-emerald-600 p-6 flex items-center justify-center gap-3 text-white font-bold tracking-widest uppercase text-sm">
              <span className="material-icons">check_circle</span>
              QUALITY APPROVED
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="h-32"></div>
      )}

      {/* Lab Gallery */}
      <section className="bg-white dark:bg-slate-950 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Our Clinical Lab in Jos</h2>
            <div className="w-24 h-1.5 bg-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: 'Microbiological Testing', img: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&w=400&q=80' },
              { title: 'Mineral Analysis Station', img: 'https://images.unsplash.com/photo-1581093588401-fbb0736d9138?auto=format&fit=crop&w=400&q=80' },
              { title: 'Advanced Filtration', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80' },
              { title: 'Dr. Yusuf at Work', img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80' },
              { title: 'Quality Control Check', img: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=400&q=80' },
              { title: 'The Jos Facility', img: 'https://images.unsplash.com/photo-1565514020176-db7102e34568?auto=format&fit=crop&w=400&q=80' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="overflow-hidden rounded-2xl mb-6 shadow-xl border border-slate-100 dark:border-slate-800">
                  <img src={item.img} alt={item.title} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700 font-sans" />
                </div>
                <h3 className="text-center font-medium text-slate-700 dark:text-slate-300 uppercase tracking-widest text-xs">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quality;