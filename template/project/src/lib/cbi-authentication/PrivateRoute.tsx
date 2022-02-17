import { Redirect, Route } from "react-router-dom"
import { useAuth } from "store/auth"
import { getPathRedirectAuthen } from "./routerConfig"

interface PrivateRouteProp {
    auth?: string | boolean,
    redirect?: string
}

export const PrivateRoute: React.FC<PrivateRouteProp> = ({ auth, redirect, ...props }) => {
    let { login, permissions, role } = useAuth()

    if (!login) {

        if (typeof auth === 'string' && permissions) {
            if (role === auth || permissions.indexOf(auth) !== -1) {
                return <Route {...props} />
            } else {

                return <Route {...props}><Redirect to={redirect || '/'} /></Route>
            }
        }else if(auth){
            return <Route {...props}><Redirect to={getPathRedirectAuthen()} /></Route>
        }

    }


    return <Route {...props} />

}