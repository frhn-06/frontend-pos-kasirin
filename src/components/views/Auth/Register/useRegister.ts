import { toasterContext } from "@/context/toasterContext";
import AuthService from "@/services/auth.service";
import { IRegister } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react"
import { useForm } from "react-hook-form";

import * as yup from 'yup';

const schemaRegister = yup.object({
    email: yup.string().required("email harus diisi"),
    userName: yup.string().required("user name harus diisi"),
    fullName: yup.string().required("nama lengkap harus diisi"),
    password: yup.string().required("kata sandi harus diisi"),
    confirmPassword: yup.string().required("konfirmasi kata sandi harus diisi"),
})


const useRegister = () => {

    const {setToaster} = useContext(toasterContext);
    
    const [hidePassword, sethidePassword] = useState({password: true, confirmPassword: true});

    const onClickHide = (key: "password" | "confirmPassword") => {
        sethidePassword({
            ...hidePassword,
            [key]: !hidePassword[key]
        })
    }


    const {control, handleSubmit: handleSubmitRegister, formState: {errors}, reset, setError} = useForm({
        resolver: yupResolver(schemaRegister)
    })


    const register = async (payload: IRegister) => {
        const {data} = await AuthService.register(payload);
        return data;
    }


    const {mutate: mutateRegister, isPending:isPendingRegister, isSuccess:isSuccessRegister} = useMutation({
        mutationFn: (payload: IRegister) => register(payload),
        onError: (error) => {
            setError("root", {
                type: "server",
                message: error.message
            });
            setToaster({
                type: "error",
                message: error.message
            }) 
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "success to register"
            })
            reset();
        }
    })


    const onRegister = (payload: IRegister) => {
        mutateRegister(payload);
    }
    
    
    
    return {
        hidePassword,
        onClickHide,

        control,
        handleSubmitRegister,
        errors,

        onRegister,

        isPendingRegister,
        isSuccessRegister
    }
}

export default useRegister;