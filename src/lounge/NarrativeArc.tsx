/**
 * Lounge Division Narrative Arc — "After Hours"
 * Deep purple/gold speakeasy atmosphere with an ambient visualizer feel.
 */
import React from 'react';
import { motion } from 'framer-motion';

const LOUNGE_PILLARS = [
    { title: 'The Lab', desc: 'Molecular cocktails crafted by hand.', accent: 'from-purple-400 to-violet-500' },
    { title: 'The Visualizer', desc: 'Immersive audio-visual experiences.', accent: 'from-violet-400 to-fuchsia-500' },
    { title: 'The Concierge', desc: 'White-glove membership services.', accent: 'from-fuchsia-400 to-pink-500' },
    { title: 'The Events', desc: 'Private parties & exclusive launches.', accent: 'from-pink-400 to-rose-500' },
];

export function LoungeNarrativeArc() {
    return (
        <section
            className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
            aria-label="Lounge Division — After Hours"
            style={{ background: 'linear-gradient(160deg, #0c0015 0%, #0a0a0f 40%, #10001a 100%)' }}
        >
            {/* Ambient purple halos */}
            <motion.div
                animate={{ opacity: [0.1, 0.22, 0.1], scale: [1, 1.05, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.25) 0%, transparent 70%)' }}
            />
            <motion.div
                animate={{ opacity: [0.08, 0.16, 0.08] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[100px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-purple-300 mb-6"
                >
                    Orient Lounge · Nightlife Elevated
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                    className="font-headline italic font-bold leading-none tracking-tighter text-white"
                    style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
                >
                    After
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-fuchsia-400">
                        Hours.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mt-8 text-purple-200/50 text-lg max-w-xl leading-relaxed font-body mb-16"
                >
                    When the sun sets, Orient transforms. Step into a world of molecular mixology,
                    immersive soundscapes, and curated experiences designed for the discerning nightlifer.
                </motion.p>

                {/* Experience Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {LOUNGE_PILLARS.map((pillar, idx) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.25, 1, 0.5, 1] }}
                            className="p-6 rounded-2xl border border-purple-900/30 group hover:border-purple-500/40 transition-colors duration-500 relative overflow-hidden"
                            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
                        >
                            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">{pillar.title}</h3>
                            <p className="text-purple-200/40 text-xs leading-relaxed">{pillar.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
