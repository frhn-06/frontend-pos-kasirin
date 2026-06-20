import instance from "@/libs/axios";
import endpoint from "./endpoint";

const exportService = {
    salesExcel: (params?: {start?: string; end?:string}) => instance.get(`${endpoint.EXPORT}/excel-sales`, {
        params: params,
        responseType: "blob"
    }),

    productExcel: (params?: {start?: string; end?: string}) => instance.get(`${endpoint.EXPORT}/excel-product`, {
        params: params,
        responseType: "blob"
    })
}

export default exportService;