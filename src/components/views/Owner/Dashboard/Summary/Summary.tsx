import { ISummaryDashboardOwner } from "@/types/dashboard";
import { Card, CardBody } from "@heroui/react"
import CountUp from "react-countup"

interface TypeProps {
  data: ISummaryDashboardOwner;
}

const Summary = (props: TypeProps) => {
    const {
      data,
    } = props;

    return (
        <div className="flex flex-wrap">
          <div className="w-1/2 sm:max-w-71 p-2 lg:p-3">
            <Card className="p-1 sm:p-2 shadow-lg shadow-blue-700/60 border-1 border-blue-500 relative bg-blue-500">
              <div className="bg-white absolute top-0 l-0 w-full h-full rounded-l-2xl">

              </div>
              <CardBody className="gap-4">
                <h2 className="flex-1 font-semibold lg:text-lg">
                  Total Pemasukan
                </h2>
                <div className="flex-1 h-full">
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

          <div className="w-1/2 sm:max-w-71 p-2 lg:p-3">
            <Card className="p-1 sm:p-2 shadow-lg shadow-blue-700/60 border-1 border-blue-500 relative bg-blue-500">
              <div className="bg-white absolute top-0 l-0 w-full h-full rounded-l-2xl">

              </div>
              <CardBody className="gap-4">
                <h2 className="flex-1 font-semibold lg:text-lg">
                  Jumlah Transaksi
                </h2>
                <div className="flex-1 h-full">
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

          <div className="w-1/2 sm:max-w-71 p-2 lg:p-3">
            <Card className="p-1 sm:p-2 shadow-lg shadow-blue-700/60 border-1 border-blue-500 relative bg-blue-500">
              <div className="bg-white absolute top-0 l-0 w-full h-full rounded-l-2xl">

              </div>
              <CardBody className="gap-4">
                <h2 className="flex-1 font-semibold lg:text-lg">
                  Total Produk keluar
                </h2>
                <div className="flex-1 h-full">
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

          <div className="w-1/2 sm:max-w-71 p-2 lg:p-3">
            <Card className="p-1 sm:p-2 shadow-lg shadow-blue-700/60 border-1 border-blue-500 relative bg-blue-500">
              <div className="bg-white absolute top-0 l-0 w-full h-full rounded-l-2xl">

              </div>
              <CardBody className="gap-4">
                <h2 className="flex-1 font-semibold lg:text-lg">
                  Rata-rata Per Transaksi
                </h2>
                <div className="flex-1 h-full">
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold">
                    Rp. <CountUp 
                      start={0}
                      end={Number(data.rataRataPemasukanToday)}
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