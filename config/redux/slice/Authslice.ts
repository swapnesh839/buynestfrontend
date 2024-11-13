import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Iuser {
    email: string;
    name: string;
    type: "user" | "admin" | "superadmin" | "seller" | "submin" | null
}
interface AuthState {
    user: Iuser | null,
    token: string | null
}
const initialState: AuthState = {
    user: null,
    token: null,
}


const login = createAsyncThunk(
    "login",
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        await Promise.resolve().then(() => {
            console.log("zgfchj")
            return data
        }).catch((err) => {
            rejectWithValue(err.message)
        })
    }
)

const Authslice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        Logout(state) {
            state.user = null;
            state.token = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, () => {
                console.log("pending");
            })
            .addCase(login.rejected, () => {
                console.log("rejected");
            })
            .addCase(login.fulfilled, () => {
                console.log("fulfilled");
            })
    },
})

const { Logout } = Authslice.actions

export default Authslice

export const AuthsliceActions = { login, Logout }