import AuthService from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useProfile = () => {

    const router = useRouter();

    const getProfile = async() => {
        const {data} = await AuthService.findMyUser();
        return data;
    }

    const {data:dataProfile, isLoading:isLoadingDataProfile, refetch: refetchDataProfile, isRefetching: isRefetchingDataProfile} = useQuery({
        queryKey:["MyProfile"],
        queryFn: getProfile,
        enabled: router.isReady
    })


    return {
        dataProfile,
        isLoadingDataProfile,
        refetchDataProfile,
        isRefetchingDataProfile
    }
}


export default useProfile;