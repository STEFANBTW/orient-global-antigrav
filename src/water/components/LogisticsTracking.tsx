import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogisticsTracking: React.FC = () => {
    const [trackId, setTrackId] = useState('');
    const [result, setResult] = useState<null | 'found'>(null);

    const steps = [
        { label: 'Order Processed', status: 'complete', icon: 'inventory' },
        { label: 'Quality Verification', status: 'complete', icon: 'verified' },
        { label: 'In Transit', status: 'current', icon: 'local_shipping' },
        { label: 'Delivered', status: 'pending', icon: 'home' }
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (trackId.length > 3) setResult('found');
    };

    return (
        <div className="w-full h-full bg-slate-50 dark:bg-slate-950 p-6 md:p-12 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {/* Search Bar */}
                <div className="mb-16">
                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-8">Manifest Search</h3>
                    <form onSubmit={handleSearch} className="relative">
                        <input 
                            type="text" 
                            value={trackId}
                            onChange={(e) => setTrackId(e.target.value.toUpperCase())}
                            placeholder="MANIFEST ID (E.G. TRX-9902)"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl px-8 py-6 text-2xl font-light text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all uppercase"
                        />
                        <button type="submit" className="absolute right-4 top-4 bottom-4 px-6 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-colors">
                            Locate
                        </button>
                    </form>
                </div>

                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Tracking Progress */}
                            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl shadow-blue-500/5">
                                <div className="flex justify-between items-end mb-12">
                                    <div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Estimated Arrival</div>
                                        <div className="text-3xl font-light text-slate-900 dark:text-white">14:45 PM <span className="text-blue-500 text-sm font-medium ml-2">— Today</span></div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Courier</div>
                                        <div className="text-lg font-medium text-slate-900 dark:text-white">Soji Adelaja</div>
                                    </div>
                                </div>

                                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    {/* Progress Line */}
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 hidden md:block"></div>
                                    
                                    {steps.map((step, idx) => (
                                        <div key={idx} className="relative z-10 flex flex-row md:flex-col items-center gap-4 bg-white dark:bg-slate-900 pr-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                step.status === 'complete' ? 'bg-blue-600 text-white' : 
                                                step.status === 'current' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 ring-4 ring-blue-500/20' : 
                                                'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                            }`}>
                                                <span className="material-icons text-xl">{step.icon}</span>
                                            </div>
                                            <div className="text-left md:text-center">
                                                <div className={`text-[10px] font-bold uppercase tracking-widest ${step.status === 'current' ? 'text-blue-600' : 'text-slate-400'}`}>
                                                    {step.label}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Map Visualization */}
                            <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 relative shadow-inner">
                                <div className="absolute inset-0 opacity-40 grayscale pointer-events-none">
                                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="Map" />
                                </div>
                                <div className="absolute inset-0 bg-blue-900/10"></div>
                                
                                {/* Dynamic Pulse Marker */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative w-8 h-8">
                                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50"></div>
                                        <div className="relative w-8 h-8 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center">
                                            <span className="material-icons text-white text-xs">local_shipping</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-6 left-6 p-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-white/20 text-[10px] font-bold tracking-widest uppercase text-slate-500 shadow-lg">
                                    Live Telemetry Active
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center py-24 opacity-30">
                            <span className="material-icons text-7xl mb-6">explore</span>
                            <p className="text-sm font-light uppercase tracking-[0.4em]">Enter shipment ID to begin</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LogisticsTracking;