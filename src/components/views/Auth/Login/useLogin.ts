import { toasterContext } from "@/context/toasterContext";
import { ILogin } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

const schemaLogin = yup.object({
    identifier: yup.string().required("email atau username harus diisi"),
    password: yup.string().min(3, "password minimal 3 huruf").test("kapital", "password harus mengandung huruf kapital", (value) => {
        if(!value) return false;
        return /[A-Z]/.test(value)
    }).test("angka", "password harus mengandung angka", (value) => {
        if(!value) return false;
        return /[0-9]/.test(value)
    }).required("password harus diisi")
})

const useLogin = () => {
    const router = useRouter();

    const {setToaster} = useContext(toasterContext);

    const [hidePassword, sethidePassword] = useState(true);

    const onClickHide = () => {
        sethidePassword(!hidePassword);
    }



    const {control, handleSubmit: handleSubmitLogin, formState: {errors}, reset, setError} = useForm({
        resolver: yupResolver(schemaLogin)
    })

    const callbackurl :string = router.query.callbackUrl as string || "/"

    const login = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            identifier: payload.identifier,
            password: payload.password,
            redirect: false,
            callbackUrl: callbackurl
        })

        if(result?.error && result.status === 401) {
            throw new Error("email atau username tidak sesuai dengan password anda")
        }
    }


    const {mutate: mutateLogin, isPending:isPendingLogin, isSuccess:isSuccessLogin} = useMutation({
        mutationFn: (payload: ILogin) => login(payload),
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
        onSuccess: (data) => {
            setToaster({
                type: "success",
                message: "login berhasil"
            })
            reset();
            console.log(data);
            router.push(callbackurl)
        }
    })
    

    const onLogin = (payload: ILogin) => {
        mutateLogin(payload);
    }


    return {
        hidePassword,
        onClickHide,

        control,
        errors,
        handleSubmitLogin,

        isSuccessLogin,
        isPendingLogin,

        onLogin
    }
}


export default useLogin;