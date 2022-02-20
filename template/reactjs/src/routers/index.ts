import { routerConfig, setPathRedirectAuthen } from "lib/cbi-authentication";
import { lazy } from "react";

setPathRedirectAuthen("/welcome-back");

export const { renderRouters, routerName: router } = routerConfig([
    {
        auth: false,
        authRedirect: "/",
        component: lazy(() => import("../components/layouts/AuthLayout")),
        routers: [
            {
                path: "/login",
                component: lazy(() => import("../pages/login")),
                name: "login",
            },
        ],
    },
    {
        component: lazy(() => import("../components/layouts/MainLayout")),
        routers: [
            {
                path: "/",
                exact: true,
                component: lazy(() => import("../pages")),
                name: "home",
            },

            {
                path: "/account",
                auth: true,
                routers: [
                    {
                        path: "/",
                        component: lazy(() => import('../pages/account')),
                        exact: true,
                        name: "myAccount",
                    },
                ],
            },
        ],
    },
]);
