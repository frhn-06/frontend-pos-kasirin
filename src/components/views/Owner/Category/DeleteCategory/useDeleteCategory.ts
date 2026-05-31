import { toasterContext } from "@/context/toasterContext";
import categoryService from "@/services/category.service"
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategory = (id: string) => {
    const toaster = useContext(toasterContext);

    const deleteCategory = async () => {
        const {data} = await categoryService.deleteById(id);
        return data;
    }

    const {mutate:mutateDeleteCategory, isPending:isPendingDeleteCategory, isSuccess:isSuccessDeleteCategory} = useMutation({
        mutationFn: deleteCategory,
        onError: (error) => {
            toaster.setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            toaster.setToaster({
                type: "success",
                message: "berhasil menghapus kategori"
            })
        },
    });

    const onDelete = () => {
        mutateDeleteCategory();
    }
    return {
        onDelete,
        isPendingDeleteCategory,
        isSuccessDeleteCategory
    }
}

export default useDeleteCategory
