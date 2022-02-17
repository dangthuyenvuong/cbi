// import { PayloadAction } from "@reduxjs/toolkit";
import { http } from "lib/cbi-react-core";
import { Patient, ResponseProfile } from "@types";
import { call, put, takeLatest } from "redux-saga/effects";
import eprofileService from "services/eprofileServices";
import { eprofileActions, PayloadActionCreate, PayloadActionUpdate } from "./eprofile.reducer";

function* getPatients() {
    try {
        if (http.getToken()) {
            const patient: HttpResponse<Patient[]> = yield call(
                eprofileService.getPatients
            );
            // console.log(patient);

            if (patient.data) {
                yield put(eprofileActions.set({ patients: patient.data, isFetching: false }));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export function* createPatient(action: PayloadActionCreate) {
    try {
        const response: HttpResponse<Patient> = yield call(
            eprofileService.createPatient,
            action.payload.data
        );
        action.payload.callback?.(response);
        yield put(eprofileActions.getPatients())
    } catch (err) {
        console.log(err);
    }
}

export function* updatePatient(action: PayloadActionUpdate) {
    try {
        const response: HttpResponse<ResponseProfile> = yield call(
            eprofileService.updatePatient,
            action.payload.data.id,
            action.payload.data.data
        );
        action.payload.callback?.(response);
        yield put(eprofileActions.getPatients())

    } catch (err) {
        console.log(err);
    }
}

// export function* getPatientById(action: PayloadActionGet) {
//     console.log(action)
//   try {
//     const response: HttpResponse<Patient> = yield call(
//       eprofileService.getPatientById, action.payload
//     );
//     if (response.data) {
//       yield put(eprofileActions.set(response.data));
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

export function* eprofileSaga() {


    yield takeLatest([eprofileActions.createPatient.type], createPatient);
    //   yield takeLatest([eprofileActions.getPatientById.type], getPatientById);
    yield takeLatest([eprofileActions.updatePatient.type], updatePatient);


    yield takeLatest(eprofileActions.getPatients.type, getPatients);
    // yield takeLatest(eprofileActions.updatePatient.type, getPatients)
    // yield takeLatest(eprofileActions.createPatient.type, getPatients)

    yield takeLatest([eprofileActions.getPatients.type], getPatients);
    yield takeLatest([eprofileActions.createPatient.type], createPatient);
    // yield takeLatest([eprofileActions.getPatientById.type], getPatientById);
    yield takeLatest([eprofileActions.updatePatient.type], updatePatient);
}
