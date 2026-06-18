import instance from "@/libs/axios";
import endpoint from "./endpoint";

const reportService = {
    sales: (query: string) => instance.get(`${endpoint.REPORT}/sales?${query}`),

    product: (query: string) => instance.get(`${endpoint.REPORT}/product?${query}`)
}

export default reportService;