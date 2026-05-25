import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Owner/Dashboard";

const PageOwnerDashboard = () => {
    return (
        <section>
          <DashboardLayout title="Dashboard | Owner" description="welcome" role="owner" pageTitle="Dashboard">
            <Dashboard />
          </DashboardLayout>
        </section>
    )
}

export default PageOwnerDashboard;