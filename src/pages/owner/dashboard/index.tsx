import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Owner/Dashboard";
import dashboardService from "@/services/dashboard.service";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useOwnerDashboard = () => {
    const router = useRouter();

    const getSummary = async () => {
        const {data} = await dashboardService.summary();
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

	return {
        dataSummary,
        isLoadingSummary,

        dataTrendSales,
        isLoadingTrendSales
	}
}

const PageOwnerDashboard = () => {
    const {
        dataSummary,
        isLoadingSummary,

        dataTrendSales,
        isLoadingTrendSales
    } = useOwnerDashboard();


    const isLoading = isLoadingSummary || isLoadingTrendSales;

    return (       
        <DashboardLayout title="Dashboard | Owner" description="welcome" role="owner" pageTitle="Dashboard">
          {isLoading ? (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Spinner color="primary" />
            </div>
          ) : (
            <Dashboard dataSummary={dataSummary?.data} dataTrendSales={dataTrendSales?.data} />
          )}
        </DashboardLayout>
    )
}

export default PageOwnerDashboard;