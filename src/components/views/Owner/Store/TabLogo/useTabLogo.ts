import { toasterContext } from '@/context/toasterContext';
import useMediaHandler from '@/hooks/useMediaHandler';
import StoreService from '@/services/store.service';
import { ISesson } from '@/types/auth';
import { IStore } from '@/types/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaLogo = yup.object({
    logo: yup.string()
})

const useTabLogo = () => {
    const session = useSession();
    const storeId = (session?.data?.user as ISesson)?.storeId; 

    const toaster = useContext(toasterContext);

    const {
        mutateAddOneImage,
        isPendingAddOneImage,
        isSuccessAddOneImage,

        mutateRemoveOneImage,
        isPendingRemoveOneImage,
        isSuccessRemoveOneImage
    } = useMediaHandler();



    const {handleSubmit:handleSubmitTabLogo, formState:{errors:errorsTabLogo}, control: controlTabLogo, setError:setErrorTabLogo, watch: watchTabLogo, setValue: setValueTabLogo} = useForm({
        resolver: yupResolver(schemaLogo)
    })


    const fotoOnLoad = watchTabLogo("logo");

    const handleChangeImg = (e: ChangeEvent<HTMLInputElement> ,onChange:(files: FileList) => void) => {
        const files = e.target.files;
        
        if(files) {
            const file = files[0];
            onChange(files);

            mutateAddOneImage({
                file: file,
                callback: (url: string) => {
                    console.log(url);
                    setValueTabLogo("logo", url)
                }
            })
        }
    }


    const handleRemoveImg = (url: string, onChange:(files: FileList | null) => void) => {
        if(url) {
            mutateRemoveOneImage({
                url: url,
                callback: () => {
                    onChange(null);
                    setValueTabLogo("logo", "");
                }
            })
        }
    }

    


    const updateLogo = async(payload: IStore) => {
        const {data} = await StoreService.update(`${storeId}`, payload);
        return data
    }

    const {mutate: mutateUpdateLogo, isPending: isPendingUpdateLogo, isSuccess:isSuccessUpdateLogo} = useMutation({
        mutationFn: (payload: IStore) => updateLogo(payload),
        onError: (error) => {
            setErrorTabLogo("root", {
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
                message: "berhasil update logo toko"
            });
            setValueTabLogo("logo", undefined)
        }
    })


    const onUpdateLogo = (payload: IStore) => {
        mutateUpdateLogo(payload);
    }

    return {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        
        controlTabLogo,
        handleSubmitTabLogo,
        errorsTabLogo,

        fotoOnLoad,

        handleChangeImg,
        handleRemoveImg,

        isPendingUpdateLogo,
        isSuccessUpdateLogo,
        
        onUpdateLogo
    }
}

export default useTabLogo