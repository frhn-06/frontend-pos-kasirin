import { toasterContext } from '@/context/toasterContext';
import AuthService from '@/services/auth.service';
import { IUser } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'

const schemaInfo = yup.object({
    userName: yup.string().required("nama pengguna harus diisi"),
    fullName: yup.string().required("nama lengkap harus diisi"),
    email: yup.string().required("email harus diisi"),
});


const useTabInfo = () => {
    const toaster = useContext(toasterContext);



    const {control: controlTabInfo, handleSubmit: handleSubmitTabInfo, setValue: setValueTabInfo, formState: {errors:errorsTabInfo}, setError:setErrorTabInfo, getValues: getValuesTabInfo} = useForm({
        resolver: yupResolver(schemaInfo)
    });



    const UpdateInfo = async(payload: IUser) => {
        const {data} = await AuthService.update(payload);
        return data
    }

    const {mutate: mutateUpdateInfo, isPending: isPendingUpdateInfo, isSuccess:isSuccessUpdateInfo} = useMutation({
        mutationFn: (payload: IUser) => UpdateInfo(payload),
        onError: (error) => {
            setErrorTabInfo("root", {
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
                message: "berhasil update info user"
            });
        }
    })


    const onUpdateInfo = (payload: IUser) => {
        mutateUpdateInfo(payload);
    }

    

    return {
        controlTabInfo,
        handleSubmitTabInfo,
        setErrorTabInfo,
        errorsTabInfo,
        setValueTabInfo,
        getValuesTabInfo,

        isPendingUpdateInfo,
        isSuccessUpdateInfo,

        onUpdateInfo
    }
}

export default useTabInfo