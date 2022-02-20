import { Cart, PreCheckoutResponse, InputGetPreCheckout } from "@types"
import { CART_API } from "constant/api"
import { http } from "lib/cbi-react-core"


const cartService = {
    // addCart(data: PayloadAddToCart) {
    //     return http.post<HttpResponse>(`${CART_API}/carts/add-to-cart`, data)
    // },
    // udpateQuantity(data: InputUpdateCartQuantity) {
    //     // return http.put<HttpResponse>(`${CART_API}/carts/items/${data.productId}`, { quantity: data.quantity })
    //     return http.patch<HttpResponse>(`${CART_API}/carts/items/${data.productId}`, { quantity: data.quantity })
    // },
    removeItem(id: string) {
        return http.delete<HttpResponse>(`${CART_API}/carts/items/${id}`)
    },
    async getCart() {
        return await http.get<HttpResponse<Cart>>(`${CART_API}/carts`)
    },

    getPreCheckout(data: InputGetPreCheckout) {
        return http.post<HttpResponse<PreCheckoutResponse>>(`${CART_API}/carts/pre-checkout`, data)
    }
}


export default cartService
