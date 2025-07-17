import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    cartCount: 0,
    wishlistCount: 0,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateCartCount(state, action) {
      state.cartCount = action.payload;
    },
    updateWishlistCount(state, action) {
      state.wishlistCount = action.payload;
    },
  },
});

export const { login, logout, updateCartCount, updateWishlistCount } = authSlice.actions;
export default authSlice.reducer;
