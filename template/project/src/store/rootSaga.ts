import { createRootSaga } from "lib/cbi-react-core";
import { authSaga } from "./auth";
import { cartSaga } from "./cart";
import { userSaga } from "./user";

const rootSaga = createRootSaga([
    authSaga,
    cartSaga,
    userSaga,
])

export default rootSaga