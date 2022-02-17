import { createSlice } from "@reduxjs/toolkit";

type <%= namecase =%>Store = {}

let initState: <%= namecase =%>Store = {}

export const { actions: <%= name =%>Action, name, reducer: <%= name =%>Reducer } = createSlice({
    initialState: initState,
    name: '<%= name =%>',
    reducers: {},
    extraReducers: {}
})