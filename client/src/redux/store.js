import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import conversationReducer from "./slice/conversationSlice.js";
import messageReducer from "./slice/messageSlice.js";

export default configureStore({
  reducer: {
    user: authReducer,
    conversation: conversationReducer,
    message: messageReducer,
  },
});
