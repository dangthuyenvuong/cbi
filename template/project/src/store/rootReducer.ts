
import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { cartReducer } from "./cart";
import { orderReducer } from "./order";
import { pageReducer } from "./page";
import { userReducer } from "./user";
import {eprofileReducer} from "./eprofile"
// import {bookingReducer} from "./booking"
const rootReducer = combineReducers({
	auth: authReducer,
	page: pageReducer,
	cart: cartReducer,
	order: orderReducer,
	user: userReducer,
    eprofile : eprofileReducer,
    // booking : bookingReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
