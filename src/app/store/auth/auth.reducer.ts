import { createSlice } from "@reduxjs/toolkit";

type AuthStore = {}

let initState: AuthStore = {}

export const { actions: authAction, name, reducer: authReducer } = createSlice({
    initialState: initState,
    name: 'auth',
    reducers: {},
    extraReducers: {}
})