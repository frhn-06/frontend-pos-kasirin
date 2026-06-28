import { ISummaryDashboardOwner, ITrendSalesDashboardOwner } from "@/types/dashboard";
import Summary from "./Summary";
import TrendSales from "./TrendSales";
import LastOrders from "./LastOrders";
import TopProducts from "./TopProducts";
import Ucapan from "./Ucapan";
import { IUser } from "@/types/auth";

interface TypeProps {
  dataSummary: ISummaryDashboardOwner;
  dataTrendSales: ITrendSalesDashboardOwner[];
  user: IUser;
}

const Dashboard = (props: TypeProps) => {
    const {
      dataSummary,
      dataTrendSales,
      user
    } = props;

    return (
        <div className="py-12 px-4 lg:px-8 flex flex-col gap-8">

          <Ucapan user={user} />
          
          <Summary data={dataSummary} />


          <TrendSales data={dataTrendSales} />



          <div className="flex flex-col xl:flex-row gap-6">
            <LastOrders />
          
            <TopProducts />
          </div>

        </div>
    )
}


export default Dashboard;