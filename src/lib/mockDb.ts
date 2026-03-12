/**
 * Mock Database for Orient Project
 * Persists data to localStorage for session-to-session continuity.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, this would be hashed
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

const STORAGE_KEYS = {
  USERS: 'orient_mock_users',
  CURRENT_USER: 'orient_mock_current_user',
  CART: 'orient_mock_cart',
  TRANSACTIONS: 'orient_mock_transactions',
};

// Initial data for testing
const INITIAL_USERS: User[] = [
  { id: '1', name: 'Admin Boss', email: 'ceo@og.com', password: 'boss' },
];

export const mockDb = {
  // --- Auth ---
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(data);
  },

  register: (user: Omit<User, 'id'>): User => {
    const users = mockDb.getUsers();
    const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  login: (email: string, password: string): User | null => {
    const users = mockDb.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  // --- Cart ---
  getCart: (): CartItem[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    return data ? JSON.parse(data) : [];
  },

  updateCart: (items: CartItem[]) => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  },

  addToCart: (item: CartItem) => {
    const cart = mockDb.getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    mockDb.updateCart(cart);
  },

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEYS.CART);
  },

  // --- Transactions ---
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },

  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>): Transaction => {
    const transactions = mockDb.getTransactions();
    const newTransaction: Transaction = {
      ...transaction,
      id: `TRX-${Math.random().toString(36).toUpperCase().substr(2, 6)}`,
      date: new Date().toISOString(),
      status: 'completed',
    };
    transactions.push(newTransaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    return newTransaction;
  },
};
