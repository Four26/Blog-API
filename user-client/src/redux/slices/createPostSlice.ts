import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BlogData {
    title: string
    image: File | null
    content: string
    category: string
    publish: boolean
}

interface PostState {
    blogData: BlogData
    error: string
}

const initialState: PostState = {
    blogData: {
        title: "",
        image: null,
        content: "",
        category: "",
        publish: false
    },
    error: ""
}

export const createPost = createAsyncThunk("createPost", async (blogData: BlogData, thunkAPI) => {
    try {
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("content", blogData.content);
        formData.append("category", blogData.category);
        formData.append("publish", String(blogData.publish));
        if (blogData.image instanceof File) formData.append("image", blogData.image)

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/createPost`, {
            method: "POST",
            credentials: "include",
            body: formData
        });
        const data = await response.json();

        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    } catch (error) {
        console.error(error)
        return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknown error occured.")
    }
})

const createPostSlice = createSlice({
    name: "createPost",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.error = "";
            })
            .addCase(createPost.fulfilled, (state) => {
                state.blogData = initialState.blogData
                state.error = ""
            })
            .addCase(createPost.rejected, (state, action) => {
                state.error = action.payload as string
            })
    }
});

export default createPostSlice;