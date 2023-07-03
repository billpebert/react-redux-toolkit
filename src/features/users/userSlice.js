import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Billy Ponto'},
    {id: '1', name: 'Veronica Estertari'},
    {id: '2', name: 'Veril Cornelius Ponto'},
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const getAllUsers = (state) => state.users

export default userSlice.reducer