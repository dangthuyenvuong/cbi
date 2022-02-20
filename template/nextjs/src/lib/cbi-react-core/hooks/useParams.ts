import { useRouter } from 'next/router'


export type UsePrams = {[k: string]: string | (string | undefined)[]}
export const useParams = <T extends UsePrams>(): Partial<T> => {
    const { query } = useRouter()
    return query as unknown as T
}