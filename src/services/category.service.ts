import instance from "@/libs/axios";
import { ICategory } from "@/types/category";
import endpoint from "./endpoint";

const categoryService = {
    create: (payload: ICategory) => instance.post(`${endpoint.CATEGORY}`, payload),

    getAll: () => instance.get(`${endpoint.CATEGORY}`),

    getById: (id:string) => instance.get(`${endpoint.CATEGORY}/${id}`),

    update: (id:string, payload: ICategory) => instance.put(`${endpoint.CATEGORY}/${id}/update`, payload),

    deleteById: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}/remove`)
}


export default categoryService;