import { useIsLogin } from "store/auth"

export const IsGuest: React.FC = ({ children }) => {
    const login = useIsLogin()
    if (!login) return <>{children}</>
    return null
}