// src/store/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistItems.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
    },
    toggleWishlist: (state, action) => {
      const exists = state.wishlistItems.find(item => item.id === action.payload.id);
      if (exists) {
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
      } else {
        state.wishlistItems.push(action.payload);
      }
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist  // ✅ Exported here
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
