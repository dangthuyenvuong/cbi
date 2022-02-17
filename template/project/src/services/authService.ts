import { PayloadLogin, ResponseLogin } from "@types"
import { AUTH_API } from "constant/api"
import { http } from "lib/cbi-react-core"
const api = AUTH_API

const authService = {
    login(auth: PayloadLogin) {
        return http.post<HttpResponse<ResponseLogin>>(`${api}/authentication/login`, auth, {
            'x-tenant-id': '63fc7ec1-43f4-41ca-a2cd-ce48fb88783f'
        })
    }
}

export default authService