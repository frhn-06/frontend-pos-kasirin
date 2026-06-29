import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Owner/Dashboard";
import AuthService from "@/services/auth.service";
import dashboardService from "@/services/dashboard.service";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useOwnerDashboard = () => {
    const router = useRouter();

    const getSummary = async () => {
        const {data} = await dashboardService.summaryOwner();
        return data;
    }

	const {data: dataSummary, isLoading: isLoadingSummary} = useQuery({
        queryKey:["summaryOwner"],
        queryFn: getSummary,
        enabled: router.isReady
    })

    const getTrendSales = async () => {
        const {data} = await dashboardService.trendSales();
        return data;
    }

    
	const {data: dataTrendSales, isLoading: isLoadingTrendSales} = useQuery({
        queryKey:["trendSalesOwner"],
        queryFn: getTrendSales,
    })

    const getMe = async () => {
        const {data} = await AuthService.findMyUser();
        return data;
    }

    const {data: dataUser, isLoading: isLoadingUser} = useQuery({
        queryKey:["UserMe"],
        queryFn: getMe,
    })

	return {
        dataSummary,
        isLoadingSummary,

        dataTrendSales,
        isLoadingTrendSales,

        dataUser,
        isLoadingUser
	}
}

const PageOwnerDashboard = () => {
    const {
        dataSummary,
        isLoadingSummary,

        dataTrendSales,
        isLoadingTrendSales,

        dataUser,
        isLoadingUser
    } = useOwnerDashboard();


    const isLoading = isLoadingSummary || isLoadingTrendSales || isLoadingUser;


    return (       
        <DashboardLayout title="Dashboard | Owner" description="Monitor your business performance, sales, and store activity." role="owner" pageTitle="Dashboard">
          {isLoading ? (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Spinner color="primary" />
            </div>
          ) : (
            <Dashboard dataSummary={dataSummary?.data} dataTrendSales={dataTrendSales?.data} user={dataUser?.data} />
          )}
        </DashboardLayout>
    )
}

export default PageOwnerDashboard;