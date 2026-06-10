import TableUi from "@/components/ui/TableUi";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { ReactNode, useCallback, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import useCategory from "./useCategory";
import column_list from "./category.constant";
import AddCategory from "./AddCategory";
import { useRouter } from "next/router";
import DeleteCategory from "./DeleteCategory";

const Category = () => {
    const {
      dataCategories,
      isLoadingCategories,

      refetchCategories,
      isRefetchingCategories
    } = useCategory();

    const router = useRouter();

    const modalAddCategory = useDisclosure();

    const modalDeleteCategory = useDisclosure();

    const [idCategory, setIdCategory] = useState<string | null>(null);



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
                <DropdownItem key="update" onClick={() => router.push(`/owner/category/${data._id}`)}>
                  Update
                </DropdownItem>
                <DropdownItem key="delete" onClick={() => {modalDeleteCategory.onOpen(); setIdCategory(`${data._id}`)}}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )
          default :
            return value as ReactNode;
      }
    },[router.isReady]) 



    return (
        <div className="py-12 px-4 lg:px-8">
          <TableUi 
            data={dataCategories?.data || []}
            column={column_list}
            renderCell={renderCell}
            isLoading={isLoadingCategories || isRefetchingCategories}

            showCreate
            textCreate="Tambah Kategori"
            openCreate={modalAddCategory.onOpen}

            emptyContent="Kategori kosong"
          />

          <AddCategory isOpen={modalAddCategory.isOpen} onClose={modalAddCategory.onClose} refetch={refetchCategories} />

         

          <DeleteCategory categoryId={`${idCategory}`} onClose={modalDeleteCategory.onClose} isOpen={modalDeleteCategory.isOpen} refetch={refetchCategories} />

        </div>
    )
}

export default Category