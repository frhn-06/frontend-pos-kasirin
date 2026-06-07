import instance from "@/libs/axios";
import { IOrder } from "@/types/order";
import endpoint from "./endpoint";

const orderService = {
    create: (payload: IOrder) => instance.post(`${endpoint.ORDER}`, payload)
}

export default orderService;