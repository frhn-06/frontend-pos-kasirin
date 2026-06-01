import instance from "@/libs/axios";
import { IProduct } from "@/types/product";
import endpoint from "./endpoint";

const productService = {
    create: (payload: IProduct) => instance.post(`${endpoint.PRODUCT}`, payload),
    
    getAll: (params: string) => instance.get(`${endpoint.PRODUCT}?${params}`)
}

export default productService;