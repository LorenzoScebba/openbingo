import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./slices/appSlice";

const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
