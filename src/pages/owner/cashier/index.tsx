import DashboardLayout from "@/components/layouts/DashboardLayout"
import Cashier from "@/components/views/Owner/Cashier"

const PageOwnerCashier = () => {
    return (
        <DashboardLayout title="Cashier | Owner" description="Manage cashier accounts and control staff access." role="owner" pageTitle="Cashiers">
          <Cashier />
        </DashboardLayout>
    )
}


export default PageOwnerCashier