import DashboardLayout from "@/components/layouts/DashboardLayout"
import Report from "@/components/views/Owner/Report"

const PageOwnerReport = () => {
    return (
        <DashboardLayout title="Report | Owner" description="Analyze your business performance through detailed sales and product reports." role="owner" pageTitle="Reports">
          <Report />
        </DashboardLayout>
    )
}


export default PageOwnerReport