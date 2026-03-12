import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockDb } from '../../lib/mockDb';

export const LoginForm: React.FC<{ onLogin: (user: any) => void; onSwitchToSignup: () => void }> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockDb.login(email, password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto p-8 bg-[var(--bakery-card-bg)] rounded-3xl border border-[var(--bakery-card-border)] shadow-2xl"
    >
      <h2 className="text-3xl font-bold text-[var(--bakery-heading)] mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-xs rounded-lg text-center">{error}</div>}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[var(--bakery-bg)] border border-[var(--bakery-card-border)] rounded-xl py-3 px-4 text-[var(--bakery-text)] outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. user@orient.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[var(--bakery-bg)] border border-[var(--bakery-card-border)] rounded-xl py-3 px-4 text-[var(--bakery-text)] outline-none focus:ring-2 focus:ring-primary"
            placeholder="••••••••"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all transform active:scale-95"
        >
          Sign In
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--bakery-text-muted)]">
        Don't have an account? <button onClick={onSwitchToSignup} className="text-primary font-bold hover:underline">Sign Up</button>
      </p>
    </motion.div>
  );
};
