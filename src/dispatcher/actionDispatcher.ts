import { Alert, Linking } from 'react-native';
import { Action, ActionType, CartItem } from '../types';

interface DispatcherDependencies {
  addToCart?: (item: Omit<CartItem, 'quantity'>) => void;
  productMeta?: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

const handlers: Partial<
  Record<ActionType, (action: Action, deps: DispatcherDependencies) => void>
> = {
  ADD_TO_CART: (action, deps) => {
    const { id } = action.payload;
    if (!id || !deps.addToCart || !deps.productMeta) {
      console.warn('[ActionDispatcher] ADD_TO_CART missing required deps', action);
      return;
    }
    deps.addToCart({
      productId: id,
      name: deps.productMeta.name,
      price: deps.productMeta.price,
      imageUrl: deps.productMeta.imageUrl,
    });
  },

  DEEP_LINK: (action) => {
    const { url } = action.payload;
    if (!url) return;
    console.log('[ActionDispatcher] DEEP_LINK →', url);
    Alert.alert('Navigation', `Navigating to: ${url}`);
  },

  OPEN_CATEGORY: (action) => {
    const { categoryId, url } = action.payload;
    console.log('[ActionDispatcher] OPEN_CATEGORY →', categoryId ?? url);
    Alert.alert('Category', `Opening: ${categoryId ?? url}`);
  },

  APPLY_MYSTERY_GIFT_COUPON: (action) => {
    const { couponCode } = action.payload;
    console.log('[ActionDispatcher] APPLY_MYSTERY_GIFT_COUPON →', couponCode);
    Alert.alert('🎁 Mystery Gift!', `Coupon applied: ${couponCode}`);
  },

  BOOK_EVENT: (action) => {
    const { eventId } = action.payload;
    console.log('[ActionDispatcher] BOOK_EVENT →', eventId);
    Alert.alert('Event Booking', `Booking event: ${eventId}`);
  },

  OPEN_PRODUCT_DETAIL: (action) => {
    const { id } = action.payload;
    console.log('[ActionDispatcher] OPEN_PRODUCT_DETAIL →', id);
  },
};

export function handleAction(
  action: Action | null | undefined,
  deps: DispatcherDependencies = {},
): void {
  if (!action?.type) {
    console.warn('[ActionDispatcher] Received null or malformed action');
    return;
  }

  const handler = handlers[action.type as ActionType];

  if (!handler) {
    console.warn(`[ActionDispatcher] Unhandled action type: "${action.type}"`, action);
    return;
  }

  try {
    handler(action, deps);
  } catch (err) {
    console.error('[ActionDispatcher] Error executing action:', action.type, err);
  }
}
