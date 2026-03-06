import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  // Separation of concerns for display
  const retailItems = cart.items.filter(i => i.context === 'RETAIL');
  const wholesaleItems = cart.items.filter(i => i.context === 'WHOLESALE');

  return (
    <div className="font-sans bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col transition-colors duration-300">
       <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <span className="material-icons text-[#ff6a00] text-3xl">shopping_basket</span>
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="text-[#ff6a00]">ORIENT</span> <span className="text-slate-900 dark:text-white">SUPERMARKET</span>
                </h1>
             </div>
             <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-[#ff6a00] font-semibold"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff6a00] text-white text-xs">1</span><span>Unified Cart</span></div>
                <div className="w-12 h-px bg-gray-300 dark:bg-slate-700"></div>
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500"><span className="flex items-center justify-center w-6 h-6 rounded-full border border-current text-xs">2</span><span>Logistics</span></div>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400"><span className="material-icons text-lg">lock</span> Secure Checkout</div>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjK8VbctPE55JMw7nqwNvShkpVwmNprYXI9hjfvhQQAux7GEaiPr5VZxIBTVGxOrvzNSnivUlDUnp2w0i8Cp27U5Qzdx1g6R-brNs0iqiSPXloi1-Z571x48FchB5MN8siSRzwb0U3Z_SW4jWE5B66sSTUcLvDnuFffWuEvZbXHldKrQYtiMc2pYYL0_wuIGebEDO0NhfcWJ7_jDVgOky6Gn7JMPkp3D764Vsw_64KmBqKmpm7Ow3HFbqa8tj5NNgwtZJNADljfVKa" className="w-8 h-8 rounded-full object-cover" alt="User"/>
             </div>
          </div>
       </header>

       <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Shopping Cart <span className="text-gray-400 text-lg font-normal ml-2">({cart.items.length} Items)</span></h1>
                   <button onClick={clearCart} className="text-[#ff6a00] font-medium text-sm flex items-center gap-1"><span className="material-icons text-sm">delete_outline</span> Clear Cart</button>
                </div>

                {cart.items.length === 0 && (
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
                      <motion.div layout key={item.cartId} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center">
                         <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-slate-700 overflow-hidden flex-shrink-0"><img src={item.image} className="w-full h-full object-cover" alt={item.name}/></div>
                         <div className="flex-grow min-w-0 w-full">
                            <div className="flex justify-between items-start">
                               <div><h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</h3></div>
                               <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500 p-1"><span className="material-icons text-xl">close</span></button>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                               <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
                                  <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-l-lg text-slate-600 dark:text-slate-300">-</button>
                                  <span className="w-10 text-center text-sm font-semibold text-slate-900 dark:text-white">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-r-lg text-slate-600 dark:text-slate-300">+</button>
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
                   <h3 className="text-sm font-bold text-[#ff6a00] uppercase tracking-wider flex items-center gap-2"><span className="material-icons text-base">inventory_2</span> Wholesale / Bulk Items</h3>
                   {wholesaleItems.map((item) => (
                      <motion.div layout key={item.cartId} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-orange-50/50 dark:bg-orange-900/10 rounded-xl p-4 shadow-sm border border-orange-100 dark:border-orange-900/30 flex flex-col sm:flex-row gap-4 items-center">
                         <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-slate-700 overflow-hidden flex-shrink-0 relative">
                             <img src={item.image} className="w-full h-full object-cover" alt={item.name}/>
                             <div className="absolute top-0 left-0 bg-[#ff6a00] text-white text-[10px] px-1 py-0.5 font-bold">BULK</div>
                         </div>
                         <div className="flex-grow min-w-0 w-full">
                            <div className="flex justify-between items-start">
                               <div><h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</h3><p className="text-sm text-gray-500 dark:text-gray-400">{item.unit} • {item.tierInfo}</p></div>
                               <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500 p-1"><span className="material-icons text-xl">close</span></button>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                               <div className="flex items-center border border-orange-200 dark:border-orange-800/50 rounded-lg bg-white dark:bg-slate-800">
                                  <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-l-lg text-slate-600 dark:text-slate-300">-</button>
                                  <span className="w-12 text-center text-sm font-semibold text-slate-900 dark:text-white">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-r-lg text-slate-600 dark:text-slate-300">+</button>
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
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Retail Subtotal</span><span>₦{cart.retailSubtotal.toLocaleString()}</span></div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Wholesale Subtotal</span><span>₦{cart.wholesaleSubtotal.toLocaleString()}</span></div>
                      
                      {/* Dynamic Logistics Fee */}
                      {cart.wholesaleSubtotal > 0 && (
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                              <span>Freight Logistics</span>
                              <span>₦{(cart.wholesaleSubtotal * 0.05).toLocaleString()}</span>
                          </div>
                      )}
                      {cart.retailSubtotal > 0 && (
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                              <span>Standard Delivery</span>
                              <span>₦2,500</span>
                          </div>
                      )}
                      
                      <div className="border-t border-gray-200 dark:border-slate-700 pt-3 flex justify-between items-center"><span className="text-base font-bold text-slate-900 dark:text-white">Grand Total</span><span className="text-2xl font-bold text-slate-900 dark:text-white">₦{(cart.total + (cart.retailSubtotal > 0 ? 2500 : 0) + (cart.wholesaleSubtotal * 0.05)).toLocaleString()}</span></div>
                   </div>
                   <button className="w-full bg-[#ff6a00] hover:bg-orange-600 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg transition-all transform active:scale-[0.98]">Place Order</button>
                </div>
             </div>
          </div>
       </main>
    </div>
  );
};

export default Cart;
