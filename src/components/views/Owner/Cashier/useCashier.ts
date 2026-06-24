import cashierService from "@/services/cashier.service";
import { ISesson } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react"

const useCashier = () => {
    const getCashier = async () => {
        const {data} = await cashierService.findCashier();
        return data;
    }

    const {data:dataCashiers, isLoading:isLoadingCashiers, refetch:refetchCashiers, isRefetching: isRefetchingCashiers} = useQuery({
        queryKey: ["Cashiers"],
        queryFn: getCashier,
    });

    return {
        dataCashiers,
        isLoadingCashiers,
        refetchCashiers,
        isRefetchingCashiers
    }
}

export default useCashier;