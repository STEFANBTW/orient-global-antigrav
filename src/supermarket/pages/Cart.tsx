import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalCart } from '../../context/GlobalCartContext';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const Cart: React.FC<{ onNavigate?: (target: string) => void }> = ({ onNavigate }) => {
   const { cart, removeFromCart, updateQuantity, clearCart } = useGlobalCart();
   const { toast } = useToast();

   const [showCheckout, setShowCheckout] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const [customerForm, setCustomerForm] = useState({
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      customer_address: ''
   });

   const retailItems = cart.filter(i => i.division === 'market' && (!i.category || i.category !== 'Wholesale'));
   const wholesaleItems = cart.filter(i => i.division === 'market' && i.category === 'Wholesale');

   const retailSubtotal = retailItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
   const wholesaleSubtotal = wholesaleItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

   const logisticsFee = wholesaleSubtotal > 0 ? wholesaleSubtotal * 0.05 : 0;
   const standardDeliveryFee = retailSubtotal > 0 ? 2500 : 0;
   const grandTotal = retailSubtotal + wholesaleSubtotal + standardDeliveryFee + logisticsFee;

   const handleProceedToCheckout = () => {
      // Direct user to global checkout view
      if (onNavigate) {
         // In App.tsx currentView, we need 'checkout'
         // SupermarketWrapper might need to bubble this up or we use a global event/state
         // For now, if we are in SupermarketApp, we might need a way to reach the root setCurrentView
         window.dispatchEvent(new CustomEvent('switch-view', { detail: 'checkout' }));
      }
   };

   return (
      <div className="font-sans bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col transition-colors duration-300">
         <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className="material-icons text-[var(--color-accent-light)] text-3xl">shopping_basket</span>
                  <h1 className="text-2xl font-bold tracking-tight">
                     <span className="text-[var(--color-accent-light)]">ORIENT</span> <span className="text-slate-900 dark:text-white">SUPERMARKET</span>
                  </h1>
               </div>
               <div className="hidden md:flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[var(--color-accent-light)] font-semibold"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-accent-light)] text-white text-xs">1</span><span>Unified Cart</span></div>
                  <div className="w-12 h-px bg-gray-300 dark:bg-slate-700"></div>
                  <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500"><span className="flex items-center justify-center w-6 h-6 rounded-full border border-current text-xs">2</span><span>Logistics</span></div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400"><span className="material-icons text-lg">lock</span> Secure Checkout</div>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjK8VbctPE55JMw7nqwNvShkpVwmNprYXI9hjfvhQQAux7GEaiPr5VZxIBTVGxOrvzNSnivUlDUnp2w0i8Cp27U5Qzdx1g6R-brNs0iqiSPXloi1-Z571x48FchB5MN8siSRzwb0U3Z_SW4jWE5B66sSTUcLvDnuFffWuEvZbXHldKrQYtiMc2pYYL0_wuIGebEDO0NhfcWJ7_jDVgOky6Gn7JMPkp3D764Vsw_64KmBqKmpm7Ow3HFbqa8tj5NNgwtZJNADljfVKa" className="w-8 h-8 rounded-full object-cover" alt="User" />
               </div>
            </div>
         </header>

         <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between mb-2">
                     <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Shopping Cart <span className="text-gray-400 text-lg font-normal ml-2">({cart.length} Items)</span></h1>
                     <button onClick={clearCart} className="text-[var(--color-accent-light)] font-medium text-sm flex items-center gap-1"><span className="material-icons text-sm">delete_outline</span> Clear Cart</button>
                  </div>

                  {cart.length === 0 && (
                     <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                        <span className="material-icons text-6xl text-gray-200 dark:text-slate-600 mb-4">production_quantity_limits</span>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Your cart is empty.</p>
                     </div>
                  )}

                  {/* Retail Section */}
                  {retailItems.length > 0 && (
                     <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2"><span className="material-icons text-base">storefront</span> Retail Items</h3>
                        {retailItems.map((item) => (
                           <motion.div layout key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center">
                              <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-slate-700 overflow-hidden flex-shrink-0"><img src={item.image} className="w-full h-full object-cover" alt={item.name} /></div>
                              <div className="flex-grow min-w-0 w-full">
                                 <div className="flex justify-between items-start">
                                    <div><h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</h3></div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1"><span className="material-icons text-xl">close</span></button>
                                 </div>
                                 <div className="flex justify-between items-end mt-2">
                                    <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                                       <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-l-lg text-slate-600 dark:text-slate-300">-</button>
                                       <span className="w-10 text-center text-sm font-semibold text-slate-900 dark:text-white">{item.quantity}</span>
                                       <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-r-lg text-slate-600 dark:text-slate-300">+</button>
                                    </div>
                                    <div className="text-right">
                                       <span className="block text-xl font-bold text-slate-900 dark:text-white">₦{item.price.toLocaleString()}</span>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  )}

                  {/* Wholesale Section */}
                  {wholesaleItems.length > 0 && (
                     <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                        <h3 className="text-sm font-bold text-[var(--color-accent-light)] uppercase tracking-wider flex items-center gap-2"><span className="material-icons text-base">inventory_2</span> Wholesale / Bulk Items</h3>
                        {wholesaleItems.map((item) => (
                           <motion.div layout key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-orange-50/50 dark:bg-orange-900/10 rounded-xl p-4 shadow-sm border border-orange-100 dark:border-orange-900/30 flex flex-col sm:flex-row gap-4 items-center">
                              <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-slate-700 overflow-hidden flex-shrink-0 relative">
                                 <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                 <div className="absolute top-0 left-0 bg-[var(--color-accent-light)] text-white text-[10px] px-1 py-0.5 font-bold">BULK</div>
                              </div>
                              <div className="flex-grow min-w-0 w-full">
                                 <div className="flex justify-between items-start">
                                    <div><h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</h3><p className="text-sm text-gray-500 dark:text-gray-400">{item.unit} • {item.category}</p></div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1"><span className="material-icons text-xl">close</span></button>
                                 </div>
                                 <div className="flex justify-between items-end mt-2">
                                    <div className="flex items-center border border-orange-200 dark:border-orange-800/50 rounded-lg bg-white dark:bg-slate-800">
                                       <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-l-lg text-slate-600 dark:text-slate-300">-</button>
                                       <span className="w-12 text-center text-sm font-semibold text-slate-900 dark:text-white">{item.quantity}</span>
                                       <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-r-lg text-slate-600 dark:text-slate-300">+</button>
                                    </div>
                                    <div className="text-right">
                                       <span className="block text-xl font-bold text-slate-900 dark:text-white">₦{(item.price * item.quantity).toLocaleString()}</span>
                                       <span className="text-xs text-gray-500 dark:text-gray-400">Unit: ₦{item.price.toLocaleString()}</span>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  )}
               </div>

               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 sticky top-24 transition-colors duration-300">
                     <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Checkout Summary</h2>
                     <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Retail Subtotal</span><span>₦{retailSubtotal.toLocaleString()}</span></div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Wholesale Subtotal</span><span>₦{wholesaleSubtotal.toLocaleString()}</span></div>

                        {/* Dynamic Logistics Fee */}
                        {wholesaleSubtotal > 0 && (
                           <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                              <span>Freight Logistics</span>
                              <span>₦{(wholesaleSubtotal * 0.05).toLocaleString()}</span>
                           </div>
                        )}
                        {retailSubtotal > 0 && (
                           <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                              <span>Standard Delivery</span>
                              <span>₦2,500</span>
                           </div>
                        )}

                        <div className="border-t border-gray-200 dark:border-slate-700 pt-3 flex justify-between items-center"><span className="text-base font-bold text-slate-900 dark:text-white">Grand Total</span><span className="text-2xl font-bold text-slate-900 dark:text-white">₦{grandTotal.toLocaleString()}</span></div>
                     </div>
                     <button
                        onClick={handleProceedToCheckout}
                        disabled={cart.length === 0}
                        className="w-full bg-[var(--color-accent-light)] hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg py-3.5 rounded-xl shadow-lg transition-all transform active:scale-[0.98]">
                        Proceed to Checkout
                     </button>
                  </div>
               </div>
            </div>
         </main>

      </div>
   );
};

export default Cart;
