import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Cashier/Profile";

const PageCashierProfile = () => {
    return (
        <DashboardLayout title="Cashier | Profile" role="cashier" pageTitle="Profile" description="View and update your personal information and account settings.">
            <Profile />
        </DashboardLayout>
    )
}

export default PageCashierProfile;