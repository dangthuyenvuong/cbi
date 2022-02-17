import { Patient, Eprofile, ResponseProfile, InputPatient, FetchAction } from "@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EprofileState {
    patients?: Patient[];
    isFetching: boolean
  }

const initialState: EprofileState = {
    isFetching: true,
};
export type PayloadActionSet = PayloadAction<Partial<EprofileState>>
export type PayloadActionCreate = FetchAction<InputPatient, Patient>
export type PayloadActionUpdate = FetchAction<{
    id: string,
    data: InputPatient
}, ResponseProfile>
export type PayloadActionGet = PayloadAction<string>
export const { actions: eprofileActions, reducer: eprofileReducer } =
    createSlice({
        initialState,
        name: "eprofile",
        reducers: {
            // setPatient(state, action: PayloadAction<Patient[]>) {
            //     state.patients = action.payload;
            // },
            // setPatientSelected(state, action: PayloadAction<Patient>) {
            //     // state.patientSelected = action.payload;
            // },
            createPatient(_, __: PayloadActionCreate) {
                // call saga
            },
            updatePatient(_, __: PayloadActionUpdate) {
                // call saga
            },
            getPatientById(_, __: PayloadActionGet) {
                // call saga
            },
            getPatients() {
                // call saga
            },
            set (state, action: PayloadAction<Partial<EprofileState>>){
                return {
                    ...state,
                    ...action.payload
                }
            }

        },
    });