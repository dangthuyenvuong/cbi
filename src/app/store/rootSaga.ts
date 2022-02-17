import { notificationSaga } from './notification';
import { authSaga } from './auth';
import { demoSaga } from './demo';
import { createRootSaga } from "cbi-react-core";

const rootSaga = createRootSaga([
	notificationSaga,
	authSaga,
	demoSaga,
])

export default rootSaga