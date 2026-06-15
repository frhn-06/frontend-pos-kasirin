import { IPaymentSummary, ISummaryDashboardCashier } from "@/types/dashboard";
import Summary from "./Summary";
import TopProducts from "./TopProducts";
import PaymentSummary from "./PaymentSummary";
import LastOrders from "./LastOrders";

interface TypeProps {
  dataSummary: ISummaryDashboardCashier;
  dataPaymentSummary: IPaymentSummary[];
}

const Dashboard = (props: TypeProps) => {
    const {
      dataSummary,
      dataPaymentSummary
    } = props;

    return (
        <div className="py-12 px-4 lg:px-8 flex flex-col gap-8">
                  
          <Summary data={dataSummary} />
        
        
          <div className="flex flex-col xl:flex-row gap-6">
            <PaymentSummary data={dataPaymentSummary} />
          
            <TopProducts />
          </div>

          <LastOrders />
        
        </div>
    )
}

export default Dashboard;