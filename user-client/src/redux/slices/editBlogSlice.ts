import { PayloadAction } from "@reduxjs/toolkit";
import { URL } from "../../api/URL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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
        category: "",
        publish: false
    },
    error: ""
}


export const editBlog = createAsyncThunk("editBlog", async ({ id, blogData }: { id: number, blogData: BlogData }, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/editBlog${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData)
        });

        const data = await response.json();

        if (!response.ok) return thunkAPI.rejectWithValue(data.message);

        return data;
    } catch (error) {
        console.error(error);
        return error;
    }

});

const editBlogSlice = createSlice({
    name: "editBlog",
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ name: keyof BlogData, value: string | boolean }>) => {
            (state.blogData[action.payload.name] as string | boolean) = action.payload.value
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(editBlog.pending, (state) => {
                state.error = "";
            })
            .addCase(editBlog.fulfilled, (state) => {
                state.blogData = initialState.blogData;
                state.error = ""
            })
            .addCase(editBlog.rejected, (state, action) => {
                state.error = action.payload as string
            })
    }
});

export const { setField } = editBlogSlice.actions;
export default editBlogSlice.reducer;