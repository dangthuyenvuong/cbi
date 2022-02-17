
import { EnhancedStore } from '@reduxjs/toolkit'
import React from 'react'
// import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
// import { Router } from 'react-router-dom'
// import { history } from './history'
// import ScrollToTop from './scrollToTop'

type AppProviderProp = {
    store: EnhancedStore
}

export const AppProvider: React.FC<AppProviderProp> = ({ children, store }) => {
    // return (
    //     <Router history={history}>
    //         <ScrollToTop />
    //         <Provider store={store}>
    //             {/* <Helmet>
    //                 <meta charSet="utf-8" />
    //             </Helmet> */}
    //             {children}
    //         </Provider>
    //     </Router>
    // )

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}