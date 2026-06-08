import useDebaunce from "@/hooks/useDebaunce";
import orderService from "@/services/order.service";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/constanta";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useTransaction = () => {

    const router = useRouter();

    const {debaunce} = useDebaunce();

    const currentPage = router.query.page;
    const currentLimit = router.query.limit;
    const currentStatus = router.query.status;
    const currentPaymentMethod = router.query.paymentmethod;
    const currentCashierId = router.query.cashierid;
    const currentStart = router.query.start;
    const currentEnd = router.query.end;
    const currentSearch = router.query.search;

    const setUrl = () => {
        router.replace({
            query: {
                page: currentPage || PAGE_DEFAULT,
                limit: currentLimit || LIMIT_DEFAULT,
                status: currentStatus || "",
                paymentmethod: currentPaymentMethod || "",
                cashierid: currentCashierId || "",
                start: currentStart || "",
                end: currentEnd || "",
                search: currentSearch || ""
            }
        })
    }

    const getTransaction = async () => {
        const params = `page=${currentPage}&limit=${currentLimit}&status=${currentStatus}&paymentmethod=${currentPaymentMethod}&cashierid=${currentCashierId}&start=${currentStart}&end=${currentEnd}&search=${currentSearch}`;
        const {data} = await orderService.findAll(params);
        return data;
    }

    const {data: dataTransactions, isLoading: isLoadingTransactions, refetch:refetchTransactions, isRefetching:isRefetchingTransactions} = useQuery({
        queryKey: ["TransactionsOwner", currentPage, currentLimit, currentStatus, currentPaymentMethod, currentCashierId, currentStart, currentEnd, currentSearch],
        queryFn: getTransaction,
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
        dataTransactions,
        isLoadingTransactions,
        refetchTransactions,
        isRefetchingTransactions,

        setUrl,
        currentPage,
        currentLimit,
        currentSearch,

        handlePage,
        handleLimit,
        handleSearch
    }
}

export default useTransaction;