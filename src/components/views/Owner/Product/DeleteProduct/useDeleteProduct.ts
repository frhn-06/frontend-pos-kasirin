import { toasterContext } from "@/context/toasterContext";
import productService from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteProduct = (id: string) => {
    const toaster = useContext(toasterContext);

    const deleteProduct = async () => {
        const {data} = await productService.deleteById(id);
        return data;
    }

    const {mutate:mutateDeleteProduct, isPending:isPendingDeleteProduct, isSuccess:isSuccessDeleteProduct} = useMutation({
        mutationFn: deleteProduct,
        onError: (error) => {
            toaster.setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            toaster.setToaster({
                type: "success",
                message: "berhasil menghapus produk"
            })
        },
    });

    const onDelete = () => {
        mutateDeleteProduct();
    }
    return {
        onDelete,
        isPendingDeleteProduct,
        isSuccessDeleteProduct
    }
}

export default useDeleteProduct
