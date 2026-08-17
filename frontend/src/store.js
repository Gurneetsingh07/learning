import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/slices/productSlice';
import paginationReducer from './features/slices/paginationSlice';
import cartReducer from './features/slices/cartSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    pagination: paginationReducer,
    cart: cartReducer
  },
});