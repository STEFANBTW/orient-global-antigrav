import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface Props {
  onNavigate: (page: any) => void;
}

const Register: React.FC<Props> = ({ onNavigate }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register({ email, pass, name });
    setLoading(false);
    onNavigate('Dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="p-8">
           <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
           <p className="text-gray-500 text-center mb-6 text-sm">Join Orient Suite for exclusive wholesale pricing.</p>

           <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                 <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Name</label>
                 <input 
                   type="text" 
                   required
                   className="w-full rounded-lg border-gray-300 focus:ring-[#ff6a00] focus:border-[#ff6a00]"
                   placeholder="John Doe"
                   value={name}
                   onChange={e => setName(e.target.value)}
                 />
              </div>
              <div>
                 <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address</label>
                 <input 
                   type="email" 
                   required
                   className="w-full rounded-lg border-gray-300 focus:ring-[#ff6a00] focus:border-[#ff6a00]"
                   placeholder="you@company.com"
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                 />
              </div>
              <div>
                 <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Password</label>
                 <input 
                   type="password" 
                   required
                   className="w-full rounded-lg border-gray-300 focus:ring-[#ff6a00] focus:border-[#ff6a00]"
                   placeholder="••••••••"
                   value={pass}
                   onChange={e => setPass(e.target.value)}
                 />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#ff6a00] hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {loading ? 'Creating...' : 'Register'} <span className="material-icons text-sm">person_add</span>
              </button>
           </form>
           
           <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account? <button onClick={() => onNavigate('Login')} className="text-[#ff6a00] font-bold hover:underline">Sign In</button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Register;
