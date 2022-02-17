import { UseQueryOptions } from "."
import { useQuery } from ".."

type UseHttpResponse<T> = {
    data: T,
    message?: string,
    error?: string,
    actionRefetch: () => void
    isFetching: false,
} | {
    data: undefined,
    message?: string,
    error?: string,
    isFetching: true,
    actionRefetch: () => void
}

type UseHttpArg<T> = [promise: () => Promise<HttpResponse<T>> | undefined | null, dependecyList?: any[], options?: UseQueryOptions] //eslint-disable-line

type UseHttp = <T>(...rest: UseHttpArg<T>) => UseHttpResponse<T>



/**
 * 
 * @param promise asdfasdf
 * @param dependecyList 
 * @param options 
 * @returns 
 */
export const useHttp: UseHttp = (promise, dependecyList, options) => {
    const { isFetching, data, reFetch } = useQuery(promise, dependecyList, options)

    return {
        isFetching: isFetching as any, // eslint-disable-line
        data: data?.data as any, // eslint-disable-line
        error: data?.error,
        message: data?.message,
        actionRefetch: reFetch
    }
}