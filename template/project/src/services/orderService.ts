import { InputCartCheckout, Order, OrderItemResponse, PayloadOrder, ResponseOrder } from "@types"
import { ORDER_API } from "constant/api"
import { http, URLGetParams } from "lib/cbi-react-core"

const orderService = {
    order(data: PayloadOrder) {
        // const temp = {
        //     ...data,
        //     orderItems: data.orderItems
        // }
        return http.post<HttpResponse<ResponseOrder>>(`${ORDER_API}/orders`, data)
    },
    getOrderDetail(id: string) {
        return http.get<HttpResponse<Order>>(`${ORDER_API}/orders/${id}`)
    },
    getCount(query?: URLGetParams){
        return http.get<HttpResponse<{totalCount: number}>>(`${ORDER_API}/orders/count`, query)
    },
    getOrders(query?: URLGetParams) {
        return http.get<HttpResponse<Order[]>>(`${ORDER_API}/orders`, query)
    },
    getOrdersPaid(query?: URLGetParams) {
        return http.get<HttpResponse<Order[]>>(`${ORDER_API}/orders?filter[isPaid][eq]=true&limit=10`, query)
    },
    getOrdersWaitConfirm(query?: URLGetParams) {
        return http.get<HttpResponse<Order[]>>(`${ORDER_API}/orders?filter[isPaid][eq]=false&limit=10`, query)
    },
    getOrdersCancelled(query?: URLGetParams) {
        return http.get<HttpResponse<Order[]>>(`${ORDER_API}/orders?filter[status][eq]=cancelled&limit=10`, query)
    },
}

export default orderService
