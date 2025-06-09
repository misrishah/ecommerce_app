// src/store/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await axios.get('https://fakestoreapi.com/products/categories');
  return res.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default categorySlice.reducer;
