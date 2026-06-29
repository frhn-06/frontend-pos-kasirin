import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailProduct from "@/components/views/Owner/DetailProduct";

const PageOwnerDetailProduct = () => {
    return (
        <DashboardLayout title="Detail Product | Owner" role="owner" pageTitle="Product Detail's" description="View complete product information, pricing, and category details.">
            <DetailProduct />
        </DashboardLayout>
    )
}

export default PageOwnerDetailProduct;