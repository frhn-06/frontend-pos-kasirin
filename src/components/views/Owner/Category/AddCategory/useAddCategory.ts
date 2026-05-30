
import { toasterContext } from '@/context/toasterContext'
import useMediaHandler from '@/hooks/useMediaHandler'
import categoryService from '@/services/category.service'
import { ICategory } from '@/types/category'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schemaCategory = yup.object({
    name: yup.string().required("nama tidak boleh kosong"),
    img: yup.string().required("foto tidak boleh kosong")
})

const useAddCategory = () => {

    const toaster = useContext(toasterContext);

    const {
        mutateAddOneImage,
        isPendingAddOneImage,
        isSuccessAddOneImage,

        mutateRemoveOneImage,
        isPendingRemoveOneImage,
        isSuccessRemoveOneImage
    } = useMediaHandler();

    const {control, handleSubmit:handleSubmitCategory, formState: {errors}, setValue, watch, setError, reset} = useForm({
        resolver: yupResolver(schemaCategory)
    })


    const fotoOnLoad = watch("img");

    const handleChangeImg = (e: ChangeEvent<HTMLInputElement> ,onChange:(files: FileList) => void) => {
        const files = e.target.files;
        
        if(files) {
            const file = files[0];
            onChange(files);

            mutateAddOneImage({
                file: file,
                callback: (url: string) => {
                    console.log(url);
                    setValue("img", url)
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
                    setValue("img", "");
                }
            })
        }
    }


    const createCategory =  async(payload: ICategory) => {
        const {data} = await categoryService.create(payload);
        return data;
    }

    const {mutate:mutateCreateCategory, isPending:isPendingCreateCategory, isSuccess:isSuccessCreateCategory} = useMutation({
        mutationFn: (payload: ICategory) => createCategory(payload),
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
                message: "berhasil membuat kategori"
            });
            reset();
        }
    })

    const onCreateCategory = (payload: ICategory) => {
        mutateCreateCategory(payload);
    }

    return {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        fotoOnLoad,
        handleChangeImg,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        handleRemoveImg,

        control,
        handleSubmitCategory,
        errors,

        isPendingCreateCategory,
        isSuccessCreateCategory,
        onCreateCategory
    }
}

export default useAddCategory