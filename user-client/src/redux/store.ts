import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./slices/signUpSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        signUp: signUpSlice,
        auth: authSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;