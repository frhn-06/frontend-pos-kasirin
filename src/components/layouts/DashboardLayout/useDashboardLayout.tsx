import StoreService from "@/services/store.service"
import { useQuery } from "@tanstack/react-query";

const useDashboardLayout = () => {

    const getStore = async () => {
        const {data} = await StoreService.getStore();
        return data;
    }

    const {data: dataStore, isLoading: isLoadedStore} = useQuery({
        queryKey: ["Store"],
        queryFn: getStore,
        enabled: true
    })

    // const getStore = async () => {
    //     const {data} = await StoreService.getStore();
    //     return data;
    // }

    // const {data: dataStore, isLoading: isLoadedStore} = useQuery({
    //     queryKey: ["Store"],
    //     queryFn: getStore,
    //     enabled: true
    // })

    return {
        dataStore,
        isLoadedStore
    }
}

export default useDashboardLayout