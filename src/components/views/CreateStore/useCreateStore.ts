import { toasterContext } from '@/context/toasterContext';
import StoreService from '@/services/store.service';
import { ISesson } from '@/types/auth';
import { IStore } from '@/types/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaStore = yup.object({
    name: yup.string().required("nama store harus diisi"),
    phone: yup.string().test("angka", "nomor telepon harus mengandung angka", (value) => {
        if(!value) return false
        return /^\d+$/.test(value)
    }).required("nomor telepon harus diisi"),
    address: yup.string().required("address harus diisi"),
    descriptiom: yup.string()
})

const useCreateStore = () => {

    const {setToaster} = useContext(toasterContext);

    const {control, handleSubmit:handleSubmitStore, formState: {errors}, reset, setError} = useForm({
        resolver: yupResolver(schemaStore)
    })

    const createStore = async (payload: IStore) => {
        const {data} = await StoreService.create(payload);
        return data;
    }
    const {mutate:mutateStore, isPending:isPendingStore, isSuccess: isSuccessStore} = useMutation({
        mutationFn: (payload: IStore) => createStore(payload),
        onError: (error) => {
            setError("root", {
                type: "server",
                message: error.message
            });
            setToaster({
                type: "error",
                message: error.message
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "berhasil membuat toko, silahkan login ulang"
            });
            reset();
        }
    })

    const onCreateStore = (payload: IStore) => {
        mutateStore(payload)
        // console.log(payload);
    }
    return {
        control,
        handleSubmitStore,
        errors,
        
        onCreateStore,

        isPendingStore,
        isSuccessStore,
    }
}

export default useCreateStore;