import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx';

const STORAGE_KEY = 'paradise-nursery-cart-v1';

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    if (!Array.isArray(parsed)) return undefined;
    return {
      cart: {
        items: parsed.filter((item) =>
          item && typeof item.id === 'string' &&
          typeof item.name === 'string' &&
          Number.isFinite(item.price) && item.price >= 0 &&
          Number.isInteger(item.quantity) && item.quantity > 0
        ),
      },
    };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState: loadCart(),
});

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().cart.items));
  } catch {
    // Storage may be unavailable (private browsing, quota, or strict policies).
  }
});
