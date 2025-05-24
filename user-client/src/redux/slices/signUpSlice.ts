import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface UserData {
    firstname: string
    lastname: string
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface SignUpState {
    formData: UserData
    isLoggedIn: boolean
    loading: boolean,
    signUpError: string | null
    error: string | null
}

const initialState: SignUpState = {
    formData: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    },
    isLoggedIn: false,
    loading: false,
    signUpError: null,
    error: null
}

export const signUp = createAsyncThunk("auth/signUp", async (formData: SignUpState["formData"], thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signUp`, {
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
        console.log(error);
        return thunkAPI.rejectWithValue(error instanceof Error ? error.message : "Unknown error occured")
    }
});

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ name: keyof UserData; value: string }>) => {
            state.formData[action.payload.name] = action.payload.value;
        },
        clearSignUpError: (state) => {
            state.signUpError = null
        },
        logOut: (state, action) => {
            state.formData = action.payload
            state.isLoggedIn = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.formData = initialState.formData
                state.isLoggedIn = false;
                state.loading = true;
                state.signUpError = null;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.formData = action.payload;
                state.isLoggedIn = true;
                state.loading = false;
                state.signUpError = null;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.formData = initialState.formData
                state.isLoggedIn = false;
                state.loading = false;
                state.signUpError = action.payload as string;
                state.error = action.payload as string;
            })
    }
})

export const { setField, clearSignUpError, logOut } = signUpSlice.actions;
export default signUpSlice.reducer;
