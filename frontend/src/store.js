import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/slices/productSlice';
import paginationReducer from './features/slices/paginationSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    pagination: paginationReducer
  },
});