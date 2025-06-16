import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./slices/signUpSlice";
import authSlice from "./slices/authSlice";
import createPostSlice from "./slices/createPostSlice";
import editBlogSlice from "./slices/editBlogSlice";
import postCommentSlice from "./slices/postCommentSlice";

export const store = configureStore({
    reducer: {
        signUp: signUpSlice,
        auth: authSlice,
        createPost: createPostSlice,
        editBlog: editBlogSlice,
        postComment: postCommentSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;