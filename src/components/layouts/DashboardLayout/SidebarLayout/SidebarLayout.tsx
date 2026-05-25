import BurgerToggle from "@/components/ui/BurgerToggle";
import cn from "@/utils/cn";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CiLogout } from "react-icons/ci";
import { Image, Skeleton } from '@heroui/react';
import { ISesson } from "@/types/auth";

interface typeList {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface TypeProps {
  items: typeList[];
  onClose: () => void;
  isOpen: boolean;
  logo: string;
  isLoadLogo: boolean;
}

const SidebarLayout = (props: TypeProps) => {
    const {
      items,
      onClose,
      isOpen,
      logo,
      isLoadLogo
    } = props;

    const router = useRouter();
    return (
        <div className=" bg-white w-full border-r-2 border-gray-200/70 h-screen overflow-hidden flex flex-col justify-between">
          <div className="overflow-auto">
            <div className="w-full h-24 flex justify-between items-start p-4">
              {isLoadLogo ? (
                <Skeleton className="h-16 w-36 mx-auto"></Skeleton>
              ) : (
                <img src={logo} className="h-full mx-auto" />
              )}
              
              

              <div onClick={onClose}>
                <BurgerToggle isClicked={isOpen} />
              </div>
            </div>

            <div className="flex flex-col gap-2 p-2">
              {items.map((item) => (
                <Link key={item.id} href={item.href} className={cn("p-2 flex gap-2 rounded-xl text-blue-600 bg-gray-100 hover:bg-gray-200 transition border-2 border-gray-300/40", {"text-white bg-blue-500 hover:bg-blue-400" : router.pathname.startsWith(item.href)})}>
                  <div className="w-7 h-7">
                    {item.icon}
                  </div>
                  <span className="text-lg">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="w-full p-2">
            <div onClick={() => signOut()} className="flex gap-2 justify-end items-center p-1 rounded-xl hover:bg-gray-100 text-blue-600 cursor-pointer active:bg-gray-200" >
              <CiLogout className="w-7 h-7" />
              <span>
                Keluar
              </span>
            </div>
          </div>
          
          
          
        </div>
    )
}

export default SidebarLayout;