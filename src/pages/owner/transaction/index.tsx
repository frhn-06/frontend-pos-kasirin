import DashboardLayout from "@/components/layouts/DashboardLayout"
import Transaction from "@/components/views/Owner/Transaction"

const PageOwnerTransaction = () => {
    return (
        <DashboardLayout title="Transaction | Owner" description="Review sales history and track every completed transaction." role="owner" pageTitle="Transactions">
          <Transaction />
        </DashboardLayout>
    )
}


export default PageOwnerTransaction