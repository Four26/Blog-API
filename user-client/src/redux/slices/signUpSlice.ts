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
    loading: boolean
    signUpError: { field: string, message: string }[] | null
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
    loading: false,
    signUpError: null,
}

export const signUp = createAsyncThunk<{ message: string }, UserData, { rejectValue: { field: string, message: string }[] }>("auth/signUp", async (formData: UserData, thunkAPI) => {
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
        return thunkAPI.rejectWithValue([{ field: 'error', message: error instanceof Error ? error.message : "Unknown error occured." }]);
    }
});

const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ name: keyof UserData; value: string }>) => {
            state.formData[action.payload.name] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.signUpError = null;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.formData = initialState.formData;
                state.loading = false;
                state.signUpError = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.signUpError = action.payload as { field: string, message: string }[]
            })
    }
})

export const { setField } = signUpSlice.actions;
export default signUpSlice.reducer;
