import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Cashier/Transaction";


const PageCashierTransaction = () => {
    return (       
        <DashboardLayout title="Transaction | Cashier" description="Manage Transaction history" role="cashier" pageTitle="Transaction history">
            <Transaction />
        </DashboardLayout>
    )
}

export default PageCashierTransaction;