import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailProduct from "@/components/views/Owner/DetailProduct";

const PageOwnerDetailProduct = () => {
    return (
        <DashboardLayout title="Detail Product | Owner" role="owner" pageTitle="Produk" description="Ini Detail Produk">
            <DetailProduct />
        </DashboardLayout>
    )
}

export default PageOwnerDetailProduct;