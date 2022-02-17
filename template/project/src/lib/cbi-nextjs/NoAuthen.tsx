import { Redirect } from "lib/cbi-react-core"
import { useAuth } from "store/auth"

export const NoAuthen: React.FC<{
    redirect?: string
}> = ({ children, redirect = '' }) => {
    const { login } = useAuth()
    if (login) return <Redirect to={redirect} />
    return <>{children}</>
} 