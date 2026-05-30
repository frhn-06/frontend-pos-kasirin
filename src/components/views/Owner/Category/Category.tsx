import TableUi from "@/components/ui/TableUi";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import useCategory from "./useCategory";
import column_list from "./category.constant";
import AddCategory from "./AddCategory";

const Category = () => {
    const {
      dataCategories,
      isLoadingCategories,

      refetchCategories,
      isRefetchingCategories
    } = useCategory();

    const modalCategory = useDisclosure();


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
            isLoading={isLoadingCategories || isRefetchingCategories}

            isCreate
            textCreate="Tambah Kategori"
            openCreate={modalCategory.onOpen}
          />

          <AddCategory isOpen={modalCategory.isOpen} onClose={modalCategory.onClose} refetch={refetchCategories} />
        </div>
    )
}

export default Category