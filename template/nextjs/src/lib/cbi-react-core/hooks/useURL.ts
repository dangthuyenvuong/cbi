import { useRouter } from "next/router"
import useURLQuery from "./useURLQuery"

export const useURL = <T extends { [k: string]: string }>(queryDefault = {}) => {
    const { asPath, push: navigate, back } = useRouter()
    let path = asPath.split('?')?.[0]
    let query = useURLQuery<T>(queryDefault)

    return {
        ...query,
        path,
        navigate: navigate,
        goBack: back
    }
}

export default useURL
