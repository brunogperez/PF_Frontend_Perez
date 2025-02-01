import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    onMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages = [payload, ...state.messages]; 
    },
  },
});

export const { onMessages, addMessage } = messageSlice.actions;
