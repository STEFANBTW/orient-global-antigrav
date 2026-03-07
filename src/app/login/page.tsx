'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoles, MOCK_PERSONAS } from '@/context/role-context';
import { LogIn, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage({ onCancel }: { onCancel?: () => void }) {
  const { setCurrentUser } = useRoles();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'id' | 'secret' | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (userId.trim().toLowerCase() === 'admin' && secret.trim() === 'boss') {
      const adminProfile = MOCK_PERSONAS.find((p: any) => p.id === 'admin');
      if (adminProfile) {
        setCurrentUser(adminProfile);
        navigate('/dashboard', { replace: true });
      }
    } else {
      setError('Invalid ID or Secret.');
    }
  };

  return (
    <div
      className="login-theme min-h-screen flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden"
      style={{ background: 'var(--login-bg)', color: 'var(--login-text)' }}
    >
      {onCancel && (
        <button 
          onClick={onCancel}
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors group"
          style={{ color: 'var(--login-text-muted)' }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Main Site
        </button>
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-3">Orient CMS</h1>
        </div>

        <div
          className="backdrop-blur-2xl rounded-[2.5rem] p-8 relative overflow-hidden"
          style={{
            background: 'var(--login-card-bg)',
            border: '1px solid var(--login-card-border)',
            boxShadow: 'var(--login-card-shadow)',
          }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight">System Login</h2>
            <p className="text-xs font-medium mt-2" style={{ color: 'var(--login-text-muted)' }}>
              Please enter your credentials to proceed.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="p-4 rounded-2xl text-sm font-bold text-center"
                  style={{
                    background: 'var(--login-error-bg)',
                    color: 'var(--login-error-text)',
                    border: '1px solid var(--login-error-border)',
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Admin ID Field */}
            <motion.div 
              animate={{ scale: focusedInput === 'id' ? 1.02 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="space-y-3"
            >
              <label
                className="text-[10px] font-black uppercase tracking-[0.2em] pl-2 block"
                style={{ color: 'var(--login-label)' }}
              >
                Administrator ID
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onFocus={() => setFocusedInput('id')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter ID"
                  className="w-full h-14 rounded-2xl px-5 text-base font-bold focus:outline-none transition-all"
                  style={{
                    background: 'var(--login-input-bg)',
                    border: '1px solid var(--login-input-border)',
                    color: 'var(--login-input-text)',
                    boxShadow: focusedInput === 'id' ? '0 0 0 2px var(--login-input-focus-ring)' : 'none',
                  }}
                  required
                />
              </div>
            </motion.div>

            {/* Secret Field */}
            <motion.div 
              animate={{ scale: focusedInput === 'secret' ? 1.02 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="space-y-3"
            >
              <label
                className="text-[10px] font-black uppercase tracking-[0.2em] pl-2 block"
                style={{ color: 'var(--login-label)' }}
              >
                Security Secret
              </label>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  onFocus={() => setFocusedInput('secret')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter Secret"
                  className="w-full h-14 rounded-2xl pl-5 pr-14 text-base font-bold focus:outline-none transition-all"
                  style={{
                    background: 'var(--login-input-bg)',
                    border: '1px solid var(--login-input-border)',
                    color: 'var(--login-input-text)',
                    boxShadow: focusedInput === 'secret' ? '0 0 0 2px var(--login-input-focus-ring)' : 'none',
                  }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-0 bottom-0 h-full flex items-center justify-center transition-colors focus:outline-none"
                  style={{ color: 'var(--login-icon)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--login-icon-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--login-icon)'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Authenticate Button */}
            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full h-14 mt-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 group relative overflow-hidden transition-colors"
              style={{
                background: 'var(--login-btn-bg)',
                color: 'var(--login-btn-text)',
                boxShadow: 'var(--login-btn-shadow)',
              }}
            >
               <div
                 className="absolute inset-0 w-[150%] h-[250%] left-[-25%] top-full rounded-[40%] group-hover:top-[-50%] transition-all duration-700 ease-in-out z-0"
                 style={{
                   background: 'var(--login-btn-hover-bg)',
                   transformOrigin: 'center',
                 }}
               />
               <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:[color:var(--login-btn-hover-text)]">
                 Authenticate <LogIn className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
               </span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
