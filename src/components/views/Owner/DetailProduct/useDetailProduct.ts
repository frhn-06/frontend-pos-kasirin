
import { toasterContext } from '@/context/toasterContext'
import useMediaHandler from '@/hooks/useMediaHandler'
import categoryService from '@/services/category.service'
import productService from '@/services/product.service'
import {  IProductUpdate } from '@/types/product'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schemaUpdateProduct = yup.object({
    name: yup.string().required("nama tidak boleh kosong"),
    img: yup.string(),
    oldImg: yup.string(),
    categoryId: yup.string().required("kategori tidak boleh kosong"),
    price: yup.number().required("harga tidak boleh kosong"),
    description: yup.string()
})

const useDetailProduct = () => {

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

    const {control, handleSubmit:handleSubmitProduct, formState: {errors}, setValue, watch, setError, reset} = useForm({
        resolver: yupResolver(schemaUpdateProduct)
    })


    const fotoOnLoad = watch("img");


    const getById = async() => {
        const {data} = await productService.getById(`${router.query.id}`);
        return {data}
    }

    const {data:dataProduct, isLoading: isLoadingProduct, refetch:refetchProduct, isRefetching:isRefetchingProduct} = useQuery({
        queryKey: ["Product", router.query.id],
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


    const updateProduct =  async(payload: IProductUpdate, callback: () => void) => {
        const {data} = await productService.update(`${router.query.id}` ,payload);
        if(data.meta.status === 200) {
            callback();
        }
        return data
    }

    const {mutate:mutateUpdateProduct, isPending:isPendingUpdateProduct, isSuccess:isSuccessUpdateProduct} = useMutation({
        mutationFn: (object:{data: IProductUpdate; callback: () => void}) => updateProduct(object.data, object.callback),
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
                message: "berhasil mengupdate produk"
            });
            
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


    const onUpdateProduct = (payload: IProductUpdate) => {
        const finalImg = payload.img || payload.oldImg;

        const dataFinal = {
            name: payload.name,
            img: finalImg,
            categoryId: payload.categoryId,
            price: payload.price,
            description: payload.description,
        }

        mutateUpdateProduct({
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

        dataProduct,
        isLoadingProduct,
        refetchProduct,
        isRefetchingProduct,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        handleRemoveImg,

        control,
        handleSubmitProduct,
        errors,
        setValue,
        reset,

        isPendingUpdateProduct,
        isSuccessUpdateProduct,
        onUpdateProduct,

        mutateRemoveOneImage,

        dataCategoriesInputAdd,
        isLoadingCategoriesInputAdd
    }
}

export default useDetailProduct