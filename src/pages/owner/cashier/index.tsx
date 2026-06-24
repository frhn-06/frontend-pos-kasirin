import DashboardLayout from "@/components/layouts/DashboardLayout"
import Cashier from "@/components/views/Owner/Cashier"

const PageOwnerCashier = () => {
    return (
        <DashboardLayout title="Cashier | Owner" description="this is cashier page manegement" role="owner" pageTitle="Cashiers">
          <Cashier />
        </DashboardLayout>
    )
}


export default PageOwnerCashier