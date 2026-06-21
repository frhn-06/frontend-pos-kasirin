import { toasterContext } from '@/context/toasterContext';
import StoreService from '@/services/store.service';
import { ISesson } from '@/types/auth';
import { IStore } from '@/types/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'

const schemaInfo = yup.object({
    name: yup.string().required("name harus diisi"),
    address: yup.string().required("alamat harus diisi"),
    phone: yup.string().required("no hp harus diisi"),
    description: yup.string()
});


const useTabInfo = () => {
    const toaster = useContext(toasterContext);

    const session = useSession();
    const storeId = (session?.data?.user as ISesson)?.storeId;


    const {control: controlTabInfo, handleSubmit: handleSubmitTabInfo, setValue: setValueTabInfo, formState: {errors:errorsTabInfo}, setError:setErrorTabInfo, getValues: getValuesTabInfo} = useForm({
        resolver: yupResolver(schemaInfo)
    });



    const UpdateInfo = async(payload: IStore) => {
        const {data} = await StoreService.update(`${storeId}`, payload);
        return data
    }

    const {mutate: mutateUpdateInfo, isPending: isPendingUpdateInfo, isSuccess:isSuccessUpdateInfo} = useMutation({
        mutationFn: (payload: IStore) => UpdateInfo(payload),
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
                message: "berhasil update info toko"
            });
        }
    })


    const onUpdateInfo = (payload: IStore) => {
        const final = {
            ...payload,
            phone: Number(payload.phone)
        }
        mutateUpdateInfo(final);
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