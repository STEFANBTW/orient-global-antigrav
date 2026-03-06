import React from 'react';
import { motion } from 'framer-motion';

interface DashboardProps {
  onNavigate: (page: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const navItems = [
    { id: 'Dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'Dashboard', icon: 'kitchen', label: 'My Pantry' }, // Kitchen redirects to main dashboard view for now
    { id: 'Receipts', icon: 'receipt_long', label: 'Receipts' },
    { id: 'Favorites', icon: 'favorite', label: 'Favorites' },
    { id: 'Loyalty', icon: 'loyalty', label: 'Loyalty' },
    { id: 'Settings', icon: 'settings', label: 'Settings' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="font-display bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col transition-colors duration-300">
      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
         <aside className="hidden lg:flex flex-col w-64 pt-8 pb-6 pr-6 sticky top-0 h-full">
            <nav className="space-y-1">
               {navItems.map((item, i) => (
                  <button 
                     key={item.id + i} 
                     onClick={() => onNavigate(item.id)}
                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${item.icon === 'kitchen' ? 'bg-[#ff6a00]/10 text-[#ff6a00] font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm'}`}
                  >
                     <span className={`material-icons ${item.icon === 'kitchen' ? '' : 'text-gray-400 group-hover:text-[#ff6a00] transition-colors'}`}>{item.icon}</span>
                     <span className="capitalize">{item.label}</span>
                  </button>
               ))}
            </nav>
         </aside>

         <main className="flex-1 flex flex-col lg:flex-row gap-6 p-4 lg:p-8">
            <motion.div 
               variants={container}
               initial="hidden"
               animate="show"
               className="flex-1 flex flex-col gap-6"
            >
               {/* Delivery Widget */}
               <motion.div variants={itemAnim} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                     <h2 className="font-bold text-lg text-gray-900 dark:text-white">Active Delivery</h2>
                     <span className="text-xs font-mono text-[#ff6a00] bg-[#ff6a00]/10 px-2 py-1 rounded">ORDER #8920</span>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700 flex-shrink-0"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoLnVeL44jkjtmwQxjCJ4Fbt14l3Jbz8YC278yJslk1GE1LehJCw8YjnicdmDXRWfEDtkqb483NspodmfrV1Q0Jo9EbwICzgvukibkvP4bi0kSS4h-WKj3njHMuF18yFP0Lhvq5s22o0-PuE1ybYNyWLBLXJws_wfIIddru9TozcLJdj0HbIO7sU1go_xmCYJ313XT4HeCkqsoPDNpgB7NilpejuOfSstw0xnlZtse27wNMW3ChICF4PI9gXgRDtttmtbd9jw51FWU" className="w-full h-full object-cover" alt="Delivery"/></div>
                     <div className="flex-1">
                        <div className="flex justify-between items-end mb-2">
                           <div><p className="font-medium text-gray-900 dark:text-white">Arriving Today</p><p className="text-sm text-gray-500 dark:text-gray-400">4:00 PM - 5:00 PM</p></div>
                           <span className="text-[#ff6a00] font-bold text-sm flex items-center gap-1"><span className="material-icons text-base">local_shipping</span> Out for Delivery</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-[#ff6a00] h-2 rounded-full"></motion.div>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Pantry */}
               <div>
                  <motion.h2 variants={itemAnim} className="font-bold text-xl mb-4 text-gray-900 dark:text-white">My Pantry</motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {[
                        { name: "Organic Whole Milk", price: "4.50", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2CnVZ_P8N3mwhobsokYB14ltfiSdDQVAD1SJxM61o474NHsnoMFIhUGJkolK64Ail3Nrk5HHYdRM9g-ViP37CMuaPANoFwTk3hzHftcnbS6zB5tJ0d3HQTYNYYVQAmE_E1qoP71E6G2_BqYjFisRbrQl8JViEIjy30O5TnIys-yuyd2XKqvs5CvkWIvfaL2nzhJda9S_sd5SAvCBFh3W5bvJ3Mo1C44p-nCAvAsXsJziQC1xiRsnVULZMhu3rvLH0CJjxgYrGdOQi", alert: true },
                        { name: "Jasmine Rice (5kg)", price: "12.99", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQxiY1M6oPb6vTS8ntxFQoQACwMczNPNcj5XZX8Lr7cRbw8DUDY7RhLtaGq8OKwamboBx6bdkE9awSlZmO4JomzBUIhB7J3dShN1gLhjtn_fci5o8cYU985AbZE55lI4F0ej1a5fhSigkh0YVyKg-WhF2YmrcXbe6YCw9c8ixk23xhflc609Sn-W76DOyXY7hcvHXu1-N_fv74PAYdMiKexpyzHZczCIvGvE03hqkP--n2jZuVmECFa4p2EL3CbOv1ZJBz72bnuzoy" },
                        { name: "Free Range Eggs", price: "6.20", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6aXv9TowMApGbyEZHuyMIigU6h8ij6Gp7BssqX2TXJ49-yHbhoYTYwNa3wZcRpj-uJX1-tlqj9l0ZZK0x56vySTALn35fbdWVZ9hDzeaQzaNlC7KAuMOLnQN54opaNNifO6320cSGoB3wR6Mnz7PjmrVf7rb3RI3b6pxpvg6k_jcbq8qg8ZGsVgHNrAisp5cNGUva75mvR62zySXNMvxguQFLXRunFwsGXWlEekFmi4mXAGFtT74SDUJu9F_xfzcnM1vtNt4gGsWX" }
                     ].map((item, i) => (
                        <motion.div variants={itemAnim} key={i} whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 relative group transition-all">
                           {item.alert && <div className="absolute top-3 right-3 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">Low Stock</div>}
                           <div className="h-28 w-full flex items-center justify-center mb-3"><img src={item.img} className="h-full object-contain transform group-hover:scale-110 transition-transform duration-300" alt={item.name} /></div>
                           <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                           <p className="text-xs text-gray-500 mb-3">Last bought: {i === 0 ? '3 days ago' : '2 weeks ago'}</p>
                           <div className="flex items-center justify-between mt-auto">
                              <span className="font-mono font-bold text-lg text-gray-900 dark:text-white">${item.price}</span>
                              <motion.button whileTap={{ scale: 0.95 }} className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 ${item.alert ? 'bg-[#ff6a00] text-white shadow-md' : 'bg-slate-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-[#ff6a00] dark:hover:bg-[#ff6a00] hover:text-white dark:hover:text-white transition-colors'}`}>
                                 <span className="material-icons text-sm">add</span> Restock
                              </motion.button>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
               className="w-full lg:w-80 flex flex-col gap-6"
            >
               <motion.div whileHover={{ scale: 1.02 }} className="bg-gray-900 dark:bg-slate-800 rounded-xl p-6 text-white relative overflow-hidden shadow-lg cursor-pointer border border-gray-800 dark:border-slate-700">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6a00] blur-[50px] opacity-40 rounded-full translate-x-10 -translate-y-10"></div>
                  <div className="relative z-10">
                     <div className="flex justify-between items-start mb-6">
                        <div><p className="text-sm text-gray-300 font-medium uppercase">Membership</p><h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#ff6a00]">Gold Tier</h3></div>
                        <span className="material-icons text-yellow-400">workspace_premium</span>
                     </div>
                     <div className="mb-4">
                        <div className="flex justify-between items-end mb-2"><span className="text-3xl font-mono font-bold">2,450</span><span className="text-xs text-gray-400 mb-1">PTS</span></div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 1.5, ease: "circOut" }} className="bg-gradient-to-r from-yellow-400 to-[#ff6a00] h-1.5 rounded-full w-[70%]"></motion.div></div>
                        <p className="text-xs text-gray-400 mt-2 text-right">550 pts to Platinum</p>
                     </div>
                     <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-[#ff6a00] hover:bg-orange-600 py-3 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 transition-colors"><span className="material-icons text-sm">redeem</span> Spend Points</motion.button>
                  </div>
               </motion.div>
            </motion.div>
         </main>
      </div>

      <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="fixed bottom-6 right-6 z-50">
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="absolute bottom-full right-0 mb-4 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-4">
            <div className="flex items-start gap-3 mb-3">
               <div className="w-8 h-8 bg-[#ff6a00]/10 rounded-full flex items-center justify-center"><span className="material-icons text-[#ff6a00] text-sm">smart_toy</span></div>
               <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg rounded-tl-none text-sm text-gray-700 dark:text-gray-200">Hi Sarah! Do you want me to build a shopping list for your upcoming dinner party?</div>
            </div>
            <div className="flex gap-2 justify-end">
               <button className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Dismiss</button>
               <button className="text-xs font-medium bg-[#ff6a00] text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-orange-600">Yes, please</button>
            </div>
         </motion.div>
         <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-[#ff6a00] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform"><span className="material-icons text-2xl">chat_bubble</span></motion.button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
