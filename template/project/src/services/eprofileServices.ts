import { EPROFILE_API } from "constant/api"
import { Patient, InputPatient } from "@types"
import { http } from "lib/cbi-react-core"


const eprofileService = {
    getPatients() {
        return http.get<HttpResponse<Patient[]>>(`${EPROFILE_API}/profiles/users/own`)     
    },
    getPatientById(data: string) {
        return http.get<HttpResponse<Patient>>(`${EPROFILE_API}/profiles/${data}`)     
    },
    createPatient(data: InputPatient) {
        return http.post<HttpResponse<Patient>>(`${EPROFILE_API}/profiles`, data)     
    },
    updatePatient(id: string, data: InputPatient) {
        return http.patch<HttpResponse>(`${EPROFILE_API}/profiles/${id}`, data)     
    },
    deletePatient(id: string) {
        return http.delete<HttpResponse<Patient>>(`${EPROFILE_API}/profiles/${id}`)     
    },
}


export default eprofileService