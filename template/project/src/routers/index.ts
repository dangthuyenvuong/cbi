import { routerConfig, setPathRedirectAuthen } from "lib/cbi-authentication";

setPathRedirectAuthen("/welcome-back");

export const { renderRouters, routerName: router } = routerConfig([
  {
    // component: lazy(() => import("../page-temp/auth")),
    auth: false,
    authRedirect: "/",
    routers: [
      {
        path: "/login-with-email",
        // component: lazy(() => import("../pages/auth/login")),
        name: "loginWithEmail",
      },
      {
        path: "/login-with-phone",
        // component: lazy(() => import("../page-temp/auth/login/LoginWithPhone")),
        name: "loginWithPhone",
      },
      {
        path: "/welcome-back",
        // component: lazy(() => import("../pages/welcome-back-----")),
        name: "welcomeBack",
      },
    ],
  },
  {
    // component: lazy(() => import("../page-temp/auth/SignUp")),
    auth: false,
    authRedirect: "/",
    routers: [
      {
        path: "/register",
        // component: lazy(() => import("../page-temp/auth/register")),
        name: "register",
      },
    ],
  },
  {
    // component: lazy(() => import("../page-temp/auth/Forgot")),
    auth: false,
    authRedirect: "/",
    routers: [
      {
        path: "/forgot-password",
        // component: lazy(() => import("../page-temp/auth/forgot_password")),
        name: "forgotPassword",
      },
      {
        path: "/reset-password",
        // component: lazy(() => import("../page-temp/auth/reset_password")),
        name: "resetPassword",
      },
    ],
  },
  {
    // component: lazy(() => import("../components/layouts/MainLayout")),
    routers: [
      {
        path: "/",
        exact: true,
        // component: lazy(() => import("../pages/home------")),
        name: "home",
      },
      {
        path: "/contact",
        exact: true,
        name: "contact",
      },
      {
        path: "/privacy-policy",
        exact: true,
        name: "privacyPolicy",
      },
      {
        path: "/term-of-services",
        exact: true,
        name: "termOfServices",
      },
      {
        path: "/about-us",
        exact: true,
        name: "aboutUs",
      },
      // --------Package------------
      {
        path: "/package",
        exact: true,
        // component: lazy(() => import("../pages/package")),
        name: "package",
      },
      {
        // path: '/package/:id',
        path: "/package/:slug",
        exact: true,
        // component: lazy(() => import("../pages/package_detail")),
        name: "packageDetail",
      },

      // ----------Booking--------

      {
        auth: true,
        routers: [
          {
            path: "/book-appointment",
            exact: true,
            // component: lazy(() => import("../pages/book_appointment")),
            name: "bookAppointment",
          },
          {
            path: "/telemedicine",
            name: "telemedicine",
            exact: true,
            // component: lazy(() => import("../pages/telemedicine")),
          },
          {
            path: "/book-appointmentsuccess",
            exact: true,
            // component: lazy(() => import("../pages/book_appointment/successfully")),
            name: "bookAppointmentSuccess",
          },
          {
            path: "/view-cart",
            exact: true,
            // component: lazy(() => import("../pages/cart/view_cart")),
            name: "viewCart",
          },
          {
            path: "/checkout",
            exact: true,
            // component: lazy(() => import("../pages/cart/checkout")),
            name: "checkout",
          },
          {
            path: "/checkout/success/:id",
            exact: true,
            // component: lazy(() => import("../pages/cart/successfully")),
            name: "checkoutSuccessfully",
          },
        ],
      },
      {
        path: "/account",
        auth: true,
        // component: lazy(() => import('../components/layouts/EmtyLayout')),
        routers: [
          {
            path: "/my-appointment",
            // component: lazy(() => import("../pages/account/my_appointment")),
            name: "myAppointment",
            exact: true,
          },
          {
            path: "/my-appointment/:id",
            // component: lazy(() => import("../pages/account/my_appointment_detail")),
            name: "myAppointmentDetail",
          },
          {
            path: "/order",
            // component: lazy(() => import("../pages/account/my_order")),
            name: "myOrder",
            exact: true,
          },
          {
            path: "/my-favorite",
            // component: lazy(() => import("../pages/account/my_favorite")),
            name: "myFavoritedPackage",
            exact: true,
          },
          {
            path: "/order/:id",
            // component: lazy(() => import("../pages/account/my_order_detail")),
            name: "myOrderDetail",
          },
          {
            path: "/medical-profile/:userId/:tab?/:healthTab?",
            // component: lazy(() => import("../pages/account/medical_profile")),
            name: "medicalProfile",
            exact: true,
          },
          {
            // component: lazy(() => import("../pages/account/my_account")),
            name: "myAccount",
            exact: true,
          },

          // {
          //     exact: true,
          //     name: 'myAccount'
          // },
          {
            path: "/",
            exact: true,
            name: "myAccount",
          },
          {
            path: "/my-payment",
            // component: lazy(() => import("../pages/account/my_payment")),
            exact: true,
            name: "myPayment",
          },

          // ---------Cart-------
        ],
      },
    ],
  },
]);
