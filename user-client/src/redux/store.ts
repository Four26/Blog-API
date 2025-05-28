import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./slices/signUpSlice";
import logInSlice from "./slices/logInSlice";


export const store = configureStore({
    reducer: {
        signUp: signUpSlice,
        logIn: logInSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;