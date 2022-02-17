import { createSlice } from "@reduxjs/toolkit";

type NotificationStore = {}

let initState: NotificationStore = {}

export const { actions: notificationAction, name, reducer: notificationReducer } = createSlice({
    initialState: initState,
    name: 'notification',
    reducers: {},
    extraReducers: {}
})