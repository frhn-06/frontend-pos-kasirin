import TableUi from "@/components/ui/TableUi";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import useCategory from "./useCategory";
import column_list from "./category.constant";
import { useRouter } from "next/router";

const Category = () => {
    const {
      dataCategories,
      isLoadingCategories   
    } = useCategory();

    const router = useRouter();


    const renderCell = useCallback((data: Record<string, unknown>, column: {label: string; id: string}) => {
      const value = data[column.id as keyof typeof data]

      switch(column.id) {
        case "img" :
          return (
            <img src={`${data.img}`} alt="logo" className="h-18 rounded-xl" />
          )
        case "actions" :
          return (
            <Dropdown>
              <DropdownTrigger>
                <CiMenuKebab />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                <DropdownItem key="update">
                  Update
                </DropdownItem>
                <DropdownItem key="delete">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )
          default :
            return value as ReactNode;
      }
    },[]) 



    return (
        <div className="py-12 px-4 lg:px-8">
          <TableUi 
            data={dataCategories?.data || []}
            column={column_list}
            renderCell={renderCell}
            isLoading={isLoadingCategories}
          />
        </div>
    )
}

export default Category