import { ResponseUpdateProfile, User } from "@types";
import { call, put, takeLatest } from "redux-saga/effects";
import { userActions } from ".";
import userService from 'services/userService'
import { authActions } from "store/auth";
import { http } from "lib/cbi-react-core";
import { PayloadActionUpdateProfile } from "./user.reducer";

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

export function* fetchUpdateProfile(action: PayloadActionUpdateProfile) {
    try {
        const registerRes: HttpResponse<ResponseUpdateProfile> = yield call(userService.updateProfile, action.payload.data)
        action.payload.callback?.(registerRes)
        yield put(userActions.fetchProfile())
    } catch (err) {
        console.log(err)
    }
    console.log('fetchUpdateProfile', action)

}

function* clearProfile() {
    try {
        yield put(userActions.clearProfile())
    } catch (err) { console.error(err) }
}


export function* userSaga(): any { //eslint-disable-line
    yield takeLatest(authActions.logout.type, clearProfile)

    yield takeLatest([authActions.login.type, userActions.fetchProfile.type], fetchProfile)

    yield takeLatest([userActions.fetchUpdateProfile.type], fetchUpdateProfile)

    // while (true) {
    //     const action = yield take(userActions.fetchUpdateProfile.type)
    //     console.log('action',action)
    //     // yield fork(worker, action.payload)
    // }

}