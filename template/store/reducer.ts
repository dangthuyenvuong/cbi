import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type <%= namecase =%>Store = {}

let initState: <%= namecase =%>Store = {}

export const { actions: <%= name =%>Actions, name, reducer: <%= name =%>Reducer } = createSlice({
    initialState: initState,
    name: '<%= name =%>',
    reducers: {
        set(state, action: PayloadAction<Partial<<%= namecase =%>Store>>){
            return {
                ...state,
                ...action.payload
            }
        }
    }
})