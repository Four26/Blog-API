import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignUpState {
    firstname: string
    lastname: string
    username: string
    email: string
    password: string
    confirmPassword: string
}

const initialState: SignUpState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => { state.firstname = action.payload },
        setLastName: (state, action: PayloadAction<string>) => { state.lastname = action.payload },
        setUsername: (state, action: PayloadAction<string>) => { state.username = action.payload },
        setEmail: (state, action: PayloadAction<string>) => { state.email = action.payload },
        setPassword: (state, action: PayloadAction<string>) => { state.password = action.payload },
        setConfirmPassword: (state, action: PayloadAction<string>) => { state.confirmPassword = action.payload }
    }
});

export const { setFirstName, setLastName, setUsername, setEmail, setPassword, setConfirmPassword } = signUpSlice.actions;
export default signUpSlice.reducer;
