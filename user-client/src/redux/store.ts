import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./slices/signUpSlice";


export const store = configureStore({
    reducer: {
        signUp: signUpSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;