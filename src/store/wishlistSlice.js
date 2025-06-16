// src/store/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.wishlistItems.find(i => i.id === action.payload.id);
      if (exists) {
        state.wishlistItems = state.wishlistItems.filter(i => i.id !== action.payload.id);
      } else {
        state.wishlistItems.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
