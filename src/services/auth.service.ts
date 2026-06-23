import instance from "@/libs/axios";
import { ILogin, IPassword, IRegister, IUser } from "@/types/auth";
import endpoint from "./endpoint";

const AuthService = {
    register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),

    activation: (payload: {code: string}) => instance.post(`${endpoint.AUTH}/activation`, payload),

    login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),

    getMeByToken: (token: string) => instance.get(`${endpoint.AUTH}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),

    getCashier: (storeId: string) => instance.get(`/user/${storeId}/cashier`),

    findMyUser: () => instance.get(`/user/my-profile`),

    update: (payload: IUser) => instance.put(`${endpoint.AUTH}/update-user`, payload),

    updatePassword: (payload: IPassword) => instance.put(`${endpoint.AUTH}/update-password`, payload)
}

export default AuthService;