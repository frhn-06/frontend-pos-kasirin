import instance from "@/libs/axios";
import { IOrder } from "@/types/order";
import endpoint from "./endpoint";

const orderService = {
    create: (payload: IOrder) => instance.post(`${endpoint.ORDER}`, payload),

    findAll: (params: string) => instance.get(`${endpoint.ORDER}?${params}`),

    cancel: (orderId: string) => instance.patch(`${endpoint.ORDER}/${orderId}/cancel`),

    uncancel: (orderId: string) => instance.patch(`${endpoint.ORDER}/${orderId}/uncancel`)
}

export default orderService;