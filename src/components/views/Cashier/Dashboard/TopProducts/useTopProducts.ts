import dashboardService from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

const useTopProducts = () => {
    const getTopProducts = async () => {
        const {data} = await dashboardService.topProductsCashier();
        return data;
    }

    const {data: dataTopProducts, isLoading: isLoadingTopProducts} = useQuery({
        queryKey: ["TopProductsCashier"],
        queryFn: getTopProducts,
    })

    return {
        dataTopProducts,
        isLoadingTopProducts
    }
}

export default useTopProducts;