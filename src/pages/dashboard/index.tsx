import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Owner/Dashboard";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

const PageDashboard = () => {
    return (
        <section>
          <DashboardLayout title="Dashboard | Owner" description="welcome" role="owner" pageTitle="Dashboard">
            <Dashboard />
          </DashboardLayout>
        </section>
    )
}

export default PageDashboard;