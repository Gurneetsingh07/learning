import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: {products: [], totalItems: 0} };

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
        state.value.products = action.payload.products;
        if (action.payload.totalItems !== undefined) {
          state.value.totalItems =  action.payload.totalItems
        }
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;