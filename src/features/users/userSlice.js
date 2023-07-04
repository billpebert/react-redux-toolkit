import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const USERS_API = 'https://jsonplaceholder.typicode.com/users'

// const initialState = [
//     {id: '0', name: 'Billy Ponto'},
//     {id: '1', name: 'Veronica Estertari'},
//     {id: '2', name: 'Veril Cornelius Ponto'},
// ]

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(USERS_API)
        return response.data
    } catch (err) {
        return err.message
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            return action.payload
        })
    }
})

export const getAllUsers = (state) => state.users

export default userSlice.reducer