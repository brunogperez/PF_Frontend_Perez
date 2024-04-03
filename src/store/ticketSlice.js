import { createSlice } from '@reduxjs/toolkit'

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState: {
        tickets: null,
    },
    reducers: {
        onTickets: (state, { payload }) => {
            state.tickets = payload
 
        },
    },
})

export const { onTickets } = ticketSlice.actions