/**
 * Games Division Narrative Arc — "Enter The Arena"
 * Cyber-noir aesthetic with neon accents and competitive stats.
 */
import React from 'react';
import { motion } from 'framer-motion';

const ARENA_STATS = [
  { label: 'Gaming Stations', value: '24', icon: '🎮' },
  { label: 'VR Pods', value: '8', icon: '🥽' },
  { label: 'Monthly Tournaments', value: '12', icon: '🏆' },
  { label: 'Active Players', value: '2K+', icon: '⚡' },
];

export function GamesNarrativeArc() {
  return (
    <section
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
      aria-label="Games Division — Enter The Arena"
      style={{ background: '#020202' }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 51%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Neon glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,243,255,0.15),transparent_55%)] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(176,38,255,0.10),transparent_50%)] pointer-events-none"
      />

      {/* Cyber grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,243,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] mb-6"
          style={{ color: '#00f3ff', textShadow: '0 0 10px rgba(0,243,255,0.5)' }}
        >
          Orient Games · Digital Colosseum
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="font-headline italic font-bold leading-none tracking-tighter text-white"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          Enter
          <br />
          <span style={{ color: '#00f3ff', textShadow: '0 0 30px rgba(0,243,255,0.4)' }}>
            The Arena.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-gray-400 text-lg max-w-xl leading-relaxed font-body mb-16"
        >
          Where competitive fire meets next-gen hardware. Our gaming arena features
          tournament-grade setups, VR pods, and a community of players who live for the game.
        </motion.p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ARENA_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-cyan-900/30 text-center group hover:border-cyan-400/40 transition-colors"
              style={{ background: 'rgba(0,243,255,0.03)' }}
            >
              <span className="text-3xl mb-3 block">{stat.icon}</span>
              <p className="text-white font-bold text-2xl mb-1">{stat.value}</p>
              <p className="text-cyan-300/60 text-[10px] font-bold uppercase tracking-[0.3em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
