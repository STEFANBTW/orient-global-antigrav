/**
 * Bakery Division Narrative Arc — "The Science of Warmth"
 * Hero and story section injected above the Bakery content.
 * Implements the macro-texture, tactile warmth aesthetic.
 */
import React from 'react';
import { motion } from 'framer-motion';

const WARMTH_FACTS = [
    { label: 'Hours Fermented', value: '48', suffix: 'hrs', desc: 'Long cold fermentation for complex flavour development.' },
    { label: 'Batches Per Day', value: '6', suffix: '+', desc: 'Morning to evening freshness windows, never day-old.' },
    { label: 'Natural Starters', value: '3', suffix: '', desc: 'Proprietary sourdough cultures, maintained since day one.' },
    { label: 'Local Grain', value: '100', suffix: '%', desc: 'Stone-ground flour from verified Nigerian farms.' },
];

export function BakeryNarrativeArc() {
    return (
        <section
            className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
            aria-label="Bakery Division — The Science of Warmth"
            style={{
                background: 'linear-gradient(160deg, #fef3c7 0%, #fff8f0 40%, #fde8d0 100%)',
            }}
        >
            {/* Blurred grain texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: '128px' }}
            />

            {/* Warm ambient blobs */}
            <motion.div
                animate={{ scale: [1, 1.08, 1], x: [0, 15, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full blur-[100px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.30) 0%, transparent 70%)' }}
            />
            <motion.div
                animate={{ scale: [1.05, 1, 1.05], x: [0, -10, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full blur-[100px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.20) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24">
                {/* Header */}
                <div className="mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-amber-600 mb-6"
                    >
                        Orient Bakery ·  The Science of Warmth
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                        className="font-headline italic font-bold leading-none tracking-tighter text-slate-900"
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
                    >
                        Every Crust
                        <br />
                        <span className="text-amber-500">Has Memory.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-8 text-slate-600 text-lg max-w-xl leading-relaxed font-body"
                    >
                        Bread is not baked — it is cultivated. Every loaf in our production line passes through
                        a 48-hour cold fermentation ritual that coaxes extraordinary flavour from
                        the simplest ingredients.
                    </motion.p>
                </div>

                {/* Science Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {WARMTH_FACTS.map((fact, idx) => (
                        <motion.div
                            key={fact.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                            className="p-6 rounded-2xl border relative overflow-hidden group"
                            style={{
                                background: 'rgba(255,255,255,0.6)',
                                backdropFilter: 'blur(12px)',
                                borderColor: 'rgba(251,191,36,0.2)',
                            }}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(251,191,36,0.12), transparent 70%)' }}
                            />
                            <p className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-3">{fact.label}</p>
                            <p className="font-headline font-bold text-slate-900 mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                                {fact.value}<span className="text-amber-500 text-xl">{fact.suffix}</span>
                            </p>
                            <p className="text-slate-500 text-xs leading-relaxed">{fact.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
