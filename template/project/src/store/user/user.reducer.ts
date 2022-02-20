import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchAction, PayloadUpdateUser, PayloadRegister, ResponseRegister, ResponseUpdateProfile, User } from "@types";
import { cache } from "lib/cbi-react-core";


export type UserState = {
    user?: User
}
const initialState: UserState = {
    user: JSON.parse(cache.getItem('user') || 'null'),
}
export type PayloadActionRegister = FetchAction<PayloadRegister, ResponseRegister>

export type PayloadActionSetProfile = PayloadAction<User>
export type PayloadActionUpdateProfile = FetchAction<PayloadUpdateUser, ResponseUpdateProfile>

export const { actions: userActions, reducer: userReducer, name } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set(state, action: PayloadAction<Partial<UserState>>) {
            return {
                ...state,
                ...action.payload
            }
        },
        setProfile(state, action: PayloadActionSetProfile) {
            state.user = action.payload
            cache.setItem('user', JSON.stringify(state.user))
        },
        clearProfile(state) {
            state.user = undefined
            cache.removeItem('user')
        },
        fetchUpdateProfile(_, __: PayloadActionUpdateProfile) {
            // call saga
        },
        fetchProfile() {
            // call saga
        },
    }
})