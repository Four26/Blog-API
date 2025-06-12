import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogData {
    title: string
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
        content: "",
        category: "Technology",
        publish: false
    },
    error: ""
}

export const createPost = createAsyncThunk("createPost", async (blogData: BlogData, thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/createPost`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData)
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
    reducers: {
        setField: (state, action: PayloadAction<{ name: keyof BlogData, value: string | File | null | boolean }>) => {
            (state.blogData[action.payload.name] as string | File | null | boolean) = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.error = "";
            })
            .addCase(createPost.fulfilled, (state) => {
                state.blogData = initialState.blogData;
                state.error = "";
            })
            .addCase(createPost.rejected, (state, action) => {
                state.error = action.payload as string;
            })
    }
});

export const { setField } = createPostSlice.actions;
export default createPostSlice.reducer;