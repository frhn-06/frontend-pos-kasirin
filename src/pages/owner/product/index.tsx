import DashboardLayout from "@/components/layouts/DashboardLayout"
import Product from "@/components/views/Owner/Product"

const PageOwnerProduct = () => {
    return (
        <DashboardLayout title="Product | Owner" description="Manage your products, pricing, and available stock." role="owner" pageTitle="Product">
          <Product />
        </DashboardLayout>
    )
}


export default PageOwnerProduct