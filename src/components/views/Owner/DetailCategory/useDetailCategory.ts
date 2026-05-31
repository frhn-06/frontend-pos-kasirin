
import { toasterContext } from '@/context/toasterContext'
import useMediaHandler from '@/hooks/useMediaHandler'
import categoryService from '@/services/category.service'
import { ICategory, IcategoryUpdate } from '@/types/category'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schemaUpdateCategory = yup.object({
    name: yup.string().required("nama tidak boleh kosong"),
    img: yup.string(),
    oldImg: yup.string()
})

const useDetailCategory = () => {

    const router = useRouter();

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
        resolver: yupResolver(schemaUpdateCategory)
    })


    const fotoOnLoad = watch("img");


    const getById = async() => {
        const {data} = await categoryService.getById(`${router.query.id}`);
        return {data}
    }

    const {data:dataCategory, isLoading: isLoadingCategory, refetch:refetchCategory, isRefetching:isRefetchingCategory} = useQuery({
        queryKey: ["Category", router.query.id],
        queryFn: getById,
        enabled: !!router.query.id
    })

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


    const updateCategory =  async(payload: ICategory, callback: () => void) => {
        const {data} = await categoryService.update(`${router.query.id}` ,payload);
        if(data.meta.status === 200) {
            callback();
        }
        return data
    }

    const {mutate:mutateUpdateCategory, isPending:isPendingUpdateCategory, isSuccess:isSuccessUpdateCategory} = useMutation({
        mutationFn: (object:{data: ICategory; callback: () => void}) => updateCategory(object.data, object.callback),
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
                message: "berhasil mengupdate kategori"
            });
            
        }
    })

    const onUpdateCategory = (payload: IcategoryUpdate) => {
        const finalImg = payload.img || payload.oldImg;

        const dataFinal = {
            name: payload.name,
            img: finalImg
        }

        mutateUpdateCategory({
            data: dataFinal,
            callback: () => {
                if(payload.img && payload.oldImg !== payload.img) {
                    mutateRemoveOneImage({
                        url: `${payload.oldImg}`,
                        callback: () => {}
                    })
                }
            }
        });
        // console.log(dataFinal);
    }

    return {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        fotoOnLoad,
        handleChangeImg,

        dataCategory,
        isLoadingCategory,
        refetchCategory,
        isRefetchingCategory,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        handleRemoveImg,

        control,
        handleSubmitCategory,
        errors,
        setValue,
        reset,

        isPendingUpdateCategory,
        isSuccessUpdateCategory,
        onUpdateCategory,

        mutateRemoveOneImage
    }
}

export default useDetailCategory