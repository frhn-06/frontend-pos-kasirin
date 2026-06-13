import dashboardService from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

const useLastOrders = () => {
    const getLastOrders = async () => {
        const {data} = await dashboardService.lastOrders();
        return data;
    }

    const {data: dataLastOrders, isLoading: isLoadingLastOrders} = useQuery({
        queryKey: ["LastOrdersOwner"],
        queryFn: getLastOrders,
    })

    return {
        dataLastOrders,
        isLoadingLastOrders
    }
}

export default useLastOrders;