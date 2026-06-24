import instance from "@/libs/axios"
import { ICashier } from "@/types/cashier"

const cashierService = {
    create: (payload: ICashier) => instance.post(`/auth/create-cashier`, payload),

    findCashier: () => instance.get(`/user/cashier/find`)
}

export default cashierService;