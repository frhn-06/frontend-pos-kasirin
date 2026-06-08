import DashboardLayout from "@/components/layouts/DashboardLayout"
import Transaction from "@/components/views/Owner/Transaction"

const PageOwnerTransaction = () => {
    return (
        <DashboardLayout title="Transaction | Owner" description="this is transaction page manegement" role="owner" pageTitle="Transaction history">
          <Transaction />
        </DashboardLayout>
    )
}


export default PageOwnerTransaction