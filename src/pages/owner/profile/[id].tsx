import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Owner/Profile";

const PageOwnerProfile = () => {
    return (
        <DashboardLayout title="Owner | Profile" role="owner" pageTitle="My Profile" description="manage my profile">
            <Profile />
        </DashboardLayout>
    )
}

export default PageOwnerProfile;