import { useCallback } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { URLHelper } from "../utils"

export const useURLQuery = <T extends { [k: string]: string }>(queryDefault = {}) => {
    const history = useHistory()
    const { pathname: path } = useLocation()
    const query = URLHelper.searchObject<T>(queryDefault)
    const updateQuery = useCallback((params) => {
        const query = { ...URLHelper.searchObject(), ...params }
        history.push(`${path}${URLHelper.searchString(query)}`)
    }, [path])

    const queryString = URLHelper.searchString(query)

    return {
        updateQuery,
        query,
        queryString,
    }
}

export default useURLQuery
