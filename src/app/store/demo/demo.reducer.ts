import { createSlice } from "@reduxjs/toolkit";

type DemoStore = {}

let initState: DemoStore = {}

export const { actions: demoAction, name, reducer: demoReducer } = createSlice({
    initialState: initState,
    name: 'demo',
    reducers: {},
    extraReducers: {}
})