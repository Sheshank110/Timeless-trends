import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { items, subtotal, shipping, tax, total } = action.payload;
      state.items = items;
      state.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      state.subtotal = subtotal || 0;
      state.shipping = shipping || 0;
      state.tax = tax || 0;
      state.total = total || 0;
      state.isLoading = false;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingIndex = state.items.findIndex(
        (i) => i.product === item.product && i.size === item.size && i.color === item.color
      );
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    updateCartItem: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex((item) => item._id === id);
      if (index >= 0) {
        state.items[index] = { ...state.items[index], ...updates };
      }
      state.totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.shipping = 0;
      state.tax = 0;
      state.total = 0;
    },
    setCartLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateCartItem, clearCart, setCartLoading } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartCount = (state) => state.cart.totalItems;
