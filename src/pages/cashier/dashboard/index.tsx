import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Cashier/Dashboard";
import AuthService from "@/services/auth.service";
import dashboardService from "@/services/dashboard.service";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useCashierDashboard = () => {
    const router = useRouter();

    const getSummary = async () => {
        const {data} = await dashboardService.summaryCashier();
        return data;
    }

  const {data: dataSummary, isLoading: isLoadingSummary} = useQuery({
        queryKey:["summaryOwner"],
        queryFn: getSummary,
        enabled: router.isReady
    })

    const getSummaryPayment = async () => {
        const {data} = await dashboardService.paymentSummary();
        return data;
    }

  const {data: dataPaymentSummary, isLoading: isLoadingPaymentSummary} = useQuery({
        queryKey:["PaymentSummaryDashboard"],
        queryFn: getSummaryPayment,
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

        dataPaymentSummary,
        isLoadingPaymentSummary,

        dataUser,
        isLoadingUser
  }
}

const PageCashierDashboard = () => {
    const {
      dataSummary,
      isLoadingSummary,

      dataPaymentSummary,
      isLoadingPaymentSummary,

      dataUser,
      isLoadingUser
    } = useCashierDashboard();

    const isLoading = isLoadingPaymentSummary || isLoadingSummary || isLoadingUser;

    return (       
        <DashboardLayout title="Dashboard | Cashier" description="welcome" role="cashier" pageTitle="Dashboard">
          {isLoading ? (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Spinner color="primary" />
            </div>
          ) : (
            <Dashboard dataSummary={dataSummary?.data} dataPaymentSummary={dataPaymentSummary?.data} user={dataUser?.data} />            
          )}
        </DashboardLayout>
    )
}

export default PageCashierDashboard;