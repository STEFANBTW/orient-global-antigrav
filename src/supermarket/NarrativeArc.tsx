/**
 * Market Division Narrative Arc — "Marketplace of the World"
 * Clean, premium grocery aesthetic with category spotlight cards.
 */
import React from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { name: 'Fresh Produce', desc: 'Locally sourced, globally curated.', color: 'bg-emerald-500' },
    { name: 'Global Spices', desc: 'From 30+ countries to your kitchen.', color: 'bg-amber-500' },
    { name: 'Organic Dairy', desc: 'Farm-direct, cold-chain guaranteed.', color: 'bg-sky-500' },
    { name: 'Premium Pantry', desc: 'Oils, grains, and artisan imports.', color: 'bg-rose-500' },
];

export function MarketNarrativeArc() {
    return (
        <section
            className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-white dark:bg-slate-950"
            aria-label="Market Division — Marketplace of the World"
        >
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-primary mb-6"
                >
                    Orient Market · Global Standards
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                    className="font-headline italic font-bold leading-none tracking-tighter text-slate-900 dark:text-white"
                    style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
                >
                    Marketplace
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                        of the World.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mt-8 text-slate-500 dark:text-slate-400 text-lg max-w-xl leading-relaxed font-body mb-16"
                >
                    We've redefined the shopping experience: wide aisles, perfect lighting,
                    and a curated selection of 500+ international and local products.
                    Quality you can trust, right here in Rayfield, Jos.
                </motion.p>

                {/* Category Spotlight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CATEGORIES.map((cat, idx) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group hover:shadow-lg transition-all duration-500 relative overflow-hidden"
                        >
                            <div className={`w-8 h-1 ${cat.color} rounded-full mb-4 group-hover:w-12 transition-all duration-500`} />
                            <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-widest mb-2">{cat.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{cat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
