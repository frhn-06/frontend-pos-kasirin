import TableUi from "@/components/ui/TableUi";
import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import useProduct from "./useProduct";
import { useRouter } from "next/router";
import column_list from "./product.constant";
import AddProduct from "./AddProduct";
import convert from "@/utils/convert";
import DeleteProduct from "./DeleteProduct";


const Product = () => {
    const {
      dataProducts,
      isLoadingProducts,
      refetchProducts,
      isRefetchingProducts,

      setUrl,

      currentPage,
      currentLimit,
      currentSearch,

      handlePage,
      handleLimit,

      handleSearch
    } = useProduct();

    const router = useRouter();

    const modalAddProduct = useDisclosure();

    const modalDeleteProduct = useDisclosure();

    const [idProduct, setidProduct] = useState<string | null>(null);


    useEffect(() => {
      if(router.isReady) {
        setUrl();
      }
    },[router.isReady])


    const renderCell = useCallback((data: Record<string, unknown>, column: {label: string; id: string}) => {
      const value = data[column.id as keyof typeof data]

      switch(column.id) {
        case "img" :
          return (
            <img src={`${data.img}`} alt="logo" className="h-18 rounded-xl" />
          )
        case "categoryId" : 
          return (value as {_id:string; name:string}).name
        case "isAvailable" :
          if(data.isAvailable) {
            return <Chip color="success" variant="flat">Tersedia</Chip>
          } else {
            return <Chip color="warning" variant="flat">Habis</Chip>
          }
        case "price" : 
          return convert.IDR(Number(data.price))
        case "actions" :
          return (
            <Dropdown>
              <DropdownTrigger>
                <CiMenuKebab />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                <DropdownItem key="update" onClick={() => router.push(`/owner/product/${data._id}`)}>
                  Update
                </DropdownItem>
                <DropdownItem key="delete" onClick={() => {modalDeleteProduct.onOpen(); setidProduct(`${data._id}`)}}>
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
            data={dataProducts?.data || []}
            column={column_list}
            renderCell={renderCell}
            isLoading={isLoadingProducts || isRefetchingProducts}

            showCreate
            textCreate="Tambah Produk"
            openCreate={modalAddProduct.onOpen}

            emptyContent="Produk kosong"

            currentLimit={`${currentLimit}`}
            currentPage={`${currentPage}`}

            onChangeLimit={handleLimit}

            totalPage={Number(dataProducts?.pagination?.totalPage)}

            showLimit
            showPagination
            showSearch

            onChangeSearch={handleSearch}

            onPagination={handlePage}
          />

          <AddProduct isOpen={modalAddProduct.isOpen} onClose={modalAddProduct.onClose} refetch={refetchProducts} />

         

          <DeleteProduct productId={`${idProduct}`} onClose={modalDeleteProduct.onClose} isOpen={modalDeleteProduct.isOpen} refetch={refetchProducts} />

        </div>
    )
}

export default Product