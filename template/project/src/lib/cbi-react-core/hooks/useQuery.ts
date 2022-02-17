import { useEffect, useState } from "react"
import { storage } from "../LocalStorage"
import { useAllState } from "./useAllState"


export interface UseQueryOptions {
    name?: string
    time?: number
}


type State<T> = { data?: T, isFetching: boolean }
/**
 * 
 * @param promise 
 * @param dependecyList 
 * @param options 
 * @returns 
 */
export const useQuery = <T>(promise: () => Promise<T> | undefined | null, dependecyList: any[] = [], options: UseQueryOptions = {}) => { // eslint-disable-line

    const [state, setState] = useAllState<State<T>>({
        isFetching: true
    })

    const [res, setRes] = useState<State<T>>({
        isFetching: true
    })
    // const [data, setData] = useState<T>()
    // const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        reFetch(false)
    }, dependecyList)

    useEffect(() => {
        if (state.isFetching) {
            setRes({ isFetching: true })
        } else if (state.data) {
            setRes(state)
        }
    }, [state])

    /**
     * re call api 
     * @param reFresh refresh cache when true (default true)
     */
    const reFetch = async (reFresh = true) => {
        setState({
            isFetching: true,
            data: undefined
        })
        // setIsFetching(true)
        // setData(undefined)
        let res: any // eslint-disable-line
        if (options.name) {

            let data: JSONObject = {}

            if (options.time) {
                data.timestamp = new Date().getTime() + options.time * 1000
            }

            const value = storage.get(options.name)

            if (typeof value === 'object' && !reFresh) {

                if (value.timestamp) {
                    if (value.timestamp >= new Date().getTime()) {
                        res = value.data
                    } else {
                        res = await promise()
                        data.data = res
                        storage.set(options.name, data as unknown as string)
                    }
                } else {
                    res = value
                }

            } else {
                res = await promise()
                data.data = res

                storage.set(options.name, data as unknown as string)
            }

        } else {
            res = await promise()
        }
        if (res instanceof Object) {
            setState({ data: res })
            // setData(res)
        }
        // let res = await promise()
        setState({ isFetching: false })
        // setIsFetching(false)
    }
    return {
        ...res,
        reFetch
    }
}