import useDebaunce from "@/hooks/useDebaunce";
import productService from "@/services/product.service";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/constanta";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, SetStateAction } from "react";

const usePos = () => {
    
    const router = useRouter();

    const {debaunce} = useDebaunce();

    const currentPage = router.query.page;
    const currentLimit = router.query.limit;
    const currentCategory = router.query.category;
    const currentSearch = router.query.search;

    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                limit: currentLimit || "",
                category: currentCategory || "",
                search: currentSearch || ""
            }
        })
    }

    const getProducts = async () => {
        const params = `page=${currentPage}&limit=${currentLimit}&category=${currentCategory}&search=${currentSearch}`;
        const {data} = await productService.getAll(params);
        return data;
    }

    const {data: dataProducts, isLoading: isLoadingProducts, refetch:refetchProducts, isRefetching:isRefetchingProducts} = useQuery({
        queryKey: ["ProductsPos", currentPage, currentLimit, currentCategory, currentSearch],
        queryFn: getProducts,
        enabled: router.isReady && !!currentPage  
    })



    const handlePage = (e:number) => {
        router.replace({
            query: {
                ...router.query,
                page: e
            }
        })
    }

    const handleLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        router.replace({
            query: {
                ...router.query,
                limit: e.target.value,
                page: 1
            }
        })
    }

    const handleCategory = (e: string) => {
        router.replace({
            query: {
                ...router.query,
                category: e,
                page: 1,
                search: ""
            }
        })
    } 


    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        debaunce(() => {
            router.replace({
                query: {
                    ...router.query,
                    search: e.target.value,
                    page: 1
                }
            })
        }, 1000)
    }

    const handleClearSearch = () => {
        router.replace({
            query: {
                ...router.query,
                search: "",
                page: 1
            }
        })
    }


    return {
        currentPage,
        currentLimit,
        currentCategory,
        currentSearch,

        handlePage,
        handleLimit,
        handleCategory,
        handleSearch,
        handleClearSearch,

        setUrl,

        dataProducts,
        isLoadingProducts,
        refetchProducts,
        isRefetchingProducts
    }
}   

export default usePos;