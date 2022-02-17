import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "store/rootReducer";


export const cartSelector = (store: RootState) => store.cart


export const getListItemPreCheckout = (store: RootState) => store.cart.listCartItemCheckout

export const isChecked = (id: string) => createSelector(cartSelector, ({ listCartItemCheckout }) => {
    return listCartItemCheckout.some(e => e === id)
})

export const useCart = () => useSelector(cartSelector)


export const useIsItemChecked = (id: string) => useSelector(isChecked(id))