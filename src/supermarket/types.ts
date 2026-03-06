export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  context: 'RETAIL' | 'WHOLESALE';
  image: string;
  tag?: string;
  tagColor?: string;
  unit?: string;
  oldPrice?: number;
  stock?: number;
  tierInfo?: string;
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  retailSubtotal: number;
  wholesaleSubtotal: number;
}
