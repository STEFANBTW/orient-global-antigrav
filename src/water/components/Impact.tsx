import React from 'react';
import { motion } from 'framer-motion';
import { WaterNarrativeArc } from './NarrativeArc';

const Impact: React.FC = () => {
    return (
        <div className="w-full font-sans bg-slate-50 dark:bg-slate-950">
            <WaterNarrativeArc />

            {/* Impact Hero */}
            <header className="relative pt-32 pb-48 px-6 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-emerald-500/10 blur-[150px]"
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center px-4 py-1 mb-8 border border-emerald-500/10 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl"
                    >
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-emerald-600 dark:text-emerald-400">Sustainability & Community</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-9xl font-light text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.85]">
                        Water for the <br/><span className="italic font-serif text-emerald-600">Next Generation</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        We believe in a circular future. Our goal is not just to provide water, but to protect the source and eliminate plastic waste from the ecosystem.
                    </p>
                </div>
            </header>

            {/* Impact Stats */}
            <section className="relative z-30 -mt-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Plastic Saved', val: '2.4M', unit: 'Single-use bottles', color: 'text-blue-600' },
                    { label: 'Community Liters', val: '450k', unit: 'Donated annually', color: 'text-emerald-600' },
                    { label: 'Carbon Offset', val: '80%', unit: 'Solar-powered plant', color: 'text-sky-600' }
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5 group hover:-translate-y-2 transition-transform duration-500"
                    >
                        <div className="text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-4">{stat.label}</div>
                        <div className={`text-6xl font-light ${stat.color} mb-2 tracking-tighter`}>{stat.val}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-light">{stat.unit}</div>
                    </motion.div>
                ))}
            </section>

            {/* Circular Economy Section */}
            <section className="py-48 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-light text-slate-900 dark:text-white mb-8 tracking-tight uppercase">The Circular <br/><span className="font-serif italic capitalize">Loop</span></h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-12">
                        Our 19L dispenser program is built on zero-waste principles. We recover, sanitize, and refill every container, ensuring no plastic enters the landfill.
                    </p>
                    
                    <div className="space-y-8">
                        {[
                            { step: 'Recovery', desc: 'Empty containers are retrieved during your next delivery.' },
                            { step: 'Sanitization', desc: '8-stage high-temperature pressurized medical wash.' },
                            { step: 'Refill', desc: 'Hermetically sealed with UV-sterilized caps.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xs font-bold shrink-0">{i+1}</span>
                                <div>
                                    <h4 className="font-medium text-slate-900 dark:text-white mb-1">{item.step}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative aspect-square">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full"
                    />
                    <div className="absolute inset-12 rounded-full bg-emerald-500/5 backdrop-blur-3xl flex items-center justify-center overflow-hidden border border-emerald-500/10">
                        <img 
                            src="https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=800&q=80" 
                            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700 scale-110"
                            alt="Sustainable nature"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
                        <div className="relative text-center p-8">
                            <span className="material-icons text-white text-6xl mb-4 animate-pulse">recycling</span>
                            <div className="text-white font-serif italic text-2xl">Forever Clean</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Impact;