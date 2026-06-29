import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailCategory from "@/components/views/Owner/DetailCategory"

const PageOwnerDetailCategory = () => {
    return (
        <DashboardLayout title="Detail Category | Owner" role="owner" pageTitle="Category Detail's" description="View detailed information about the selected product category.">
            <DetailCategory />
        </DashboardLayout>
    )
}

export default PageOwnerDetailCategory;