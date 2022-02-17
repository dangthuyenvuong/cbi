import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchAction, PayloadLogin, Permission, ResponseLogin, User } from "@types";
import { cache, http } from "lib/cbi-react-core";

export interface AuthState {
    login: boolean,
    permissions?: Permission,
    role?: string
}

export type PayloadActionFetchLogin = FetchAction<PayloadLogin, ResponseLogin>
export type PayloadActionToken = PayloadAction<ResponseLogin>


const initialState: AuthState = {
    login: !!http.getToken(),
}

export const { reducer: authReducer, actions: authActions } = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        // getProfile() { 
        //     // call saga
        // },
        set(state, action: PayloadAction<Partial<AuthState>>){
            return {...state, ...action.payload}
        },
        fetchLogin(_, __: PayloadActionFetchLogin) { 
            // call saga
        },
        login(state, action: PayloadActionToken) {
            state.login = true
            http.setToken(action.payload)
        },
        saveToken(_, action: PayloadActionToken){
            http.setToken(action.payload)
        },
        // setProfile(state, action) {
        //     state.user = action.payload
        //     cache.setItem('user', JSON.stringify(state.user))
        // },
        logout() {
            http.removeToken()
            // cache.removeItem('user')
            return {
                login: false,
                permissions: undefined,
                role: undefined,
            }
        }
    }
})