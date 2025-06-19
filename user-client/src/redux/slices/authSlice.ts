import { URL } from "../../api/URL"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserData {
    username: string,
    password: string
}
interface logInState {
    formData: UserData
    currentUser: string
    isLoading: boolean
    logInError: string | null
    isAuthenticated: boolean
}

const initialState: logInState = {
    formData: {
        username: "",
        password: ""
    },
    currentUser: "",
    isLoading: false,
    logInError: null,
    isAuthenticated: false
}

export const logIn = createAsyncThunk("auth/logIn", async (formData: UserData, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/logIn`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) return thunkAPI.rejectWithValue(data.message);

        return data.user;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknown error occured")
    }
});

export const logOut = createAsyncThunk("auth/logOut", async (_: void, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/logOut`, {
            method: "POST",
            credentials: "include"
        });
        const data = await response.json();

        if (!response.ok) return thunkAPI.rejectWithValue(data.message)
        return data;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknow error occured!")
    }

});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_: void, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/checkAuth`, {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        if (!response.ok) return thunkAPI.rejectWithValue(data.message);
        return data;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknown error occured!")
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ name: keyof UserData, value: string }>) => {
            state.formData[action.payload.name] = action.payload.value
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.isLoading = true;
                state.logInError = null;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.formData = initialState.formData;
                state.currentUser = action.payload;
                state.isLoading = false;
                state.logInError = null;

            })
            .addCase(logIn.rejected, (state, action) => {
                state.isLoading = false;
                state.logInError = action.payload as string
            })
        builder
            .addCase(logOut.pending, (state) => {
                state.isLoading = true;
                state.logInError = null;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.currentUser = "";
                state.isLoading = false;
                state.isAuthenticated = false;

            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.logInError = action.payload as string
            })
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.logInError = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.currentUser = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            })
    }
});

export const { setField } = authSlice.actions;
export default authSlice.reducer;