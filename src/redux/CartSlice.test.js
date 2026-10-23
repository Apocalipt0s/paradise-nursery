import { describe, expect, it } from 'vitest';
import cartReducer, {
  addItem, incrementQuantity, decrementQuantity, removeItem,
  clearCart, selectCartCount, selectCartTotal,
} from './CartSlice.jsx';

const monstera = { id: 'monstera', name: 'Monstera Deliciosa', price: 45, image: '/plants/monstera.svg', category: 'tropical' };
const snake = { id: 'snake-plant', name: 'Snake Plant', price: 24, image: '/plants/snake-plant.svg', category: 'air-purifying' };
const wrap = (cart) => ({ cart });

describe('Paradise Nursery cart', () => {
  it('adds one plant with an initial quantity of 1', () => {
    const state = cartReducer(undefined, addItem(monstera));
    expect(state.items).toEqual([{ ...monstera, quantity: 1 }]);
    expect(selectCartCount(wrap(state))).toBe(1);
    expect(selectCartTotal(wrap(state))).toBe(45);
  });

  it('does not add the same plant twice from the product page', () => {
    const added = cartReducer(undefined, addItem(monstera));
    expect(cartReducer(added, addItem(monstera)).items).toHaveLength(1);
  });

  it('increments quantity, updates the badge and per-cart total', () => {
    const added = cartReducer(undefined, addItem(monstera));
    const updated = cartReducer(added, incrementQuantity('monstera'));
    expect(updated.items[0].quantity).toBe(2);
    expect(selectCartCount(wrap(updated))).toBe(2);
    expect(selectCartTotal(wrap(updated))).toBe(90);
  });

  it('decrements and removes an item when the last unit is removed', () => {
    const added = cartReducer(undefined, addItem(monstera));
    const twice = cartReducer(added, incrementQuantity('monstera'));
    const once = cartReducer(twice, decrementQuantity('monstera'));
    expect(once.items[0].quantity).toBe(1);
    expect(cartReducer(once, decrementQuantity('monstera')).items).toEqual([]);
  });

  it('calculates totals for different plants and supports deletion', () => {
    let state = cartReducer(undefined, addItem(monstera));
    state = cartReducer(state, addItem(snake));
    state = cartReducer(state, incrementQuantity('snake-plant'));
    expect(selectCartCount(wrap(state))).toBe(3);
    expect(selectCartTotal(wrap(state))).toBe(93);
    state = cartReducer(state, removeItem('monstera'));
    expect(selectCartTotal(wrap(state))).toBe(48);
    expect(cartReducer(state, clearCart()).items).toEqual([]);
  });

  it('ignores attempts to modify absent plants', () => {
    const initial = cartReducer(undefined, { type: 'init' });
    expect(cartReducer(initial, incrementQuantity('not-found'))).toEqual(initial);
    expect(cartReducer(initial, decrementQuantity('not-found'))).toEqual(initial);
  });
});
