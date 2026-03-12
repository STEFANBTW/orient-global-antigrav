import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  division: 'bakery' | 'market' | 'water' | 'dining' | 'lounge' | 'games';
  unit?: string;
  tier_info?: string;
}

interface GlobalCartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  placeOrder: (customerDetails: { name: string; email: string; phone?: string; address?: string }) => Promise<boolean>;
}

const GlobalCartContext = createContext<GlobalCartContextType | undefined>(undefined);

export const GlobalCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('orient_global_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orient_global_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your unified cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: Math.max(0, quantity) } : i).filter(i => i.quantity > 0));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = async (customerDetails: { 
    name: string; 
    email: string;
    phone?: string;
    address?: string;
  }) => {
    try {
      if (cart.length === 0) return false;

      // Group cart items by division
      const divisionsInCart = Array.from(new Set(cart.map(item => item.division)));

      for (const division of divisionsInCart) {
        const divisionItems = cart.filter(item => item.division === division);
        const subtotal = divisionItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const { error } = await supabase
          .from('unified_orders')
          .insert({
            customer_name: customerDetails.name,
            customer_email: customerDetails.email,
            customer_phone: customerDetails.phone,
            customer_address: customerDetails.address,
            items: divisionItems,
            total: subtotal, // This would be subtotal + division-specific delivery fee
            subtotal: subtotal,
            division: division || 'bakery', // Fallback to bakery if missing
            status: 'pending'
          });

        if (error) throw error;
      }

      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Your order(s) have been sent to the respective divisions.",
      });
      return true;
    } catch (error: any) {
      console.error('Order placement error:', error);
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: error.message || "There was an error placing your order.",
      });
      return false;
    }
  };

  return (
    <GlobalCartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, placeOrder
    }}>
      {children}
    </GlobalCartContext.Provider>
  );
};

export const useGlobalCart = () => {
  const context = useContext(GlobalCartContext);
  if (context === undefined) {
    throw new Error('useGlobalCart must be used within a GlobalCartProvider');
  }
  return context;
};
