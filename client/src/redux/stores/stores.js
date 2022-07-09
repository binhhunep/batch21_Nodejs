import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/auth/authSlice";
import postSlice from "../slice/post/postSlice";

const reduxStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer,
  },
});

export { reduxStore };
