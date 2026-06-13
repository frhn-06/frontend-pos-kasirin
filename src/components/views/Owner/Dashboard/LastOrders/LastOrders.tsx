import { useCallback } from "react";
import useLastOrders from "./useLastOrders";
import TableUi from "@/components/ui/TableUi";
import COLUMN_LIST from "./column_list";
import { ILastOrdersDashoardOwner } from "@/types/dashboard";
import convert from "@/utils/convert";
import { Chip } from "@heroui/react";

const LastOrders = () => {
    const {
      dataLastOrders,
      isLoadingLastOrders
    } = useLastOrders();

    const renderCell = useCallback((data: Record<string, unknown>, column: {label: string; id:string}) => {
        const value = data[column.id as keyof typeof data];

        switch(column.id) {
          case "createdAt" :
            return convert.TimeInTable(`${data.createdAt}`);
          case "paymentMethod" :
            return (
              <Chip>
                {data.paymentMethod === "cash" ? "Cash" : data.paymentMethod === "qris" ? "Qris" : "Trasnfer"}
              </Chip>
            )
          case "cashierSnapshot" :
            return (value as {name: string} ).name;
          case "totalAmount" :
            return convert.IDR(Number(data.totalAmount))
          default : 
            return value as React.ReactNode;
        }
    },[])

    return (
      <div className="w-full max-w-160 flex-2">
        <TableUi 
          data={dataLastOrders?.data || []} 
          column={COLUMN_LIST} 
          renderCell={renderCell} 
          isLoading={isLoadingLastOrders} 
          emptyContent={"Order Terbaru Kosong"} 
        />
      </div>
    )
}

export default LastOrders;