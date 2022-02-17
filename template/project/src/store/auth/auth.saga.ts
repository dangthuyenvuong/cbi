import { ResponseLogin, User } from "@types";
import { call, put, takeLatest } from "redux-saga/effects";
import authService from "services/authService";
import { PayloadActionFetchLogin } from ".";
import { authActions } from "./auth.reducer";


// function* getProfile() {
//     try {
//         if (http.getToken()) {
//             const profile: HttpResponse<User> = yield call(userService.getProfile)
//             if (profile.data) {
//                 yield put(authActions.setProfile(profile.data))
//             }
//         }
//     } catch (err) { 
//         console.log('error', err);
//     }
// }

function* fetchLogin(action: PayloadActionFetchLogin) {
    try {
        const res: HttpResponse<ResponseLogin> = yield call(authService.login, action.payload.data)
        if (res.data) {
            yield put(authActions.login(res.data))
            // http.setToken(res.data)
        }
        action.payload?.callback?.(res)


    } catch (err) { 
        console.log('error', err);
    }
}
export function* authSaga() {
    yield takeLatest([authActions.fetchLogin.type], fetchLogin)
    // yield takeLatest([authActions.login.type, authActions.getProfile.type], getProfile)
}