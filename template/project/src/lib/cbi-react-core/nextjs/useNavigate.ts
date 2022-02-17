import { useRouter } from "next/router"

export const useNavigate = () => {
    const { push: navigate } = useRouter()
    return navigate
}