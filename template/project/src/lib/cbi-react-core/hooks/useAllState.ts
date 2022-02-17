import { useCallback, useState } from "react"

type UseAllStateReponse<T> = [
    T,
    (obj: Partial<T>) => void
]

export const useAllState = <T>(initValue: T): UseAllStateReponse<T> => {
    const [state, setStateT] = useState<T>(initValue)
    const setState = useCallback((obj: Partial<T>) => {
        setStateT((state) => {
            // console.log(state)
            return {
                ...state,
                ...obj,
            }
        })
    }, [state])

    return [state, setState]
}