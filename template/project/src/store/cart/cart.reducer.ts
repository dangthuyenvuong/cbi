// import {  PayloadAction } from "lib/cbi-react-core";
import { CartState } from '@types'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputSelectedCartItem, InputGetPreCheckout } from "@types"
import { storage } from 'lib/cbi-react-core';

export type PayloadActionUpdateQuantity = PayloadAction<{ productId: string, quantity: number }>
export type PayloadActionRemoveItem = PayloadAction<string>

export type PayloadActionCartItems = PayloadAction<InputSelectedCartItem>
export type PayloadActionPreCheckout = PayloadAction<InputGetPreCheckout>


export const initialState: CartState = {
    isFetching: true,
    isFetchingPreCheckout: true,
    cart: {
        cartDetail: [],
        grandTotal: 0,
        subtotal: 0,
        totalItemCount: 0,
        totalQuantity: 0,
        totalSaved: 0,
    },
    listCartItemCheckout: storage.get('listItemCheckout', []),
    preCheckout: {
        checkoutPriceData: {
            insuranceDiscountSubtotal: 0,
            couponApplied: 0,
            customTaxSubtotal: 0,
            insuranceBeforeDiscountSubtotal: 0,
            insuranceSubtotal: 0,
            merchandiseSubtotal: 0,
            shippingDiscountSubtotal: 0,
            shippingSubtotal: 0,
            shippingSubtotalBeforeDiscount: 0,
            taxExemption: 0,
            taxPayable: 0,
            totalPayable: 0,
            vatSubtotal: 0,
        },
        cartDetail: [],
        shippingOrder: null,
        promotionData: {
            coupons: [],
            priceDiscount: 0,
        },
        totalQuantity: 0,
        totalItemCount: 0,
        couponUsedQuantity: 0,
    },
    idCartRemove: "",
}


export const { actions: cartActions, reducer: cartReducer } = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        // fetchCart() { },
        // updateCart(state, action: PayloadAction<Cart>) {
        //     state.cart = action.payload
        // },
        clearCart() {
            return {
                ...initialState,
                listCartItemCheckout: []
            }
        },
        updateQuantity(_, __: PayloadActionUpdateQuantity) {
            // call saga
        },
        addCart(_, __: PayloadActionUpdateQuantity) {
            // call saga
        },
        removeItem(_, __: PayloadActionRemoveItem) {
            // call saga
        },
        fetchCartInfo(_, __: PayloadAction) {
            // call saga
        },
        addAllItemPreCheckout(state) {
            state.listCartItemCheckout = state.cart.cartDetail?.[0].cartItems.filter(e => !e.disabled).map(e => e.id) || []
        },
        addItemPreCheckout(state, action: PayloadAction<string>) {
            state.listCartItemCheckout.push(action.payload)
        },
        removeItemPreCheckout(state, action: PayloadAction<string>) {
            state.listCartItemCheckout = state.listCartItemCheckout.filter(e => e !== action.payload)
        },
        removeAllItemPreCheckout(state) {
            state.listCartItemCheckout = []
        },
        setListCartItemCheckout(state, action: PayloadActionCartItems) {
            const index = state.listCartItemCheckout.indexOf(action.payload.id)
            if (index === -1) {
                state.listCartItemCheckout.push(action.payload.id)
            } else {
                state.listCartItemCheckout = state.listCartItemCheckout.filter(item => item !== action.payload.id)
            }
        },

        // removeCartItemCheckout(state, action: PayloadActionCartItems){
        //     const index = state.listCartItemCheckout.indexOf(action.payload.id)
        //     if(index !== -1) state.listCartItemCheckout = state.listCartItemCheckout.filter(item => item !== action.payload.id)
        // },

        // setListCartItemCheckoutAllCart(state, action: PayloadAction<string[]>) {
        //     state.listCartItemCheckout = action.payload
        // },

        // resetListCartItemCheckout(state,__) {
        //     state.listCartItemCheckout = initialState.listCartItemCheckout
        // },

        // setPreCheckout (state, action : PayloadAction<PreCheckoutResponse>) {
        //     state.preCheckout = action.payload
        // },

        // resetPreCheckout (state,__){
        //     state.preCheckout = initialState.preCheckout
        // },

        getPreCheckout() {
            //call saga
        },

        setIdCartRemove(state, action: PayloadAction<string>) {
            state.idCartRemove = action.payload
        },
        set(state, action: PayloadAction<Partial<CartState>>) {
            return {
                ...state,
                ...action.payload
            }
        }

        // increment(state, action) { },
        // decrement(state, action) { }
    }
})


// cartActions.dfe