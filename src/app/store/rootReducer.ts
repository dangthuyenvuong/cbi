import { notificationReducer } from './notification';
import { authReducer } from './auth';
import { demoReducer } from './demo';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	notification: notificationReducer,
	auth: authReducer,
	demo: demoReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
