import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalCart } from '../../context/GlobalCartContext';

export const CheckoutPage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { cart, cartTotal, placeOrder } = useGlobalCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) return;
    setIsProcessing(true);
    
    const success = await placeOrder(customerDetails);

    setIsProcessing(false);
    if (success) {
      onComplete();
    }
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-[var(--bakery-heading)] mb-4">Your cart is empty</h2>
        <p className="text-[var(--bakery-text-muted)]">Add some delicious items from the bakery to get started.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-[var(--bakery-heading)] mb-10 tracking-tight">Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--bakery-card-bg)] rounded-3xl border border-[var(--bakery-card-border)] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[var(--bakery-heading)] mb-6 flex items-center gap-2">
              <span className="material-icons text-primary">shopping_basket</span> Review Items
            </h3>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-[var(--bakery-card-border)] last:border-0">
                  <div>
                    <div className="font-bold text-[var(--bakery-heading)]">{item.name}</div>
                    <div className="text-xs text-[var(--bakery-text-muted)]">{item.quantity} x ₦{item.price.toLocaleString()}</div>
                  </div>
                  <div className="font-bold text-[var(--bakery-heading)]">₦{(item.quantity * item.price).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <form id="checkout-form" onSubmit={handleCheckout} className="bg-[var(--bakery-card-bg)] rounded-3xl border border-[var(--bakery-card-border)] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[var(--bakery-heading)] mb-6 flex items-center gap-2">
              <span className="material-icons text-primary">local_shipping</span> Delivery Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest pl-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={customerDetails.name}
                  onChange={e => setCustomerDetails({...customerDetails, name: e.target.value})}
                  className="w-full bg-[var(--bakery-bg)] border border-[var(--bakery-card-border)] rounded-2xl p-3.5 text-sm text-[var(--bakery-text)] focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest pl-1">Email Address</label>
                <input
                  type="email"
                  value={customerDetails.email}
                  onChange={e => setCustomerDetails({...customerDetails, email: e.target.value})}
                  className="w-full bg-[var(--bakery-bg)] border border-[var(--bakery-card-border)] rounded-2xl p-3.5 text-sm text-[var(--bakery-text)] focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest pl-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  value={customerDetails.phone}
                  onChange={e => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  className="w-full bg-[var(--bakery-bg)] border border-[var(--bakery-card-border)] rounded-2xl p-3.5 text-sm text-[var(--bakery-text)] focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="0801 234 5678"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--bakery-text-muted)] uppercase tracking-widest pl-1">Delivery Address *</label>
                <input
                  required
                  type="text"
                  value={customerDetails.address}
                  onChange={e => setCustomerDetails({...customerDetails, address: e.target.value})}
                  className="w-full bg-[var(--bakery-bg)] border border-[var(--bakery-card-border)] rounded-2xl p-3.5 text-sm text-[var(--bakery-text)] focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="123 Luxury Ave, Jos"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[var(--bakery-card-bg)] to-[var(--bakery-bg-soft)] p-8 rounded-3xl border border-[var(--bakery-card-border)] shadow-2xl sticky top-24">
            <h3 className="text-xl font-bold text-[var(--bakery-heading)] mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-[var(--bakery-text-muted)] font-medium">
                <span>Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-[var(--bakery-text-muted)] font-medium">
                <span>Delivery</span>
                <span className="text-emerald-500 font-bold">FREE</span>
              </div>
              <div className="h-px bg-[var(--bakery-card-border)] my-4"></div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--bakery-text)]">Grand Total</span>
                <span className="text-3xl font-black text-[var(--bakery-heading)] tracking-tighter">₦{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all transform active:scale-95 flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Complete Purchase <span className="material-icons text-lg">arrow_forward</span>
                </>
              )}
            </button>
            <p className="mt-4 text-[10px] text-center text-[var(--bakery-text-muted)] font-medium uppercase tracking-[0.2em] opacity-60">
              Secure Transaction • Orient Pay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
