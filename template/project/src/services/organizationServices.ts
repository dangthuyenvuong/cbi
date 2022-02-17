import { Doctor, Specialty } from "@types"
import { ORGANIZATION_API } from "constant/api"
import { http } from "lib/cbi-react-core"


const organizationService = {
    getSpecialty() {
        return http.get<HttpResponse<Specialty[]>>(`${ORGANIZATION_API}/teams`)
    },
    getDoctor() {
        return http.get<HttpResponse<Doctor[]>>(`${ORGANIZATION_API}/members`)
    }
}


export default organizationService