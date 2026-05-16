import instance from "@/libs/axios";
import { IRegister } from "@/types/auth";
import endpoint from "./endpoint";

const AuthService = {
    register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),

    activation: (payload: {code: string}) => instance.post(`${endpoint.AUTH}/activation`, payload)
}

export default AuthService;