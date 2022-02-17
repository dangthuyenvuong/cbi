import { ResponseRegister, ResponseUpdateProfile, User } from "@types";
import { call, put, take, takeLatest } from "redux-saga/effects";
import { PayloadActionRegister, PayloadActionUpdateProfile, userActions } from ".";
import userService from 'services/userService'
import { authActions } from "store/auth";
import { http } from "lib/cbi-react-core";

export function* fetchRegister(action: PayloadActionRegister) {
    try {
        const registerRes: HttpResponse<ResponseRegister> = yield call(userService.register, action.payload.data)

        // if (registerRes.data) {

        // yield put(authActions.fetchLogin(registerRes.data))

        // const res: HttpResponse<ResponseLogin> = yield call(authService.login, {
        //     password: registerRes.data.password,
        //     username: registerRes.data.username
        // })

        // if (res.data) {
        //     http.setToken(res.data)
        //     // yield put(authActions.saveToken(res.data))
        // }

        // }
        action.payload.callback?.(registerRes)
        // yield put(userActions.fetchProfile())

    } catch (err) {
        console.log(err)
    }
}

export function* fetchUpdateProfile(action: PayloadActionUpdateProfile) {
    try {
        const registerRes: HttpResponse<ResponseUpdateProfile> = yield call(userService.updateProfile, action.payload.data)
        action.payload.callback?.(registerRes)
        yield put(userActions.fetchProfile())
    } catch (err) {
        console.log(err)
    }
    console.log('fetchUpdateProfile',action)

}


function* fetchProfile() {
    try {
        if (http.getToken()) {
            const profile: HttpResponse<User> = yield call(userService.getProfile)
            if (profile.data) {
                yield put(userActions.setProfile(profile.data))
                yield put(authActions.set({
                    login: true
                }))
            }
        }
    } catch (err) {
        console.log('error', err);
    }
}

function* clearProfile(){
    try{
        yield put(userActions.clearProfile())
    }catch(err) { console.error(err) }
}


export function* userSaga(): any {
    yield takeLatest([userActions.fetchRegister.type], fetchRegister)
    yield takeLatest([userActions.fetchUpdateProfile.type], fetchUpdateProfile)
    yield takeLatest(authActions.logout.type, clearProfile)

    yield takeLatest([authActions.login.type, userActions.fetchProfile.type], fetchProfile)

    // while (true) {
    //     const action = yield take(userActions.fetchUpdateProfile.type)
    //     console.log('action',action)
    //     // yield fork(worker, action.payload)
    // }

}