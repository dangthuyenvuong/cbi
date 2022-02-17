import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FetchAction, InputCartCheckout, Order, OrderState, PayloadOrder, ResponseOrder } from "@types"
import orderService from "services/orderService"

const initialState: OrderState = {
    checkoutFetching: false,
    paymentStatus: false,
    clientSecret: "",
    orderId: "",

    orderWaitConfirm: [],
    orderPaid: [],
    orderCancelled: []
}
const name = 'order'

// export const fetchCheckout = createAsyncThunk(
//     `${name}/fetchCheckout`,
//     async (params: {
//         cart: InputCartCheckout,
//         success?: (order?: Order) => void
//     }) => {
//         const res: HttpResponse<Order> = await orderService.order(params.cart)
//         params?.success?.(res?.data)
//     }
// )


export type PayloadActionPayment = FetchAction<InputCartCheckout>
export type PayloadActionOrder = FetchAction<PayloadOrder, ResponseOrder>
export type PayloadGetOWC = PayloadAction<{
    page: string
}>
export const { reducer: orderReducer, actions: orderActions } = createSlice({
    initialState,
    name,
    reducers: {
        //eslint-disable-next-line
        pay (state, action: PayloadActionPayment ) { 
            // call saga
        },
        setClientSecret(state, action) {
            state.clientSecret = action.payload;
        },
        
        setOrderId(state, action) {
            state.orderId = action.payload;
        },

        setCheckoutFetching(state, action) {
            state.checkoutFetching = action.payload;
        },

        setOrderWaitConfirm(state, action: PayloadAction<Order[]>) {
            state.orderWaitConfirm = action.payload
        },

        setOrderPaid(state, action: PayloadAction<Order[]>) {
            state.orderPaid = action.payload
        },

        setOrderCancelled(state, action: PayloadAction<Order[]>) {
            state.orderCancelled = action.payload
        },

        getOrderWaitConfirm(state, action: PayloadGetOWC ) {
            //call saga
        },

        getOrderPaid(state, action: PayloadGetOWC ) {
            //call saga
        },

        getOrderCancelled(state, action: PayloadGetOWC ) {
            //call saga
        },

        order(state, action: PayloadActionOrder){

        }
    },

    // extraReducers: (builder) => {
    //     builder.addCase(fetchCheckout.pending, (state) => {
    //         state.checkoutFetching = true
    //     })
    //     builder.addCase(fetchCheckout.fulfilled, (state) => {
    //         state.checkoutFetching = false
    //     })
    // }
})


