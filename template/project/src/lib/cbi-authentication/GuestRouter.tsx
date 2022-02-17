import { Redirect, Route } from "react-router-dom"
import { useIsLogin } from "store/auth"

interface GuestRouteProp {
    auth: boolean,
    redirect: string
}

export const GuestRoute: React.FC<GuestRouteProp> = ({ auth, redirect, ...props }) => {
    let login = useIsLogin()

    if (login) {

        return <Redirect to={redirect} />
    }

    return <Route {...props} />

}