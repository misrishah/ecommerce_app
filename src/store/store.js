// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import productReducer from './productSlice'; // if used
import categoryReducer from './categorySlice'; // if used
import authReducer from './authSlice'; // if used

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    product: productReducer,
    category: categoryReducer,
    auth: authReducer
  }
});

export default store;
