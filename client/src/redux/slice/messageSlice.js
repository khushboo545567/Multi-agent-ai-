import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    thinking: false,
    artifacts: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    setArtifacts: (state, action) => {
      state.artifacts = action.payload;
    },
    setThinking: (state, action) => {
      state.thinking = action.payload;
    },
  },
});

export const { setMessages, addMessages, setThinking, setArtifacts } =
  messageSlice.actions;
export default messageSlice.reducer;
