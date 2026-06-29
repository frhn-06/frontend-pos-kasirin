import DashboardLayout from "@/components/layouts/DashboardLayout";
import Pos from "@/components/views/Cashier/Pos";


const PageCashierPos = () => {
    return (       
        <DashboardLayout title="Pos | Cashier" description="Create transactions quickly and serve customers efficiently." role="cashier" pageTitle="Pos Order">
            <Pos />
        </DashboardLayout>
    )
}

export default PageCashierPos;