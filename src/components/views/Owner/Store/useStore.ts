import StoreService from "@/services/store.service";
import { useQuery } from "@tanstack/react-query";

const useStore = () => {

    const getStore = async () => {
        const {data} = await StoreService.getStore();
        return data;
    }

    const {data: dataStore, isLoading: isLoadingStore, refetch:refetchStore, isRefetching:isRefetchingStore} = useQuery({
        queryKey: ["StoreDetail"],
        queryFn: getStore,
    })


    return {
        dataStore,
        isLoadingStore,
        refetchStore,
        isRefetchingStore
    }
}

export default useStore;