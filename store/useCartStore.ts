import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const useCartStore = create<CartState>((set, get) => ({
  // Load cart items from localStorage on initialization
  items: typeof window !== 'undefined' && localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || '[]')
    : [],

  addItem: (product: Product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    let updatedItems;
    if (existingItem) {
      updatedItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [...state.items, { ...product, quantity: 1 }];
    }

    // Save updated items to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    return { items: updatedItems };
  }),

  removeItem: (productId: number) => set((state) => {
    const updatedItems = state.items.filter(item => item.id !== productId);
    // Save updated items to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    return { items: updatedItems };
  }),

  updateQuantity: (productId: number, quantity: number) => set((state) => {
    const updatedItems = state.items.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    // Save updated items to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    return { items: updatedItems };
  }),

  clearCart: () => set(() => {
    // Clear the cart and localStorage
    localStorage.removeItem('cart');
    return { items: [] };
  }),

  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  totalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));

export default useCartStore;
