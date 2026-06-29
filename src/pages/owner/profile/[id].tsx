import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Owner/Profile";

const PageOwnerProfile = () => {
    return (
        <DashboardLayout title="Owner | Profile" role="owner" pageTitle="Profile" description="View and update your personal information and account settings.">
            <Profile />
        </DashboardLayout>
    )
}

export default PageOwnerProfile;