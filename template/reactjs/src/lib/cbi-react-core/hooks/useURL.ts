// import { useRouter } from "next/router"
import { useHistory, useLocation } from "react-router-dom"
import useURLQuery from "./useURLQuery"

export const useURL = <T extends { [k: string]: string }>(queryDefault = {}) => {
    const history = useHistory()
    const { pathname: path } = useLocation()
    const query = useURLQuery<T>(queryDefault)

    return {
        ...query,
        path,
        navigate: history.push,
        goBack: history.goBack
    }
}

export default useURL
