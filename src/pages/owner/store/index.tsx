import DashboardLayout from "@/components/layouts/DashboardLayout"
import Store from "@/components/views/Owner/Store"

const PageOwnerStore = () => {
    return (
        <DashboardLayout title="Store | Owner" description="Manage your store profile, logo, and account settings." role="owner" pageTitle="My Store">
          <Store />
        </DashboardLayout>
    )
}


export default PageOwnerStore