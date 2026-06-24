import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  ReactNode,
  useSyncExternalStore,
} from 'react';
import { CartItem, CartState } from '../types';


type Listener = () => void;

function createCartStore() {
  let state: CartState = { items: {}, totalCount: 0 };
  const listeners = new Set<Listener>();

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = (): CartState => state;

  const emit = () => listeners.forEach((l) => l());

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existing = state.items[item.productId];
    const next: CartState = {
      items: {
        ...state.items,
        [item.productId]: existing
          ? { ...existing, quantity: existing.quantity + 1 }
          : { ...item, quantity: 1 },
      },
      totalCount: state.totalCount + 1,
    };
    state = next;
    emit();
  };

  const removeFromCart = (productId: string) => {
    const existing = state.items[productId];
    if (!existing) return;
    const nextItems = { ...state.items };
    if (existing.quantity <= 1) {
      delete nextItems[productId];
    } else {
      nextItems[productId] = { ...existing, quantity: existing.quantity - 1 };
    }
    state = { items: nextItems, totalCount: Math.max(0, state.totalCount - 1) };
    emit();
  };

  const getItemCount = (productId: string): number =>
    state.items[productId]?.quantity ?? 0;

  return { subscribe, getSnapshot, addToCart, removeFromCart, getItemCount };
}

const cartStore = createCartStore();

interface CartContextValue {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  getItemCount: (productId: string) => number;
}

const CartContext = createContext<CartContextValue>({
  addToCart: () => {},
  removeFromCart: () => {},
  getItemCount: () => 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const addToCart = useCallback(cartStore.addToCart, []);
  const removeFromCart = useCallback(cartStore.removeFromCart, []);
  const getItemCount = useCallback(cartStore.getItemCount, []);

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartState = (): CartState =>
  useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot);

export const useProductCartCount = (productId: string): number => {
  const snapshot = useCallback(
    () => cartStore.getSnapshot().items[productId]?.quantity ?? 0,
    [productId],
  );
  return useSyncExternalStore(cartStore.subscribe, snapshot);
};

export const useCartActions = (): CartContextValue => useContext(CartContext);
