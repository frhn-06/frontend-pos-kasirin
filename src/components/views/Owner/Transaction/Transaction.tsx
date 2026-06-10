import TableUi from "@/components/ui/TableUi";
import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/router";
import column_list from "./transaction.constant";
import useTransaction from "./useTransaction";
import { IItems } from "@/types/order";
import CancelTransaction from "./CancelTransaction";
import convert from "@/utils/convert";


const Transaction = () => {
    const {
      dataTransactions,
      isLoadingTransactions,
      refetchTransactions,
      isRefetchingTransactions,

      dataCashier,
      isLoadingCashier,

      setUrl,

      currentPage,
      currentLimit,
      currentSearch,
      currentStatus,
      currentPaymentMethod,
      currentCashierId,
      currentStart,
      currentEnd,

      handlePage,
      handleLimit,

      handleSearch,

      handleStatus,
      handlePayment,
      handleCashier,
      handleDateStart,
      handleDateEnd,
      handleClearDateStart,
      handleClearDateEnd
    } = useTransaction();

    const router = useRouter();

    const modalAddTransaction = useDisclosure();

    const modalDeleteTransaction = useDisclosure();

    const modalCancelTransaction = useDisclosure();

    const [idTransaction, setidTransaction] = useState<string | null>(null);

    const [statusOrder, setStatusOrder] = useState<string | null>(null)


    useEffect(() => {
      if(router.isReady) {
        setUrl();
      }
    },[router.isReady])


    const renderCell = useCallback((data: Record<string, unknown>, column: {label: string; id: string}) => {
      const value = data[column.id as keyof typeof data]

      switch(column.id) {
        case "items" : 
          return (data.items as unknown as IItems[]).length as ReactNode
        case "status" :
          if(data.status === "paid") {
            return <Chip color="success" variant="flat">Success</Chip>
          } else if(data.status === "cancelled") {
            return <Chip color="warning" variant="flat">Cancelled</Chip>
          }
        case "cashierId" :
          return (data.cashierId as {_id?:string; fullName?:string}).fullName;
        case "createdAt" :
          return convert.TimeInTable(`${data.createdAt}`);
        case "actions" :
          return (
            <Dropdown>
              <DropdownTrigger>
                <CiMenuKebab />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                <DropdownItem key="delete" onClick={() => {
                  modalCancelTransaction.onOpen(); 
                  setidTransaction(`${data._id}`);
                  setStatusOrder(`${data.status}`)
                }}>
                  {data.status === "paid" ? "Cancel"  :  "Uncancel"}
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
          {Object.keys(router.query).length > 0 && (
            <TableUi 
              data={dataTransactions?.data || []}
              column={column_list}
              renderCell={renderCell}
              isLoading={isLoadingTransactions || isRefetchingTransactions}
  
              emptyContent="Order kosong"
              placeholderSearch="Cari Invoice Order"
  
              currentLimit={`${currentLimit}`}
              currentPage={`${currentPage}`}
              currentStatus={`${currentStatus}`}
              currentPayment={`${currentPaymentMethod}`}
              currentCashierId={`${currentCashierId}`}
              currentStart={`${currentStart}`}
              currentEnd={`${currentEnd}`}
  
              totalPage={Number(dataTransactions?.Pagination?.totalPage)}
  
              showLimit
              onChangeLimit={handleLimit}
  
              showPagination
              
              showSearch
              onChangeSearch={handleSearch}
  
              showStatus
              onChangeStatus={handleStatus}
  
              showPayment
              onChangePayment={handlePayment}
              
              showCashier
              listCashier={dataCashier?.data || []}
              isLoadingDataCashier={isLoadingCashier}
              onChangeCashier={handleCashier}

              showDateStart
              onChangeDateStart={handleDateStart}
              onClearDateStart={handleClearDateStart}

              showDateEnd
              onChangeDateEnd={handleDateEnd}
              onClearDateEnd={handleClearDateEnd}
            />
          )}

          {/* <AddProduct isOpen={modalAddTransaction.isOpen} onClose={modalAddTransaction.onClose} refetch={refetchTransactions} /> */}

         

          {/* <DeleteProduct productId={`${idTransaction}`} onClose={modalDeleteTransaction.onClose} isOpen={modalDeleteTransaction.isOpen} refetch={refetchTransactions} /> */}

          <CancelTransaction isOpen={modalCancelTransaction.isOpen} onClose={modalCancelTransaction.onClose} transactionId={`${idTransaction}`} refetch={refetchTransactions} status={`${statusOrder as "cancelled" | "paid"}`} />

        </div>
    )
}

export default Transaction