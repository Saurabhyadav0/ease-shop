
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
  items: [],
  
  addItem: (product: Product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      return {
        items: state.items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        items: [...state.items, { ...product, quantity: 1 }]
      };
    }
  }),
  
  removeItem: (productId: number) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),
  
  updateQuantity: (productId: number, quantity: number) => set((state) => ({
    items: state.items.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(1, quantity) } 
        : item
    )
  })),
  
  clearCart: () => set({ items: [] }),
  
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  totalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));

export default useCartStore;
