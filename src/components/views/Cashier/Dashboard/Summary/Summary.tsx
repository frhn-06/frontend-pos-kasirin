import { ISummaryDashboardCashier, ISummaryDashboardOwner } from "@/types/dashboard";
import { Card, CardBody } from "@heroui/react";
import CountUp from "react-countup";


interface TypePops {
  data: ISummaryDashboardCashier;
}
const Summary = (props: TypePops) => {
    const {
      data
    } = props;

    return (
        <div className="flex flex-wrap">
          <div className="w-1/2 sm:max-w-71 p-1 sm:p-2 lg:p-3">
            <Card className="aspect-[4/3] p-1 sm:p-2 lg:p-4">
              <CardBody className="items-center">
                <h2 className="flex-1 font-semibold text-lg lg:text-xl">
                  Total Pemasukan
                </h2>
                <div className="flex-1 h-full flex justify-center items-center">
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold">
                    Rp. <CountUp 
                      start={0}
                      end={Number(data.totalPemasukanToday)}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="w-1/2 sm:max-w-71 p-1 sm:p-2 lg:p-3">
            <Card className="aspect-[4/3] p-1 sm:p-2 lg:p-4">
              <CardBody className="items-center">
                <h2 className="flex-1 font-semibold text-lg lg:text-xl">
                  Jumlah Transaksi
                </h2>
                <div className="flex-1 h-full flex justify-center items-center">
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold">
                    <CountUp 
                      start={0}
                      end={Number(data.totalOrderToday)}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="w-1/2 sm:max-w-71 p-1 sm:p-2 lg:p-3">
            <Card className="aspect-[4/3] p-1 sm:p-2 lg:p-4">
              <CardBody className="items-center">
                <h2 className="flex-1 font-semibold text-lg lg:text-xl">
                  Total Produk keluar
                </h2>
                <div className="flex-1 h-full flex justify-center items-center">
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold">
                    <CountUp 
                      start={0}
                      end={Number(data.totalProdukKeluarToday)}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

         
        </div>
    )
}

export default Summary;