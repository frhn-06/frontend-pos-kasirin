import PageHead from "@/components/commons/PageHead";
import SidebarLayout from "./SidebarLayout";
import listConstant from "./listConstant";
import { CiLogout } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Skeleton } from "@heroui/react";
import { ISesson } from "@/types/auth";
import Link from "next/link";
import BurgerToggle from "@/components/ui/BurgerToggle";
import { useState } from "react";
import cn from "@/utils/cn";
import useDashboardLayout from "./useDashboardLayout";


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
              <div className="h-24 bg-white flex items-center p-4 justify-between">
                <div className="flex items-center-safe gap-4">
                  <div onClick={() => setActiveSidebar(!isActiveSidebar)}>
                    <BurgerToggle isClicked={isActiveSidebar} />
                  </div>

                  <div className="flex flex-col">
                    <h1 className="font-bold text-xl">
                      {pageTitle}
                    </h1>
                    <h2 className="text-gray-500 text-sm">
                      {description}
                    </h2>

                  </div>
                </div>

                <Skeleton isLoaded={!!user} className="rounded-full">
                  <Link href={`/profile`}>
                    <Avatar showFallback name={user?.fullName} src={`${user?.avatar}`} />                    
                  </Link>
                </Skeleton>
              </div>

              <div className="bg-gray-100 min-h-svh">
                {children}

              </div>
                <div className="w-full h-12 bg-white flex justify-center items-center">
                  <p className="text-sm text-gray-600">
                    &copy; 2026 | Kasirin
                  </p>
                </div>
            </div>
          </div>
        </section>
      </>
    )
}

export default DashboardLayout;