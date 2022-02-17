import { useQuery } from ".."


export interface UseQueryOptions {
    name?: string
    time?: number
}
// eslint-disable-next-line
export const useService = <T>(promise: () => Promise<HttpResponse<T>>, dependecyList: any[], options: UseQueryOptions = {}) => { // eslint-disable-line
    const { data, isFetching, reFetch } = useQuery(promise, dependecyList, options)


    return {
        data: data?.data,
        message: data?.message,
        error: data?.error,
        isFetching,
        reFetch
    }
}