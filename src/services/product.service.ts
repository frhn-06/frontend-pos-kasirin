import instance from "@/libs/axios";
import { IProduct, IProductUpdate } from "@/types/product";
import endpoint from "./endpoint";

const productService = {
    create: (payload: IProduct) => instance.post(`${endpoint.PRODUCT}`, payload),
    
    getAll: (params: string) => instance.get(`${endpoint.PRODUCT}?${params}`),

    getById: (params: string) => instance.get(`${endpoint.PRODUCT}/${params}`),

    update: (paramas: string, payload: IProductUpdate) => instance.put(`${endpoint.PRODUCT}/${paramas}`, payload),

    deleteById: (patamas: string) => instance.delete(`${endpoint.PRODUCT}/${patamas}`)
}

export default productService;