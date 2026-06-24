import TableUi from "@/components/ui/TableUi";
import { useDisclosure } from "@heroui/react";
import { ReactNode, useCallback } from "react";
import { useRouter } from "next/router";
import useCashier from "./useCashier";
import convert from "@/utils/convert";
import column_list from "./cashier.constant";
import AddCashier from "./AddCashier";

const Cashier = () => {
    const {
      dataCashiers,
      isLoadingCashiers,

      refetchCashiers,
      isRefetchingCashiers
    } = useCashier();

    const router = useRouter();

    const modalAddCashier = useDisclosure();

    const renderCell = useCallback((data: Record<string, unknown>, column: {label: string; id: string}) => {
      const value = data[column.id as keyof typeof data]

      switch(column.id) {
        case "avatar" :
          if(typeof data.avatar === "string") {
            return (
              <img src={`${data.avatar}`} alt="foto" className="h-18 rounded-xl" />
            )
          } else {
            return (
              <div className="h-18 w-12 flex flex-col justify-center items-center">
                <p className="text-xs italic">
                  foto
                </p>
                <p className="text-sm italic">
                  {convert.Acronym(`${data.fullName}`)}
                </p>
              </div>
            )
          }
        case "createdAt" : 
          return convert.TimeInTable(`${data.createdAt}`)
        default :
          return value as ReactNode;
      }
    },[router.isReady]) 



    return (
        <div className="py-12 px-4 lg:px-8">
          <TableUi 
            data={dataCashiers?.data || []}
            column={column_list}
            renderCell={renderCell}
            isLoading={isLoadingCashiers || isRefetchingCashiers}

            showCreate
            textCreate="Buat Cashier"
            openCreate={modalAddCashier.onOpen}

            emptyContent="Cashier kosong"
          />

          <AddCashier isOpen={modalAddCashier.isOpen} onClose={modalAddCashier.onClose} refetch={refetchCashiers} />


        </div>
    )
}

export default Cashier