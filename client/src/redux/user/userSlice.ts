import { createSlice } from "@reduxjs/toolkit"
import { userSliceState } from "../../types/types"

const initialState:userSliceState = {
    currentUser:null,
    loading:false,
    err:""
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess:(state, action) => {
            console.log(action,"local action not working")
            state.currentUser = action.payload
            state.loading = false
            state.err = ""
        },
        signInfailure: (state, action) => {
            state.err = action.payload
            state.loading = false
        },
        logoutUser:(state) => {
            state.currentUser = null
        }
    }
})

export const { signInStart, signInSuccess, signInfailure, logoutUser } = userSlice.actions

export default userSlice.reducer

