import { IReportSales } from "@/types/report"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa6"
import Summary from "./Summary"
import useSales from "./useSales";
import DateFilter from "./DateFilter";
import SalesByDay from "./SalesByDay";

interface TypeProps {
  data: IReportSales; 
  isLoading: boolean;

  currentStart: string;
  currentEnd: string;
}
const Sales = (props: TypeProps) => {
    const {
      data,
      isLoading,

      currentStart,
      currentEnd
    } = props;

    const {
      handleChangeStartDate,
      handleChangeEndDate,
      handleClearStartDate,
      handleClearEndDate
    } = useSales()


    return (
        <div className="py-12 px-4 lg:px-8">
          <div className="flex flex-col gap-8 ">
            <div className="py-2 px-6 rounded-xl flex justify-between items-center w-fit gap-3 shadow-lg bg-white text-blue-500 border-1 border-gray-400/30">
              <Link href="/owner/report" className="hover:text-blue-700">
                Report
              </Link>
              <FaChevronRight />
              <Link href="" onClick={(e) => e.preventDefault()} className="hover:text-blue-700 font-bold">
                Sales
              </Link>
            </div>


            <DateFilter 
              currentStart={currentStart}
              currentEnd={currentEnd}
              
              onChangeStart={handleChangeStartDate}
              onChangeEnd={handleChangeEndDate}

              onClearStart={handleClearStartDate}
              onClearEnd={handleClearEndDate}
            />

            
            <Summary data={data?.summary} />


            
            <SalesByDay data={data?.salesByDay || []} isLoading={isLoading} />
          </div>

        </div>
    )
}

export default Sales