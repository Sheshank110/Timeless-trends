import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  isSearchOpen: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenu: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    setCartDrawer: (state, action) => {
      state.isCartDrawerOpen = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setSearch: (state, action) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { toggleMobileMenu, setMobileMenu, toggleCartDrawer, setCartDrawer, toggleSearch, setSearch } = uiSlice.actions;
export default uiSlice.reducer;
