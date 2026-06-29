import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Cashier/Transaction";


const PageCashierTransaction = () => {
    return (       
        <DashboardLayout title="Transaction | Cashier" description="View and manage transaction history with ease." role="cashier" pageTitle="Transactions">
            <Transaction />
        </DashboardLayout>
    )
}

export default PageCashierTransaction;