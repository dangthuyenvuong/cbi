import { AppProps } from "next/app"
import { AppProvider } from "lib/cbi-react-core";
import { TranslateProvider } from "lib/cbi-react-translate";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider, createTheme } from '@mui/material'
import store from "store";
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import 'assets/style/style.scss'
import { PageProvider } from "hooks/usePage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { NextPage } from "next";
import Head from 'components/atoms/Head'

const theme = createTheme({
    palette: {
        primary: {
            main: '#14c1c2',
            contrastText: 'white'
        },
        error: {
            main: '#ff6d6f'
        }
    },
    typography: {
        button: {
            fontFamily: 'Mulish'
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                style: {
                    height: 62,
                },
                className: 'text-field',
            },
        },
    },
});

const publishableKey = "pk_test_51Jex8JIub2RNmWLMzutVV6fT10rlNXOnjk1YxfjaPKsO1KciL5Fl26YvcK3X17rkgN2bwaB7BzP0f78tIjG3RhVV00yYDfcNnh"
const stripePromise = loadStripe(publishableKey);

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <TranslateProvider>
                <AppProvider store={store}>
                    <PageProvider>
                        <ThemeProvider theme={theme}>
                            <Elements stripe={stripePromise}>

                                <Head>
                                    <title>eHealthPlatform</title>
                                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                                </Head>
                                {getLayout(<Component {...pageProps} />)}
                            </Elements>
                        </ThemeProvider>
                    </PageProvider>
                </AppProvider>
            </TranslateProvider>
        </LocalizationProvider>
    )
}

export default App
