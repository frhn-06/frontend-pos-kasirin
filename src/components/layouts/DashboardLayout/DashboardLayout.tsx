import PageHead from "@/components/commons/PageHead";
import SidebarLayout from "./SidebarLayout";
import listConstant from "./listConstant";
import { useSession } from "next-auth/react";
import { ISesson } from "@/types/auth";
import { useState } from "react";
import cn from "@/utils/cn";
import useDashboardLayout from "./useDashboardLayout";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";


interface TypeProps {
  children: React.ReactNode;
  title: string;
  role: "owner" | "cashier";
  pageTitle: string;
  description: string;
}
const DashboardLayout = (props: TypeProps) => {
    const {
      children,
      title,
      role,
      pageTitle,
      description,
    } = props;

    const {
      dataStore,
      isLoadedStore
    } = useDashboardLayout();


    const session = useSession();

    const user = session.data?.user as ISesson;

    const [isActiveSidebar, setActiveSidebar] = useState(false);


    return(
      <>
        <PageHead title={title} />

        <section className="h-screen max-w-[2560px] m-auto">
          <div className="flex h-full w-full relative overflow-hidden">

            <div className={cn("z-10 min-w-70 h-full flex flex-col justify-between fixed lg:sticky transition-all duration-300", {"Sidebar-nonactive" : !isActiveSidebar, "Sidebar-active" : isActiveSidebar})}>
              <SidebarLayout items={role === "owner" ? listConstant.owner : listConstant.cashier} onClose={() => setActiveSidebar(false)} isOpen={isActiveSidebar} logo={dataStore?.data?.logo} isLoadLogo={isLoadedStore} />
            </div>

            <div className="w-full overflow-y-auto min-h-screen">
              <HeaderLayout 
                user={user}
                pageTitle={pageTitle}
                description={description}
                setActiveSidebar={setActiveSidebar}
                isActiveSidebar={isActiveSidebar}
              />

              <div className="bg-gray-100 min-h-svh">
                {children}
              </div>

              <FooterLayout />
            </div>
          </div>
        </section>
      </>
    )
}

export default DashboardLayout;