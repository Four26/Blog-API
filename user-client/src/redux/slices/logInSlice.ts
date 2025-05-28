import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserData {
    username: string,
    password: string
}
interface logInState {
    formData: UserData
    logInState: boolean
    logInError: string | null
}

const initialState: logInState = {
    formData: {
        username: "",
        password: ""
    },
    logInState: false,
    logInError: null
}

export const logIn = createAsyncThunk("auth/logIn", async (formData: UserData, thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/logIn`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknown error occured")
    }
});

export const logInSlice = createSlice({
    name: "logIn",
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ name: keyof UserData, value: string }>) => {
            state.formData[action.payload.name] = action.payload.value
        },
        logOut: (state, action: PayloadAction<UserData>) => {
            state.formData = action.payload;
            state.logInState = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.logInState = false;
                state.logInError = null;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.formData = {
                    username: action.payload.user.username,
                    password: ""
                };
                state.logInState = true;
                state.logInError = null;

            })
            .addCase(logIn.rejected, (state, action) => {
                state.logInState = false
                state.logInError = action.payload as string
            })
    }
});

export const { setField, logOut } = logInSlice.actions;
export default logInSlice.reducer;