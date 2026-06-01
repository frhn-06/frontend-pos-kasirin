import useDebaunce from "@/hooks/useDebaunce";
import productService from "@/services/product.service";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/constanta";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useProduct = () => {

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
                limit: currentLimit || LIMIT_DEFAULT,
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
        queryKey: ["ProductsOwner", currentPage, currentLimit, currentCategory, currentSearch],
        queryFn: getProducts,
        enabled: router.isReady && !!currentPage && !!currentLimit 
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

    return {
        dataProducts,
        isLoadingProducts,
        refetchProducts,
        isRefetchingProducts,

        setUrl,
        currentPage,
        currentLimit,
        currentSearch,

        handlePage,
        handleLimit,
        handleSearch
    }
}

export default useProduct;