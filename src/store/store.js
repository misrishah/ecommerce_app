// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export default store;
