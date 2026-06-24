import { toasterContext } from '@/context/toasterContext';
import AuthService from '@/services/auth.service';
import { IPassword } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'

const newPassword = yup
    .string()
    .min(3, "password minimal 3 karakter")
    .test("angka", "password harus mngandung angka", (value) => {
        if(!value) return false;
        const regex = /(?=.*\d)/
        const lolos = regex.test(value || "");
        return lolos;
    })
    .test("kapital", "password harus mengandung huruf kapital", (value) => {
        if(!value) return false;
        const regex = /(?=.*[A-Z])/
        const lolos = regex.test(value || "");
        return lolos;
    })
    .test("karakter aneh", "password tidak boleh mengandung karakter aneh", (value) => {
        if(!value) return false;
        const regex = /^[A-Za-z0-9]+$/
        const lolos = regex.test(value || "");
        return lolos;
    })
    .required("password baru harus diisi")

const schemaPassword = yup.object({
    oldPassword: yup.string().required("password lama pengguna harus diisi"),
    newPassword: newPassword,
    confirmNewPassword: yup.string().required("password lama harus diisi"),
});


const useTabPassword = () => {
    const toaster = useContext(toasterContext);



    const {control: controlTabPassword, handleSubmit: handleSubmitTabPassword, setValue: setValueTabPassword, formState: {errors:errorsTabPassword}, setError:setErrorTabPassword, getValues: getValuesTabPassword, reset:resetTabPassword} = useForm({
        resolver: yupResolver(schemaPassword)
    });



    const UpdatePassword = async(payload: IPassword) => {
        const {data} = await AuthService.updatePassword(payload);
        return data
    }

    const {mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword, isSuccess:isSuccessUpdatePassword} = useMutation({
        mutationFn: (payload: IPassword) => UpdatePassword(payload),
        onError: (error) => {
            setErrorTabPassword("root", {
                type: "server",
                message: error.message
            });
            toaster.setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            toaster.setToaster({
                type: "success",
                message: "berhasil update info password"
            });
            resetTabPassword();
        }
    })


    const onUpdatePassword = (payload: IPassword) => {
        mutateUpdatePassword(payload);
        // console.log(payload);
    }

    

    return {
        controlTabPassword,
        handleSubmitTabPassword,
        setErrorTabPassword,
        errorsTabPassword,
        setValueTabPassword,
        getValuesTabPassword,

        isPendingUpdatePassword,
        isSuccessUpdatePassword,

        onUpdatePassword
    }
}

export default useTabPassword