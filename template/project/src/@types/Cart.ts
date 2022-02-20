import { Product } from "./Product";
// import { ServerProduct } from "./ServerProduct";

export interface CartItem {
    id: string;
    createdAt: number;
    updatedAt: number | null;
    quantity: number;
    productId: string;
    product: Product;
    disabled: boolean;
}

export interface CartDetail {
    attributes: [];
    cartItems: CartItem[];
    id: string;
    status: string;
    targetId: null;
    type: string;
}
export interface PreCheckoutResponse {
    checkoutPriceData: {
        insuranceDiscountSubtotal: number;
        couponApplied: number;
        customTaxSubtotal: number;
        insuranceBeforeDiscountSubtotal: number;
        insuranceSubtotal: number;
        merchandiseSubtotal: number;
        shippingDiscountSubtotal: number;
        shippingSubtotal: number;
        shippingSubtotalBeforeDiscount: number;
        taxExemption: number;
        taxPayable: number;
        totalPayable: number;
        vatSubtotal: number;
    };
    cartDetail: CartDetail[];
    shippingOrder: null;
    promotionData: {
        coupons: [];
        priceDiscount: number;
    };
    totalQuantity: number;
    totalItemCount: number;
    couponUsedQuantity: number;
}

export interface InputSelectedCartItem {
    id: string;
}
export interface InputGetPreCheckout {
    selectedCartItems: string[];
    couponIds: [];
}
export interface ServerCartItem {
    id: string;
    createdAt: number;
    updatedAt: number | null;
    quantity: number;
    productId: string;
    //   product?: ServerProduct;
    disabled: boolean
}

export interface ServerCart {
    subtotal: number;
    grandTotal: number;
    totalSaved: number;
    totalItemCount: number;
    totalQuantity: number;
    cartItemDetail: ServerCartItem[];
}

export interface Cart {
    subtotal: number;
    grandTotal: number;
    totalSaved: number;
    totalItemCount: number;
    totalQuantity: number;
    cartDetail: CartDetail[];
}

export interface CartState {
    cart: Cart;
    listCartItemCheckout: string[];
    preCheckout: PreCheckoutResponse;
    idCartRemove: string
    isFetching: boolean
    isFetchingPreCheckout: boolean
}

export type CartItemCheckout = {
    id: string;
};

export type CheckboxItem = {
    id: string,
    checked: boolean
}

// export interface CartState {
//     subtotal: number
//     grandTotal: number
//     totalSaved: number
//     totalItemCount: number
//     totalQuantity: number
//     cartDetail: CartDetail[]
//     listCartItemCheckout: string[]
//     preCheckout: PreCheckoutResponse
// }
