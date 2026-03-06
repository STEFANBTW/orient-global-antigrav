import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../data/mockDb';
import { Product } from '../types';

const Wholesale: React.FC = () => {
  const { addToCart, cart } = useCart();
  
  // Local state for filters
  const [skuSearch, setSkuSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showStockOnly, setShowStockOnly] = useState(true);

  // Local state for quantities in the table before adding
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Get all wholesale items
  const allWholesaleItems = MOCK_PRODUCTS.filter(p => p.context === 'WHOLESALE');
  
  // Dynamic categories for filter dropdown
  const categories = ['All', ...Array.from(new Set(allWholesaleItems.map(i => i.category)))];

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return allWholesaleItems.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(skuSearch.toLowerCase()) || 
                          item.id.toLowerCase().includes(skuSearch.toLowerCase());
      const matchCategory = filterCategory === 'All' || item.category === filterCategory;
      const matchStock = showStockOnly ? (item.stock || 0) > 0 : true;

      return matchSearch && matchCategory && matchStock;
    });
  }, [allWholesaleItems, skuSearch, filterCategory, showStockOnly]);

  const updateLocalQty = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] ?? 1;
      return { ...prev, [id]: Math.max(1, current + delta) };
    });
  };

  const getQty = (id: string) => quantities[id] ?? 1;

  const handleAddToOrder = (item: Product) => {
     addToCart(item, getQty(item.id));
  };

  const handleExport = () => {
    alert("Starting download: Orient_Wholesale_Catalog_v2.csv");
  };

  return (
    <div className="font-sans bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-12 sm:top-14 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 h-14 flex items-center px-6 shadow-sm justify-between max-w-[1600px] w-full mx-auto transition-colors duration-300">
        <div className="flex items-center gap-2 shrink-0">
          <span className="material-icons text-[#ff6a00] text-2xl">shopping_basket</span>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-[#ff6a00]">ORIENT</span> <span className="text-slate-900 dark:text-white">WHOLESALE</span>
          </h1>
        </div>
        
        <div className="flex-1 max-w-2xl mx-10 hidden lg:block">
           <div className="relative w-full">
             <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none material-icons text-slate-400">qr_code_scanner</span>
             <input 
               type="text" 
               className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:ring-[#ff6a00] focus:border-[#ff6a00] text-slate-900 dark:text-white" 
               placeholder="Quick Add by SKU # or Name" 
               value={skuSearch}
               onChange={(e) => setSkuSearch(e.target.value)}
             />
           </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
           <div className="text-right hidden sm:block">
             <p className="text-xs text-slate-500 dark:text-slate-400">Account Status</p>
             <div className="flex items-center gap-1 justify-end">
               <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span>
               <span className="text-sm font-semibold text-[#ff6a00]">Platinum Tier</span>
             </div>
           </div>
           <motion.div whileHover={{ scale: 1.1 }} className="h-10 w-10 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center font-bold cursor-pointer">JD</motion.div>
        </div>
      </header>

      <div className="flex flex-1">
        <main className="flex-1 flex flex-col">
           {/* Banner */}
           <div className="shrink-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 relative overflow-hidden transition-colors duration-300">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="relative z-10 flex justify-between items-center">
                <div>
                   <h2 className="text-xl font-bold mb-0.5 text-slate-900 dark:text-white">Scale Your Business</h2>
                   <p className="text-slate-500 text-xs">Exclusive bulk pricing for registered partners.</p>
                </div>
                <div className="flex gap-2">
                   <motion.button 
                     whileTap={{ scale: 0.95 }} 
                     onClick={handleExport}
                     className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
                     title="Download inventory as CSV for your records"
                   >
                     <span className="material-icons text-base">download</span> Export Catalog
                   </motion.button>
                   <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-3 py-1.5 bg-[#ff6a00] text-white rounded-lg text-xs font-medium hover:bg-orange-600 shadow-sm transition-colors">
                     <span className="material-icons text-base">upload_file</span> Upload CSV
                   </motion.button>
                </div>
              </div>
           </div>

           {/* Toolbar */}
           <div className="shrink-0 px-6 py-2 bg-slate-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 flex items-center gap-4 transition-colors duration-300">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Filter By:</span>
              <select 
                className="text-xs py-1.5 pl-3 pr-8 rounded border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 focus:ring-[#ff6a00]"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="h-4 w-px bg-gray-300 dark:bg-slate-700 mx-2"></div>
              <label className="flex items-center gap-2 cursor-pointer">
                 <input 
                    type="checkbox" 
                    className="rounded text-[#ff6a00] focus:ring-[#ff6a00] border-gray-300 dark:border-slate-700 dark:bg-slate-800" 
                    checked={showStockOnly}
                    onChange={(e) => setShowStockOnly(e.target.checked)}
                 />
                 <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Show Stock Only</span>
              </label>
              <div className="ml-auto text-xs text-slate-500">Showing <strong>{filteredItems.length}</strong> products</div>
           </div>

           {/* Table */}
           <div className="flex-1 bg-white dark:bg-slate-900 transition-colors duration-300">
              <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50 dark:bg-slate-800 sticky top-30 sm:top-34 z-20 shadow-sm transition-colors duration-300">
                   <tr>
                     {['Img', 'SKU', 'Product Name', 'Unit', 'Stock', 'Base Price'].map(h => (
                       <th key={h} className="py-2 px-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                     ))}
                     {/* Specific header for Tiered Pricing Explanation */}
                     <th className="py-2 px-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider group cursor-help relative">
                        <div className="flex items-center gap-1">
                            Tiered Pricing
                            <span className="material-icons text-[12px] text-slate-400" title="Buy more, save more! Bulk discounts apply automatically.">help_outline</span>
                        </div>
                     </th>
                     {['Qty', 'Total', 'Action'].map(h => (
                       <th key={h} className="py-2 px-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-xs">
                   <AnimatePresence>
                   {filteredItems.map((item, idx) => (
                     <motion.tr 
                        layout
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-colors"
                     >
                        <td className="py-1.5 px-3 text-center">
                          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-slate-700 overflow-hidden mx-auto">
                            <img src={item.image} className="w-full h-full object-cover" alt={item.name}/>
                          </div>
                        </td>
                        <td className="py-1.5 px-3 font-mono text-slate-500 dark:text-slate-400">{item.id.substring(0,6)}</td>
                        <td className="py-1.5 px-3">
                           <div className="font-medium text-slate-900 dark:text-white">{item.name}</div>
                           <div className="text-[10px] text-slate-500">{item.category}</div>
                        </td>
                        <td className="py-1.5 px-3 text-slate-600 dark:text-slate-400">{item.unit}</td>
                        <td className="py-1.5 px-3">
                           <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${(item.stock || 0) < 50 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 'bg-green-100 dark:bg-slate-900 text-green-800 dark:text-green-200'}`}>
                              {item.stock}
                           </span>
                        </td>
                        <td className="py-1.5 px-3 font-medium text-slate-900 dark:text-white">₦{item.price.toLocaleString()}</td>
                        
                        {/* Tiered Pricing Badge with Tooltip logic */}
                        <td className="py-1.5 px-3">
                            <span 
                                title={item.tierInfo?.includes('%') ? "Volume discount available for this item" : "Standard wholesale rate"}
                                className="px-1.5 py-0.5 rounded bg-[#ff6a00]/10 text-[#ff6a00] text-[10px] font-bold border border-[#ff6a00]/20 cursor-help"
                            >
                                {item.tierInfo || 'Std'}
                            </span>
                        </td>
                        
                        <td className="py-1.5 px-3 text-center">
                           <div className="flex items-center justify-center border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 max-w-[90px] mx-auto">
                              <button onClick={() => updateLocalQty(item.id, -1)} className="px-1.5 py-0.5 text-slate-400 hover:text-[#ff6a00] hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">-</button>
                              <input type="number" className="w-10 text-center text-xs border-0 focus:ring-0 p-0 bg-transparent text-slate-900 dark:text-white" value={getQty(item.id)} readOnly/>
                              <button onClick={() => updateLocalQty(item.id, 1)} className="px-1.5 py-0.5 text-slate-400 hover:text-[#ff6a00] hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">+</button>
                           </div>
                        </td>
                        <td className="py-1.5 px-3 text-right font-bold text-slate-900 dark:text-white">₦{(item.price * getQty(item.id)).toLocaleString()}</td>
                        <td className="py-1.5 px-3 text-center">
                            <button onClick={() => handleAddToOrder(item)} className="text-[#ff6a00] hover:bg-[#ff6a00] hover:text-white px-2 py-1 rounded transition-colors font-bold text-[10px] uppercase border border-[#ff6a00]">Add</button>
                        </td>
                     </motion.tr>
                   ))}
                   </AnimatePresence>
                 </tbody>
              </table>
           </div>
        </main>
        
        {/* Sidebar Cart - Connected to Global Context */}
        <motion.aside 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="w-80 bg-slate-100 dark:bg-slate-950 border-l border-gray-200 dark:border-slate-800 flex flex-col shadow-xl z-30 transition-colors duration-300 sticky top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]"
        >
           <div className="p-4 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex justify-between items-center mb-1">
                 <h3 className="font-bold text-base text-slate-900 dark:text-white">Current Order</h3>
                 <span className="text-[9px] font-mono text-slate-400">#SESSION-ACTIVE</span>
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse"></span> Live Sync
              </div>
           </div>
           
           <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {cart.items.filter(i => i.context === 'WHOLESALE').length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-10">No wholesale items in cart.</p>
              ) : (
                  cart.items.filter(i => i.context === 'WHOLESALE').map(item => (
                      <div key={item.cartId} className="bg-white dark:bg-slate-800 p-2.5 rounded shadow-sm border border-gray-200 dark:border-slate-700">
                          <div className="flex justify-between items-start mb-0.5">
                              <span className="font-semibold text-xs line-clamp-1 text-slate-900 dark:text-white">{item.name}</span>
                              <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-gray-400">
                              <span>{item.quantity} x {item.unit}</span>
                              <span className="bg-gray-100 dark:bg-slate-700 px-1 py-0.5 rounded">{item.tierInfo || 'Standard'}</span>
                          </div>
                      </div>
                  ))
              )}
           </div>

           <div className="p-4 space-y-3 border-t border-gray-200 dark:border-slate-800">
              <div className="bg-slate-200 dark:bg-slate-800 rounded p-3 border border-slate-300 dark:border-slate-700">
                 <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 flex items-center gap-1"><span className="material-icons text-xs">local_shipping</span> Logistics Estimation</div>
                 <div className="grid grid-cols-2 gap-3 mb-2">
                    <div><div className="text-[9px] text-slate-500 dark:text-slate-400 uppercase">Total Weight</div><div className="text-base font-bold text-slate-900 dark:text-white">{(cart.items.filter(i => i.context === 'WHOLESALE').length * 20 + 50).toFixed(0)} kg</div></div>
                    <div><div className="text-[9px] text-slate-500 dark:text-slate-400 uppercase">Est. Pallets</div><div className="text-base font-bold text-slate-900 dark:text-white">{Math.ceil(cart.items.filter(i => i.context === 'WHOLESALE').length / 10)}</div></div>
                 </div>
              </div>

              <div className="flex justify-between items-end">
                 <span className="text-sm font-bold text-slate-900 dark:text-white">Wholesale Total</span>
                 <span className="text-xl font-bold text-[#ff6a00]">${cart.wholesaleSubtotal.toFixed(2)}</span>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#ff6a00] hover:bg-orange-600 text-white font-bold py-2.5 rounded shadow-lg flex items-center justify-center gap-2 transition-colors text-xs">
                 Proceed to Logistics <span className="material-icons text-xs">arrow_forward</span>
              </motion.button>
           </div>
        </motion.aside>
      </div>
    </div>
  );
};

export default Wholesale;