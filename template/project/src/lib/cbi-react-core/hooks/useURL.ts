import { useRouter } from "next/router"
import { useCallback } from "react"
import { URLHelper } from "../utils"

export const useURL = <T extends {[k: string]: string}>(queryDefault = {}) => {
    const { asPath, push: navigate, back } = useRouter()
    let path = asPath.split('?')?.[0]
    const query = URLHelper.searchObject<T>(queryDefault)
    const updateQuery = useCallback((params) => {
        const query = {...URLHelper.searchObject(), ...params}
        navigate(`${path}${URLHelper.searchString(query)}`)
    }, [path])

    const queryString = URLHelper.searchString(query)

    return {
        updateQuery,
        query,
        path,
        queryString,
        navigate: navigate,
        goBack: back
    }
}

export default useURL
