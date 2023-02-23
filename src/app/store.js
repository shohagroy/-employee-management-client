import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/apiSlice/apiSlice";
import authSlice from "../features/authSlice/authSlice";
import NotificationMessageSlice from "../features/NotificationMessage/NotificationMessageSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    getNotify: NotificationMessageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
