import { Product, ProductAttribute } from "@types"
import { PRODUCT_API } from "constant/api"
import { http } from "lib/cbi-react-core"

const productService = {
    getProduct(query = '') {
        // return products
        return http.get<HttpResponse<Product[]>>(`${PRODUCT_API}/products${query}`)
    },
    detail(id: string) {
        return http.get<HttpResponse<Product>>(`${PRODUCT_API}/products/${id}`)
    },
    getCount(query?: string) {
        return http.get<HttpResponse<{ totalCount: number }>>(`${PRODUCT_API}/products/count${query ?? ''}`)
    },
    getProductRelated(categoryId?: string) {
        return http.get<HttpResponse<Product[]>>(`${PRODUCT_API}/products?limit=4&filter[featureType][eq]=ecom&filter[categoryId][eq]=${categoryId}`)
    },
    async getProductAttributes() {
        // return attributes
        return  http.get<HttpResponse<ProductAttribute[]>>(`${PRODUCT_API}/product-attributes`)
    },
    async getProductBySlug(slug: string){
        let res = await http.get<HttpResponse<Product[]>>(`${PRODUCT_API}/products?filter[slug][eq]=${slug}`)
        if(res.data?.[0]){
            return {
                data: res.data?.[0]
            }
        }

        if(res.message || res.error){
            return {
                error: res.error,
                message: res.message,
            }
        }

        return {}
    }
}


export default productService