import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import { cartActions } from './cart'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, thunkMiddleware]
})

sagaMiddleware.run(rootSaga)

// store.dispatch(userActions.fetchProfile())
store.dispatch(cartActions.fetchCartInfo())
store.dispatch(cartActions.getPreCheckout())

export default store

export * from './rootSelector'