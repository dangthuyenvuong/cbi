import { Fragment } from "react";
import { Route } from "react-router-dom";
import { GuestRoute } from "./GuestRouter";
import { PrivateRoute } from "./PrivateRoute";

declare type Router<T, P> = {
    component?: React.FC,
    path?: string,
    exact?: boolean,
    auth?: boolean | string,
    name?: T,
    routers?: Router<T, P>[],
    authRedirect?: string
}

declare type RouterConfig<T, P> = Router<T, P>[]

type RouterConfigReponse<T extends string> = {
    routerName: { [key in T]: string },
    renderRouters: JSX.Element[],
    // path: string[]
    // routerParam: { [K in T]: () => { [key in P]?: string } },
}

type RouterConfigOptions = <T extends string, P extends string>(
    routers: RouterConfig<T, P>,
    pathParrent?: string)
    => RouterConfigReponse<T>


let _redirect = '/login'
export const setPathRedirectAuthen = (path: string) => {
    _redirect = path
}

export const getPathRedirectAuthen = () => _redirect

export const routerConfig: RouterConfigOptions = (routerParams, pathParrent = '') => {
    // eslint-disable-next-line
    let routerName: any = {}
    // eslint-disable-next-line
    let routerParam: any = {}

    let list = routerParams.map(e => {
        let { exact, path, component: Component, routers: childRouters, auth, authRedirect } = e
        if (!path) path = ''
        path = pathParrent + '/' + path
        path = path.replace(/\/+/g, '/')

        // eslint-disable-next-line
        let children: any = null

        if (e.name) {
            routerName[e.name] = path
        }

        if (childRouters) {
            let { renderRouters, routerName: name } = routerConfig(childRouters, path)
            children = renderRouters
            // eslint-disable-next-line
            path = routerPath(e, path) as any
            Object.assign(routerName, name)

        }

        // eslint-disable-next-line
        let C: any = Fragment
        if (Component) {
            C = Component
        }
        const props = {
            auth,
            key: path,
            exact,
            path,
            // eslint-disable-next-line
            component: (prop: any) => <C>
                {children}
            </C>
        }
        if (auth) {

            return <PrivateRoute {...props} />
        } else if (auth === false) {

            return <GuestRoute {...props} auth={false} redirect={authRedirect || '/'} />
        }


        return <Route {...props} />
    })
    return {
        routerName,
        routerParam,
        renderRouters: list
    }
}

/**
 * 
 * @param routers 
 * @param pathParrent 
 * @returns 
 */

const routerPath = <T, P>(routers: Router<T, P>, pathParrent = '') => {
    if (routers?.routers?.length) {
        const path: string[] = []

        for (const i in routers.routers) {
            let p = routerPath(routers.routers[i])
            if (typeof p === 'string') {
                p = (pathParrent + '/' + p).replace(/\/+/g, '/')
                path.push(p)
            } else if (Array.isArray(p)) {
                path.push(...(p.map(e => (pathParrent + '/ ' + e).replace(/\/+/g, '/'))))
            }
        }

        return path
    }

    return routers.path
}