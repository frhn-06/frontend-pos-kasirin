import TableUi from "@/components/ui/TableUi";
import column_list from "./column_list";
import { useCallback } from "react";
import convert from "@/utils/convert";
import { Isalesbyday } from "@/types/report";

interface TypeProps {
  data: Isalesbyday[];
  isLoading: boolean;
}

const SalesByDay = (props: TypeProps) => {
    const {
      data,
      isLoading
    } = props;

    const renderCell = useCallback((data: Record<string, unknown>, column: {label: string; id: string}) => {
      const value = data[column.id as keyof typeof data];

      switch(column.id) {
        case "date" :
          return convert.TimeInTable(`${data.date}`) + " WIB";
        case "totalSales" :
          return convert.IDR(Number(data.totalSales));
        default :
          return value as React.ReactNode;
      }
    },[])

    return (
        <TableUi 
          data={(data || []) as unknown as Record<string, unknown>[]}
          column={column_list}
          renderCell={renderCell}

          isLoading={isLoading}
          emptyContent="data sales per hari kosong"
        />
    )
}

export default SalesByDay;