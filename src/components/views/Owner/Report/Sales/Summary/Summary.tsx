import { IReportSales, Isummarysales } from "@/types/report";
import { Card, CardBody } from "@heroui/react"
import CountUp from "react-countup"

interface TypeProps {
  data: Isummarysales;
}

const Summary = (props: TypeProps) => {
    const {
      data,
  
    } = props;

    return (
        <div className="flex flex-wrap lg:gap-6">
          <div className="w-1/2 sm:max-w-71 p-2 lg:p-0">
            <Card className="aspect-[4/3] p-1 sm:p-2 lg:p-4">
              <CardBody className="items-center">
                <h2 className="flex-1 font-semibold lg:text-xl">
                  Total Pemasukan
                </h2>
                <div className="flex-1 h-full flex justify-center items-center">
                  <p className="xs:text-lg sm:text-2xl lg:text-3xl font-bold">
                    Rp. <CountUp 
                      start={0}
                      end={Number(data?.totalSales)}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="w-1/2 sm:max-w-71 p-2 lg:p-0">
            <Card className="aspect-[4/3] p-1 sm:p-2 lg:p-4">
              <CardBody className="items-center">
                <h2 className="flex-1 font-semibold lg:text-xl">
                  Total Pemasukan
                </h2>
                <div className="flex-1 h-full flex justify-center items-center">
                  <p className="xs:text-lg sm:text-2xl lg:text-3xl font-bold">
                    Rp. <CountUp 
                      start={0}
                      end={Number(data?.totalOrders)}
                      duration={3}
                      separator="."
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="w-1/2 sm:max-w-71 p-2 lg:p-0">
            <Card className="aspect-[4/3] p-1 sm:p-2 lg:p-4">
              <CardBody className="items-center">
                <h2 className="flex-1 font-semibold lg:text-xl">
                  Total Pemasukan
                </h2>
                <div className="flex-1 h-full flex justify-center items-center">
                  <p className="xs:text-lg sm:text-2xl lg:text-3xl font-bold">
                    Rp. <CountUp 
                      start={0}
                      end={Number(data?.averegeOrderValue)}
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

export default Summary