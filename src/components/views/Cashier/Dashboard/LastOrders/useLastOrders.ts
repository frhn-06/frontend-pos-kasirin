import dashboardService from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

const useLastOrders = () => {
    const getLastOrders = async () => {
        const {data} = await dashboardService.lastOrdersCashier();
        return data;
    }

    const {data: dataLastOrders, isLoading: isLoadingLastOrders} = useQuery({
        queryKey: ["LastOrdersCashier"],
        queryFn: getLastOrders,
    })

    return {
        dataLastOrders,
        isLoadingLastOrders
    }
}

export default useLastOrders;