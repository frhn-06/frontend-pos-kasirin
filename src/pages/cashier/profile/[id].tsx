import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Cashier/Profile";

const PageCashierProfile = () => {
    return (
        <DashboardLayout title="Cashier | Profile" role="cashier" pageTitle="My Profile" description="manage my profile">
            <Profile />
        </DashboardLayout>
    )
}

export default PageCashierProfile;