import { useCallback, useState } from "react"
export type UseToggleResponse = [
    boolean,
    () => void,
    () => void,
    () => void
]


export const useToggle = (initValue = false) : UseToggleResponse => {
    const [isTrue, setIsTrue] = useState(initValue)
    const setTrue = useCallback(() => {
        setIsTrue(true)
    }, [])

    const setFalse = useCallback(() => {
        setIsTrue(false)
    }, [])

    const toggle = useCallback(() => {
        setIsTrue(!isTrue)
    }, [isTrue])

    return [
        isTrue,
        setTrue,
        setFalse,
        toggle
    ]
}