import { createRootSaga } from "lib/cbi-react-core";
import { authSaga } from "./auth";
import { cartSaga } from "./cart";
import { userSaga } from "./user";
import { orderSaga } from "./order";
import {eprofileSaga} from "./eprofile"
// import {bookingSaga} from "./booking"

const rootSaga = createRootSaga([
    authSaga,
    cartSaga,
    userSaga,
    orderSaga,
    eprofileSaga,
    // bookingSaga,
])

export default rootSaga