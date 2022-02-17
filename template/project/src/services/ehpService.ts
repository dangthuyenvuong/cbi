import { EHP_API } from "constant/api"
import { http } from "lib/cbi-react-core"
const api = EHP_API

const ehpService = {
    get() {
        return http.get<HttpResponse>(`api/api`)
    },
}

export default ehpService