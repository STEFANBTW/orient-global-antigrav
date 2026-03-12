import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '@/hooks/useCMS';
import { WaterNarrativeArc } from './NarrativeArc';

const Process: React.FC = () => {
    const [batchId, setBatchId] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const { content: cmsData, loading } = useCMS('water');

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex items-center justify-center font-sans text-blue-500">
                <div className="animate-pulse tracking-[0.2em] uppercase text-sm">Synchronizing Lab Data...</div>
            </div>
        );
    }

    const stages = [
        { 
            id: '01', 
            title: 'Mechanical Pre-Filtration', 
            desc: 'The journey begins by removing coarse particles like rust, sand, and silt using a high-precision 5-micron polypropylene barrier.',
            stat: '5 Micron Precision',
            img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop'
        },
        { 
            id: '02', 
            title: 'Molecular Reverse Osmosis', 
            desc: 'Under high pressure, water is forced through a semi-permeable membrane that rejects 99.9% of total dissolved solids.',
            stat: '0.0001µ Membrane',
            img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000&auto=format&fit=crop'
        },
        { 
            id: '03', 
            title: 'UV-C Sterilization', 
            desc: 'A final biological barrier uses 254nm ultraviolet light to deactivate bacteria and viruses at a DNA level without chemicals.',
            stat: '99.99% Biological Kill',
            img: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop'
        }
    ];

    return (
        <div className="w-full font-sans bg-slate-50 dark:bg-slate-950">
            <WaterNarrativeArc />

            {/* Hero - The Science of Purity */}
            <header className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/20 blur-[120px]"
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center px-4 py-1 mb-8 border border-blue-500/10 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl"
                    >
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400">Scientific Methodology</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-light text-slate-900 dark:text-white mb-8 tracking-tighter">The Science of <br/><span className="font-medium text-blue-600">Pure Hydration</span></h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Beyond filtration. We use advanced molecular separation and medical-grade sterilization to ensure every drop is structurally perfect.
                    </p>
                </div>
            </header>

            {/* Sequential Stages */}
            <section className="py-24 space-y-32 max-w-7xl mx-auto px-6">
                {stages.map((stage, idx) => (
                    <motion.div 
                        key={stage.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24`}
                    >
                        <div className="w-full md:w-1/2">
                            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white dark:border-slate-800">
                                <img src={stage.img} alt={stage.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="text-blue-500/20 font-light text-8xl mb-6 font-serif italic">{stage.id}</div>
                            <h3 className="text-3xl md:text-5xl font-light text-slate-900 dark:text-white mb-6 tracking-tight uppercase">{stage.title}</h3>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-10">
                                {stage.desc}
                            </p>
                            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-blue-500/10 bg-blue-500/5">
                                <span className="material-icons text-blue-500 text-sm">analytics</span>
                                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">{stage.stat}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Transparency Portal */}
            <section className="py-32 bg-white dark:bg-[#050b1a] border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 relative z-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-light text-slate-900 dark:text-white mb-6 tracking-tighter">Mineral Transparency</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-light">
                            Enter your batch ID to see the precise lab results for your specific bottle.
                        </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
                        <form onSubmit={(e) => { e.preventDefault(); if (batchId) setIsVerified(true); }} className="relative mb-12">
                            <input 
                                type="text" 
                                value={batchId}
                                onChange={(e) => setBatchId(e.target.value.toUpperCase())}
                                placeholder="BATCH ID (E.G. ORI-550)"
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 pb-6 text-3xl md:text-5xl font-light text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all uppercase placeholder:opacity-30"
                            />
                            <button type="submit" className="absolute right-0 bottom-6 text-blue-600 hover:scale-110 transition-transform">
                                <span className="material-icons text-5xl">biotech</span>
                            </button>
                        </form>

                        <AnimatePresence mode="wait">
                            {isVerified ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                >
                                    {[
                                        { label: 'pH Balance', val: '7.4', unit: 'Alkaline' },
                                        { label: 'TDS Count', val: '12', unit: 'mg/L' },
                                        { label: 'Ozone', val: '0.4', unit: 'ppm' }
                                    ].map((item) => (
                                        <div key={item.label} className="bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
                                            <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-3">{item.label}</div>
                                            <div className="text-3xl font-medium text-blue-600 mb-1">{item.val}</div>
                                            <div className="text-[10px] text-blue-400 uppercase font-bold">{item.unit}</div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="text-center py-16 opacity-40">
                                    <span className="material-icons text-6xl mb-4 text-slate-300">shield</span>
                                    <p className="text-sm font-light tracking-widest uppercase">Awaiting Authentication</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Process;