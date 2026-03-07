/**
 * Dining Division Narrative Arc — "Culinary Fusion of Heritage"
 * Cinematic hero with parallax ambiance and tasting notes grid.
 */
import React from 'react';
import { motion } from 'framer-motion';

const TASTING_NOTES = [
  { label: 'Traditional', dish: 'Pounded Yam & Egusi', note: 'Heritage flavors served with reverence.' },
  { label: 'Continental', dish: 'Pan-seared Sea Bass', note: 'French technique, Plateau ingredients.' },
  { label: 'Fusion', dish: 'Suya-spiced Lamb Rack', note: 'Where global meets local, fire meets finesse.' },
  { label: 'Dessert', dish: 'Coconut Panna Cotta', note: 'A sweet finish with Nigerian soul.' },
];

export function DiningNarrativeArc() {
  return (
    <section
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
      aria-label="Dining Division — Culinary Fusion"
      style={{ background: 'linear-gradient(160deg, #1a0a00 0%, #0f0f0f 50%, #1a0500 100%)' }}
    >
      {/* Warm candlelight glow */}
      <motion.div
        animate={{ opacity: [0.12, 0.25, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(242,158,13,0.20),transparent_55%)] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(180,83,9,0.15),transparent_50%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-amber-400 mb-6"
        >
          Orient Dining · Culinary Artistry
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="font-headline italic font-bold leading-none tracking-tighter text-white"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
        >
          A Fusion of
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Heritage.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-amber-100/60 text-lg max-w-xl leading-relaxed font-body mb-16"
        >
          Our culinary team explores the intersection of traditional Plateau ingredients
          and modern gastronomic techniques. Every ingredient tells a story of the land.
        </motion.p>

        {/* Tasting Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TASTING_NOTES.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="p-6 rounded-2xl border border-amber-900/30 group hover:border-amber-500/40 transition-colors duration-500"
              style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}
            >
              <p className="text-amber-400 text-[9px] font-bold uppercase tracking-[0.4em] mb-3">{item.label}</p>
              <h3 className="text-white font-bold text-base mb-2">{item.dish}</h3>
              <p className="text-amber-200/50 text-xs leading-relaxed">{item.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
