import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    addToWishlist: (state, action) => {
      const exists = state.items.find((item) => item._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setWishlistLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist, setWishlistLoading } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (productId) => (state) =>
  state.wishlist.items.some((item) => item._id === productId);
