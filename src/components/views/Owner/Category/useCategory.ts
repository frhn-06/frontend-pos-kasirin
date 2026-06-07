import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCategory = () => {

    const router = useRouter()

    const getCategories = async () => {
        const {data} = await categoryService.getAll();
        return data;
    }

    const {data: dataCategories, isLoading: isLoadingCategories, refetch:refetchCategories, isRefetching:isRefetchingCategories} = useQuery({
        queryKey: ["Categories"],
        queryFn: getCategories,
        enabled: router.isReady
    })

    return {
        dataCategories,
        isLoadingCategories,
        refetchCategories,
        isRefetchingCategories
    }
}

export default useCategory;