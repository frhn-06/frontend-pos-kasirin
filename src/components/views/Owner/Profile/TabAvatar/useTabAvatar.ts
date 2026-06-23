import { toasterContext } from '@/context/toasterContext';
import useMediaHandler from '@/hooks/useMediaHandler';
import AuthService from '@/services/auth.service';
import { ISesson, IUser } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaAvatar = yup.object({
    avatar: yup.string()
})

const useTabAvatar = () => {
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



    const {handleSubmit:handleSubmitTabAvatar, formState:{errors:errorsTabAvatar}, control: controlTabAvatar, setError:setErrorTabAvatar, watch: watchTabAvatar, setValue: setValueTabAvatar} = useForm({
        resolver: yupResolver(schemaAvatar)
    })


    const fotoOnLoad = watchTabAvatar("avatar");

    const handleChangeImg = (e: ChangeEvent<HTMLInputElement> ,onChange:(files: FileList) => void) => {
        const files = e.target.files;
        
        if(files) {
            const file = files[0];
            onChange(files);

            mutateAddOneImage({
                file: file,
                callback: (url: string) => {
                    console.log(url);
                    setValueTabAvatar("avatar", url)
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
                    setValueTabAvatar("avatar", "");
                }
            })
        }
    }

    


    const updateAvatar = async(payload: IUser) => {
        const {data} = await AuthService.update(payload);
        return data
    }

    const {mutate: mutateUpdateAvatar, isPending: isPendingUpdateAvatar, isSuccess:isSuccessUpdateAvatar} = useMutation({
        mutationFn: (payload: IUser) => updateAvatar(payload),
        onError: (error) => {
            setErrorTabAvatar("root", {
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
                message: "berhasil update avatar"
            });
            setValueTabAvatar("avatar", undefined)
        }
    })


    const onUpdateAvatar = (payload: IUser) => {
        mutateUpdateAvatar(payload);
    }

    return {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        
        controlTabAvatar,
        handleSubmitTabAvatar,
        errorsTabAvatar,

        fotoOnLoad,

        handleChangeImg,
        handleRemoveImg,

        isPendingUpdateAvatar,
        isSuccessUpdateAvatar,
        
        onUpdateAvatar
    }
}

export default useTabAvatar