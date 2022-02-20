import { routerConfig } from "lib/cbi-authentication";

export const { renderRouters, routerName: router } = routerConfig([
    {
        auth: false,
        authRedirect: "/",
        routers: [
            {
                path: "/login",
                name: "login",
            },
        ],
    },
    {
        routers: [
            {
                path: "/",
                exact: true,
                name: "home",
            },

            {
                path: "/account",
                auth: true,
                routers: [
                    {
                        path: "/",
                        exact: true,
                        name: "myAccount",
                    },
                ],
            },
        ],
    },
]);
