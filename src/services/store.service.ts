import instance from "@/libs/axios";
import endpoint from "./endpoint";
import { IStore } from "@/types/store";

const StoreService = {
    create: (payload: IStore) => instance.post(`${endpoint.STORE}`, payload),

    getStore: () => instance.post(`${endpoint.STORE}`),

    update: (storeId: string, payload: IStore) => instance.put(`${endpoint.STORE}/${storeId}`, payload),
}

export default StoreService;