import instance from "@/libs/axios";
import { IRegister } from "@/types/auth";
import endpoint from "./endpoint";

const AuthService = {
    register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload)
}

export default AuthService;