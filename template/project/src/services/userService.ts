import { ResponseRegister, User, ResponseUpdateProfile, PayloadRegister, PayloadUpdateUser } from "@types"
import { USER_API } from "constant/api"
import { http } from "lib/cbi-react-core"
const api = USER_API

const userService = {
    getProfile() {
        return http.get<HttpResponse<User>>(`${api}/users/profile`)
    },
    register(data: PayloadRegister) {
        return http.post<HttpResponse<ResponseRegister>>(`${api}/users/register`, data)
    },
    updateProfile(data: PayloadUpdateUser) {
        return http.patch<HttpResponse<ResponseUpdateProfile>>(`${api}/users/profile`, data)
    }
}

export default userService