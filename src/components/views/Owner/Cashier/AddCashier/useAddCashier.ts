;
import { toasterContext } from '@/context/toasterContext'
import cashierService from '@/services/cashier.service'
import { ICashier } from '@/types/cashier'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schemaCashier = yup.object({
    userName: yup.string().required("nama pengguna tidak boleh kosong"),
    fullName: yup.string().required("nama lengkap tidak boleh kosong"),
    email: yup.string().required("email tidak boleh kosong"),
    password: yup.string().required("kata sandi pengguna tidak boleh kosong"),
    confirmPassword: yup.string().required("konfirmasi kata sandi tidak boleh kosong")
})

const useAddCashier = () => {

    const toaster = useContext(toasterContext);


    const [merem, setMerem] = useState({
        password: true,
        confirmPassword: true
    });
    
    const setMeremMelek = (key: "password" | "confirmPassword") => {
        setMerem({
            ...merem,
            [key]: !merem[key]
        })
    }



    const {control, handleSubmit:handleSubmitCashier, formState: {errors}, setValue, watch, setError, reset} = useForm({
        resolver: yupResolver(schemaCashier)
    })



    const createCashier =  async(payload: ICashier) => {
        const {data} = await cashierService.create(payload);
        return data;
    }

    const {mutate:mutateCreateCashier, isPending:isPendingCreateCashier, isSuccess:isSuccessCreateCashier} = useMutation({
        mutationFn: (payload: ICashier) => createCashier(payload),
        onError: (error) => {
            toaster.setToaster({
                type: "error",
                message: error.message
            })
            setError("root", {
                type: "server",
                message: error.message
            })
        },
        onSuccess: () => {
            toaster.setToaster({
                type: "success",
                message: "berhasil membuat cashier"
            });
            reset();
        }
    })

    const onCreateCashier = (payload: ICashier) => {
        mutateCreateCashier(payload);
    }

    return {
        control,
        handleSubmitCashier,
        errors,
        reset,

        isPendingCreateCashier,
        isSuccessCreateCashier,
        onCreateCashier,

        merem,
        setMeremMelek
    }
}

export default useAddCashier