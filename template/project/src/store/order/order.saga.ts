import { Order, ResponseOrder } from "@types";
import { http } from "lib/cbi-react-core";
import { call, put, takeLatest } from "redux-saga/effects";
import orderService from "services/orderService";
import { cartActions } from "store/cart";
import { orderActions, PayloadActionOrder, PayloadActionPayment, PayloadGetOWC } from "./order.reducer";


function* pay(action: PayloadActionPayment) {
    try {
        if (http.getToken()) {
            // eslint-disable-next-line
            // const res: HttpResponse<any> = yield call(orderService.order, action.payload.data)
            // if (res.data) {
                
            //     const clientSecret = res.data.payment.metadata.clientSecret;
            //     yield put(orderActions.setClientSecret(clientSecret))
            //     yield put(orderActions.setOrderId(res.data.orders[0].id))
            // }
        }

    } catch (err) {
        console.log('err', err)
    }
}

function* order(action: PayloadActionOrder) {
    try {
        const res: HttpResponse<ResponseOrder> = yield call(orderService.order, action.payload.data)
        
        action.payload?.callback?.(res)
        // if (res.data) {
        //     // console.log(res.data);                
        //     // yield put(cartActions.fetchCartInfo)
        //     const clientSecret = res.data.payment.metadata.clientSecret;

        //     // yield put(orderActions.setClientSecret(clientSecret))
        //     // yield put(orderActions.setOrderId(res.data.orders[0].id))
        // }

    } catch (err) {
        console.log('err', err)
    }
}

function* setOrderWaitConfirm(action: PayloadGetOWC) {
    try {
        if (http.getToken()) {
            const result: HttpResponse<Order[]> = yield call(orderService.getOrdersWaitConfirm, action.payload)
            if (result.data) {
                yield put(orderActions.setOrderWaitConfirm(result.data))
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function* setOrderPaid(action: PayloadGetOWC) {
    try {
        if (http.getToken()) {
            const result: HttpResponse<Order[]> = yield call(orderService.getOrdersPaid, action.payload)
            if (result.data) {
                yield put(orderActions.setOrderPaid(result.data))
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function* setOrderCancelled(action: PayloadGetOWC) {
    try {
        if (http.getToken()) {
            const result: HttpResponse<Order[]> = yield call(orderService.getOrdersCancelled, action.payload)
            if (result.data) {
                yield put(orderActions.setOrderCancelled(result.data))
            }
        }
    } catch (err) {
        console.log(err);
    }
}


export function* orderSaga() {
    yield takeLatest([orderActions.pay.type], pay)
    yield takeLatest([orderActions.getOrderWaitConfirm.type], setOrderWaitConfirm)
    yield takeLatest([orderActions.getOrderPaid.type], setOrderPaid)
    yield takeLatest([orderActions.getOrderCancelled.type], setOrderCancelled)
    yield takeLatest([orderActions.order], order)
}




