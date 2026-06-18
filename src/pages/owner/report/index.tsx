import DashboardLayout from "@/components/layouts/DashboardLayout"
import Report from "@/components/views/Owner/Report"

const PageOwnerReport = () => {
    return (
        <DashboardLayout title="Report | Owner" description="this is report of this bussines" role="owner" pageTitle="Report">
          <Report />
        </DashboardLayout>
    )
}


export default PageOwnerReport