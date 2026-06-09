import useDebaunce from "@/hooks/useDebaunce";
import AuthService from "@/services/auth.service";
import orderService from "@/services/order.service";
import { ISesson } from "@/types/auth";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/constanta";
import { DateValue } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useTransaction = () => {

    const router = useRouter();

    const {debaunce} = useDebaunce();

    const session = useSession();
    const storeId = (session.data?.user as ISesson)?.storeId;

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
                limit: currentLimit || 12,
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



    const getCashier = async () => {
        const {data} = await AuthService.getCashier(`${storeId}`);
        return data
    }

    const {data: dataCashier, isLoading: isLoadingCashier} = useQuery({
        queryKey: ["CashierList"],
        queryFn: getCashier,
        enabled: router.isReady
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


    const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        router.replace({
            query: {
                ...router.query,
                status: e.target.value,
                page: 1
            }
        })
    }

    const handlePayment = (e: ChangeEvent<HTMLSelectElement>) => {
        router.replace({
            query: {
                ...router.query,
                paymentmethod: e.target.value,
                page: 1
            }
        })
    }

    const handleCashier = (e: ChangeEvent<HTMLSelectElement>) => {
        router.replace({
            query: {
                ...router.query,
                cashierid: e.target.value,
                page: 1
            }
        })
    }

    const handleDateStart = (e: DateValue | null) => {
        router.replace({
            query: {
                ...router.query,
                start: e?.toString(),
                page: 1
            }
        })
    }

    const handleDateEnd = (e: DateValue | null) => {
        router.replace({
            query: {
                ...router.query,
                end: e?.toString(),
                page: 1
            }
        })
    }


    const handleClearDateStart = () => {
        router.replace({
            query: {
                ...router.query,
                start: "",
                page: 1
            }
        })
    }

    const handleClearDateEnd = () => {
        router.replace({
            query: {
                ...router.query,
                end: "",
                page: 1
            }
        })
    }

    

    return {
        dataTransactions,
        isLoadingTransactions,
        refetchTransactions,
        isRefetchingTransactions,

        dataCashier,
        isLoadingCashier,

        setUrl,
        currentPage,
        currentLimit,
        currentSearch,
        currentStatus,
        currentPaymentMethod,
        currentCashierId,
        currentStart,
        currentEnd,

        handlePage,
        handleLimit,
        handleSearch,
        handleStatus,
        handlePayment,
        handleCashier,
        handleDateStart,
        handleDateEnd,
        handleClearDateStart,
        handleClearDateEnd
    }
}

export default useTransaction;