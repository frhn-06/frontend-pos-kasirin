import instance from "@/libs/axios";
import { ICategory } from "@/types/category";
import endpoint from "./endpoint";

const categoryService = {
    create: (payload: ICategory) => instance.post(`${endpoint.CATEGORY}`, payload),

    getAll: () => instance.get(`${endpoint.CATEGORY}`)
}


export default categoryService;