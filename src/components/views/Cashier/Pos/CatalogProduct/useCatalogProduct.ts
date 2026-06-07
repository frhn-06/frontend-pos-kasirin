import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCatalogProduct = () => {

    const router = useRouter();
    
    

    const getCategory = async() => {
        const {data} = await categoryService.getAll();
        return data
    }

    const {data:dataCategoryPos, isLoading:isLoadingCategoryPos} = useQuery({
        queryKey: ["CategoryListPos"],
        queryFn: getCategory,
        enabled: router.isReady
    })



    return {
        dataCategoryPos,
        isLoadingCategoryPos
    }
}

export default useCatalogProduct;