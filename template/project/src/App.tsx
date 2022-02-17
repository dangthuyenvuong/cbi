import { AppProvider } from "lib/cbi-react-core";
import { TranslateProvider } from "lib/cbi-react-translate";
import { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material'
import { renderRouters } from "routers";
import store from "store";
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import './assets/style/style.scss'
import { Helmet } from "react-helmet";
import { PageProvider } from "hooks/usePage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


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
    shape: {
        // borderRadius: 100,
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
        // MuiButton:{
        //   defaultProps: {
        //     style: {
        //       minWidth: 'un'
        //     }        
        //   },
        //   styleOverrides: {
        //   }
        // }
    },

    // shadows: Array(25).fill("none") as any
});

const publishableKey = "pk_test_51Jex8JIub2RNmWLMzutVV6fT10rlNXOnjk1YxfjaPKsO1KciL5Fl26YvcK3X17rkgN2bwaB7BzP0f78tIjG3RhVV00yYDfcNnh"
const stripePromise = loadStripe(publishableKey);

function App() {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <TranslateProvider>
                <AppProvider store={store}>
                    <PageProvider>
                        <ThemeProvider theme={theme}>
                            <Elements stripe={stripePromise}>

                                <Helmet>
                                    <title>eHealthPlatform</title>
                                </Helmet>
                                <Suspense fallback={<div></div>}>
                                    <Switch>
                                        {renderRouters}
                                    </Switch>
                                </Suspense>

                            </Elements>
                        </ThemeProvider>
                    </PageProvider>
                </AppProvider>
            </TranslateProvider>
        </LocalizationProvider>
    );
}

export default App;
