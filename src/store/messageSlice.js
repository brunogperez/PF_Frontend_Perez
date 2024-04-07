import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: null,
  },
  reducers: {
    onMessages: (state, { payload }) => {
      state.messages = payload
    },
  },
})


export const { onMessages } = messageSlice.actions