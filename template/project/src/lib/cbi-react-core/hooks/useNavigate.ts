import { useRouter } from "next/router"
import { useCallback } from "react"
import { Navigate } from "../@types"



export const useNavigate = (): Navigate => {
    const { push, back } = useRouter()

    const navigate = useCallback((url: string) => {
        push(url, undefined, { scroll: false })
        if (push.prototype && !push.prototype.goBack) {
            push.prototype.goBack = back
        }
    }, [push])


    return navigate as unknown as Navigate
}

export default useNavigate