/**
 * Water Division Narrative Arc — "The Anatomy of Purity"
 * Hero and story section injected above the Water Home content.
 * Implements the cinematic vertical filtration descent with glassmorphic panels.
 */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STAGES = [
    { id: '01', title: 'Sediment Filter', desc: '5-micron capture of rust, dust & sand' },
    { id: '02', title: 'Carbon Block', desc: 'Activated carbon removes chlorine & VOCs' },
    { id: '03', title: 'Reverse Osmosis', desc: '0.0001μm membrane rejects heavy metals' },
    { id: '04', title: 'UV Sterilisation', desc: '254nm UV inactivates 99.9% of pathogens' },
    { id: '05', title: 'Mineraliser', desc: 'Calcium & Magnesium restore pH balance' },
    { id: '06', title: 'Polish Stage', desc: 'Coconut shell carbon for crisp, clean taste' },
    { id: '07', title: 'Sterile Seal', desc: 'ISO 9001 certified bottling environment' },
];

export function WaterNarrativeArc() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const yDrop = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950"
            aria-label="Water Division — Anatomy of Purity"
        >
            {/* Deep water background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-950 to-cyan-950" />

            {/* Animated water shimmer */}
            <motion.div
                animate={{ opacity: [0.08, 0.18, 0.08] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(96,165,250,0.3),transparent_60%)] pointer-events-none"
            />

            {/* Vertical line — The filtration descent */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />

            {/* Hero  Text */}
            <motion.div
                style={{ y: yDrop, opacity }}
                className="relative z-10 text-center px-8 py-20 max-w-4xl"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-400/5 mb-8"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.4em]">
                        7-Stage Molecular Purification
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    className="text-white font-headline italic font-bold leading-none tracking-tighter mb-6"
                    style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
                >
                    The Anatomy
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400">
                        of Purity
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-blue-200/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-body"
                >
                    Every drop earns its clarity. The journey from source water to your table
                    passes through seven precisely engineered stages — each a revelation in molecular
                    chemistry.
                </motion.p>
            </motion.div>

            {/* Filtration Cascade — Scroll-Driven */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-24 space-y-0">
                {STAGES.map((stage, idx) => (
                    <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                        className={`flex items-center gap-6 py-6 border-b border-blue-900/40 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'}`}
                    >
                        {/* Stage number */}
                        <div
                            className="shrink-0 w-12 h-12 rounded-full border border-blue-400/30 flex items-center justify-center"
                            style={{ background: 'rgba(96,165,250,0.08)', backdropFilter: 'blur(8px)' }}
                        >
                            <span className="text-blue-400 font-code text-xs font-bold">{stage.id}</span>
                        </div>

                        {/* Glassmorphic info card */}
                        <div
                            className="flex-1 p-5 rounded-2xl"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(96, 165, 250, 0.12)',
                            }}
                        >
                            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-1">{stage.title}</h3>
                            <p className="text-blue-300/70 text-xs leading-relaxed">{stage.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
