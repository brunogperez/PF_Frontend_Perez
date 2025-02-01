import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { productSlice } from './productSlice'
import { cartSlice } from './cartSlice'
import { ticketSlice } from './ticketSlice'
import { messageSlice } from './messageSlice'



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productSlice.reducer,
        cart: cartSlice.reducer,
        ticket: ticketSlice.reducer,
        messages: messageSlice.reducer,
    },
    
})