import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    thinking: false,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    setThinking: (state, action) => {
      state.thinking = action.payload;
    },
  },
});

export const { setMessages, addMessages, setThinking } = messageSlice.actions;
export default messageSlice.reducer;
