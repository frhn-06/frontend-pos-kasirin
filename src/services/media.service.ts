import instance from "@/libs/axios";
import endpoint from "./endpoint";

const mediaService = {
    uploadOne: (form: FormData) => instance.post(`${endpoint.MEDIA}/upload-single`, form, {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    }),

    deleteOne: (url: string) => instance.delete(`${endpoint.MEDIA}/remove-single`, {data: {
        url: url
    }})
}


export default mediaService;