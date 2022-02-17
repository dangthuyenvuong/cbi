import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/rootReducer";
import { useUser } from "store/user";
import { eprofileActions } from "./eprofile.reducer";

const eprofileSelector = (store: RootState) => store.eprofile


const getPatient = (userId: string) => createSelector(eprofileSelector, (store) => {
    if (userId === 'me') return store.patients?.find(e => e.type === 'me')
    if (userId !== 'new') return store.patients?.find(e => e.id === userId)
    return
})

export const usePatients = () => {
    const { isFetching, patients } = useSelector(eprofileSelector)
    const dispatch = useDispatch()
    const user = useUser()
    useEffect(() => {
        if (!patients) {
            dispatch(eprofileActions.getPatients())
        }

        if (patients && user) {
            if (!patients.find(e => e.type === 'me')) {
                dispatch(eprofileActions.createPatient({
                    data: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        type: 'me'
                    }
                }))
            }
        }
    }, [patients])

    return { patients, isFetching }

}


export const usePatient = (userId: string) => useSelector(getPatient(userId))
export const useEprofile = () => useSelector(eprofileSelector)


// export const usePatients = () => {
//     const dispatch = useDispatch()
//     const { patients } = useSelector(eprofileSelector)
//     useEffect(() => {
//         if(!patients){
//             dispatch(eprofileActions.getPatients())
//         }
//     }, [])

//     return patients
// }
