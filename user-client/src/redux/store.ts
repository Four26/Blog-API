import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./slices/signUpSlice";
import authSlice from "./slices/authSlice";
import createPostSlice from "./slices/createPostSlice";

export const store = configureStore({
    reducer: {
        signUp: signUpSlice,
        auth: authSlice,
        createPost: createPostSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;