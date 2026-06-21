import DashboardLayout from "@/components/layouts/DashboardLayout"
import Store from "@/components/views/Owner/Store"

const PageOwnerStore = () => {
    return (
        <DashboardLayout title="Store | Owner" description="this is store page manegement" role="owner" pageTitle="My Store">
          <Store />
        </DashboardLayout>
    )
}


export default PageOwnerStore