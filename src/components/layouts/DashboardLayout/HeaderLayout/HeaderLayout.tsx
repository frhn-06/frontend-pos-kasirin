import BurgerToggle from "@/components/ui/BurgerToggle"
import { IUser } from "@/types/auth";
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@heroui/react"
import { signOut } from "next-auth/react";
import Link from "next/link"
import React, { SetStateAction } from "react"

interface TypeProps {
  setActiveSidebar: React.Dispatch<SetStateAction<boolean>>;
  isActiveSidebar: boolean;
  pageTitle: string;
  description: string;

  user: IUser;
}
const HeaderLayout = (props: TypeProps) => {
    const {
      setActiveSidebar,
      isActiveSidebar,
      pageTitle,
      description,

      user
    } = props;

    return (
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

          

          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Skeleton isLoaded={!!user} className="rounded-full">
                <Avatar showFallback name={user?.fullName} src={`${user?.avatar}`} className="cursor-pointer" />     
              </Skeleton>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 flex flex-col gap-1 min-w-32">
                {user?.role === "owner" ? (
                  <Link href={`/owner/profile/${user?._id}`} className="font-semibold hover:bg-default-200 py-2 px-3 rounded-lg">
                    Profile
                  </Link>
                ) : 
                  <Link href={`/cashier/profile/${user?._id}`} className="font-semibold hover:bg-default-200 py-2 px-3 rounded-lg">
                    Profile
                  </Link>
                }
                <Link href={"/logout"} className="font-semibold hover:bg-default-200 py-2 px-3 rounded-lg" onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}>
                  Log Out
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>        
    )
}

export default HeaderLayout