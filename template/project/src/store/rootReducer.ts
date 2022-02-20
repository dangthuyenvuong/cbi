
import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { cartReducer } from "./cart";
import { userReducer } from "./user";
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
