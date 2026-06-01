
import { toasterContext } from '@/context/toasterContext'
import useMediaHandler from '@/hooks/useMediaHandler'
import categoryService from '@/services/category.service'
import productService from '@/services/product.service'
import { ICategory } from '@/types/category'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schemaProduct = yup.object({
    name: yup.string().required("nama tidak boleh kosong"),
    img: yup.string().required("foto tidak boleh kosong"),
    price: yup.number().required("harga tidak boleh kosong"),
    categoryId: yup.string().required("kategori harus diisi"),
    description: yup.string(),
})

const useAddProduct = () => {

    const toaster = useContext(toasterContext);

    const router = useRouter();

    const {
        mutateAddOneImage,
        isPendingAddOneImage,
        isSuccessAddOneImage,

        mutateRemoveOneImage,
        isPendingRemoveOneImage,
        isSuccessRemoveOneImage
    } = useMediaHandler();

    const {control, handleSubmit:handleSubmitProduct, formState: {errors}, setValue, watch, setError, reset} = useForm({
        resolver: yupResolver(schemaProduct)
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


    const createProduct =  async(payload: ICategory) => {
        const {data} = await productService.create(payload);
        return data;
    }

    const {mutate:mutateCreateProduct, isPending:isPendingCreateProduct, isSuccess:isSuccessCreateProduct} = useMutation({
        mutationFn: (payload: ICategory) => createProduct(payload),
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
                message: "berhasil membuat produk"
            });
            reset();
        }
    })


    const getCategoriesByStoreId = async () => {
        const {data} = await categoryService.getAll();
        return data;
    }

    const {data: dataCategoriesInputAdd, isLoading:isLoadingCategoriesInputAdd} = useQuery({
        queryKey: ["CategoriesForInputCreate"],
        queryFn: getCategoriesByStoreId,
        enabled: router.isReady
    })

    const onCreateProduct = (payload: ICategory) => {
        mutateCreateProduct(payload);
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
        handleSubmitProduct,
        errors,
        reset,

        isPendingCreateProduct,
        isSuccessCreateProduct,
        onCreateProduct,

        dataCategoriesInputAdd,
        isLoadingCategoriesInputAdd
    }
}

export default useAddProduct