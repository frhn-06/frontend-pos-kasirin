import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailCategory from "@/components/views/Owner/DetailCategory"

const PageOwnerDetailCategory = () => {
    return (
        <DashboardLayout title="Detail Category | Owner" role="owner" pageTitle="Kategori" description="Ini Detail Kategori">
            <DetailCategory />
        </DashboardLayout>
    )
}

export default PageOwnerDetailCategory;