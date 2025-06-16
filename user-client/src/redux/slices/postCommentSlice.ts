import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../api/URL";

interface Comment {
    id: number
    comment: string
}

interface CommentState {
    commentData: Comment
    successfulMessage: string
    error: string
}

const initialState: CommentState = {
    commentData: {
        id: 0,
        comment: ""
    },
    successfulMessage: "",
    error: ""
}

export const postComment = createAsyncThunk("postComment", async (commentData: Comment, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/postComment${commentData.id}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData)
        });

        const data = await response.json();

        if (!response.ok) return thunkAPI.rejectWithValue(data.message);

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknow error occured.")
    }
})

const postCommentSlice = createSlice({
    name: "postComment",
    initialState,
    reducers: {
        setTextArea: (state, action) => {
            state.commentData.comment = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postComment.pending, (state) => {
                state.error = "";
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.commentData = initialState.commentData;
                state.successfulMessage = action.payload;
                state.error = "";
            })
            .addCase(postComment.rejected, (state, action) => {
                state.error = action.payload as string
            })
    }
});

export const { setTextArea } = postCommentSlice.actions;
export default postCommentSlice.reducer;