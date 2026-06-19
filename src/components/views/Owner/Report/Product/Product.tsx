import { ReactNode, useCallback, useEffect } from "react";
import useProduct from "./useProduct";
import convert from "@/utils/convert";
import TableUi from "@/components/ui/TableUi";
import column_list from "./column_list";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

interface TypeProps {
  data:[],
  isLoading: boolean;
  currentStart: string;
  currentEnd: string;
}

const Product = (props: TypeProps) => {
    const {
      data,
      isLoading,
      currentStart,
      currentEnd
    } = props;

    useEffect(() => {
      
    },[])

    const {
      handleChangeStartDate,
      handleChangeEndDate,

      handleClearStartDate,
      handleClearEndDate
    } = useProduct();


     const renderCell = useCallback((data: Record<string, unknown>, column: {label: string; id: string}) => {
      const value = data[column.id as keyof typeof data]

      switch(column.id) {
        case "totalPemasukan" :
          return convert.IDR(Number(data.totalPemasukan));
        default :
          return value as ReactNode;
      }
    },[]) 

    return (
        <div className="py-12 px-4 lg:px-8">
          <div className="flex flex-col gap-8 ">
            <div className="py-2 px-6 rounded-xl flex justify-between items-center w-fit gap-3 shadow-lg bg-white text-blue-500 border-1 border-gray-400/30">
              <Link href="/owner/report" className="hover:text-blue-700">
                Report
              </Link>
              <FaChevronRight />
              <Link href="" onClick={(e) => e.preventDefault()} className="hover:text-blue-700 font-bold">
                Product
              </Link>
            </div>

            <TableUi 
              data={data || []}
              column={column_list}
              renderCell={renderCell}
              isLoading={isLoading}
              emptyContent="Laporan Produk Sedang Kosong"

              showDateStart
              onChangeDateStart={handleChangeStartDate}
              onClearDateStart={handleClearStartDate}
              currentStart={currentStart}

              showDateEnd
              onChangeDateEnd={handleChangeEndDate}
              onClearDateEnd={handleClearEndDate}
              currentEnd={currentEnd}
            />
          </div>
        </div>
    )
}

export default Product;