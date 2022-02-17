
import { PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem, CartState, InputUpdateCartQuantity, PreCheckoutResponse } from "@types";
import { ERROR_CODE } from "constant/error_code";
import { http, storage } from "lib/cbi-react-core";
import { call, delay, put, putResolve, select, takeLatest } from "redux-saga/effects";
import cartService from "services/cartService";
import productService from "services/productService";
import { authActions } from "store/auth";
import { RootState } from "store/rootReducer";
import { cartSelector, PayloadActionPreCheckout, PayloadActionRemoveItem } from ".";
import { cartActions, initialState } from "./cart.reducer";
import { getListItemPreCheckout } from "./cart.selector";

// function* checkAuth(): any {
//     const store: RootState = yield select()
//     if (!store.auth.user) {
//         yield put(pageActions.toggleRequestLogin(true))
//     }
// }


function* addCart(action: PayloadAction<{ productId: string, quantity: number }>) {
    try {
        yield call(cartService.addCart, { products: [action.payload], targetId: null, type: 'global' })
        yield getCartInfo()
        // yield put(cartActions.fetchCart())
    } catch (err) {
        console.log('err', err)
    }
}

function* removeItem(action: PayloadActionRemoveItem) {
    try {
        yield call(cartService.removeItem, action.payload)


        let list: CartState['listCartItemCheckout'] = yield select(getListItemPreCheckout)

        let f = list.find(e => e === action.payload)
        if (f) {
            yield put(cartActions.removeItemPreCheckout(f))
        }

        yield getCartInfo()

    } catch (err) {
        console.log('err', err)
    }
}

function* updateQuantity(action: PayloadAction<InputUpdateCartQuantity>) {
    try {
        yield delay(200)
        yield call(cartService.udpateQuantity, action.payload)

        yield getCartInfo()
        const list: CartState['listCartItemCheckout'] = yield select(getListItemPreCheckout)
        if (list.some(e => e === action.payload.productId)) {
            yield put(cartActions.getPreCheckout())
        }
        // yield put(cartActions.fetchCart())

    } catch (err) {
        console.log('err', err)
    }
}

const removeItemDisable = (e: CartItem) => !e.disabled

function* getCartInfo(): any {
    try {
        if (http.getToken()) {

            // const cart: CartState = yield select(cartSelector)

            const res: HttpResponse<Cart> = yield call(cartService.getCart)

            if (res.data) {
                // let r: any = yield call(getProductCart, cart.cart.cartDetail?.[0]?.cartItems || [], res.data.cartDetail?.[0].cartItems)
                res.data.cartDetail = res.data.cartDetail.map(e => ({ ...e, cartItems: e.cartItems.filter(removeItemDisable) }))
                yield putResolve(cartActions.set({
                    cart: res.data,
                    isFetching: false
                }))
                // yield putResolve(cartActions.set({
                //     cart: {
                //         ...res.data,
                //         cartDetail: [
                //             {
                //                 ...res.data.cartDetail?.[0],
                //                 cartItems: r
                //             }
                //         ]
                //     },
                //     isFetching: false
                // }))
            }
        }
    } catch (err) {
        console.log('err', err)
    }
}

function* clearCart() {
    yield put(cartActions.clearCart())
    storage.delete('listItemCheckout')
}

function* getPreCheckout(): any {
    try {
        yield putResolve(cartActions.set({
            isFetchingPreCheckout: true
        }))
        const store: RootState = yield select()
        let listItemsCheckout = store.cart.listCartItemCheckout
        if (listItemsCheckout.length > 0) {
            const result: HttpResponse<PreCheckoutResponse> = yield call(cartService.getPreCheckout, {
                selectedCartItems: listItemsCheckout,
                couponIds: []
            })
            if (result.data) {

                yield put(cartActions.set({
                    preCheckout: result.data,
                    isFetchingPreCheckout: false
                }))

            } else if (result.error === ERROR_CODE.CART_ITEM_NOT_IN_LIST) {
                yield put(cartActions.removeAllItemPreCheckout())
                listItemsCheckout = []
            }
        } else {
            yield put(cartActions.set({
                preCheckout: {
                    ...initialState.preCheckout
                },
                isFetchingPreCheckout: false
            }))
        }
        // yield putResolve(cartActions.set({
        //     isFetchingPreCheckout: false
        // }))
        storage.set('listItemCheckout', listItemsCheckout)

    } catch (err) {
        console.log(err);
    }
}


export function* cartSaga() {

    yield takeLatest([cartActions.addCart.type], addCart)
    yield takeLatest([cartActions.removeItem.type], removeItem)
    yield takeLatest([cartActions.updateQuantity.type], updateQuantity)
    yield takeLatest([cartActions.getPreCheckout.type], getPreCheckout)
    yield takeLatest([authActions.login.type], getCartInfo)
    yield takeLatest([authActions.logout.type], clearCart)

    yield takeLatest([cartActions.fetchCartInfo.type], getCartInfo)


    yield takeLatest([
        cartActions.addItemPreCheckout.type,
        cartActions.removeItemPreCheckout.type,
        cartActions.addAllItemPreCheckout.type,
        cartActions.removeAllItemPreCheckout.type,
    ], getPreCheckout)

}