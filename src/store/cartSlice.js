import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
  },
  reducers: {
    onCart: (state, { payload }) => {
      state.cart = payload;
    },
  },
});

export const { onCart } = cartSlice.actions;
