import DashboardLayout from "@/components/layouts/DashboardLayout"
import Category from "@/components/views/Owner/Category"

const PageOwnerCategory = () => {
    return (
        <DashboardLayout title="Category | Owner" description="this is category page manegement" role="owner" pageTitle="Category">
          <Category />
        </DashboardLayout>
    )
}


export default PageOwnerCategory