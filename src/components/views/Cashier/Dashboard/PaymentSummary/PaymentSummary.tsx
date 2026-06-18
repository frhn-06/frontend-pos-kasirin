import { IPaymentSummary } from "@/types/dashboard";
import { Card, CardBody, CardHeader } from "@heroui/react";
import CountUp from "react-countup";

interface TypeProps {
    data: IPaymentSummary[];
}
const PaymentSummary = (props: TypeProps) => {
    const {
      data
    } = props;

    return (
        <div className="w-full max-w-160 flex-1">
          <Card>
            <CardHeader className="bg-blue-500 p-4">
              <h1 className="font-semibold text-white">
                Payment
              </h1>
            </CardHeader>
            <CardBody className="p-4 gap-6">
              {data.length === 0 ? (
                <div className="min-h-24 flex justify-center items-center">
                  <p className="text-gray-400 italic">
                    Data Payment Summary hari ini kosong
                  </p>
                </div>
              ) : 
              data.map((d: IPaymentSummary, i:number) => (
                <div key={i} className="flex-col flex gap-2">
                  <div className="flex">
                    <p className="flex-2 font-semibold">
                      {d.paymentMethod}
                    </p>
                    <p className="flex-1">
                      Rp. <CountUp 
                        start={0}
                        end={Number(d.total)}
                        duration={2}
                        separator="."
                      />
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="h-2 bg-gray-300 rounded-xl flex-5 relative">
                      <div className="absolute bg-blue-500 rounded-xl top-0 bottom-0" style={{
                        width: `${d.percentage}%`,
                      }}></div>
                    </div>
                    
                    <p className="flex-1 text-xl">
                      <CountUp 
                        start={0}
                        end={Number(d.percentage)}
                        duration={2}
                        separator="."
                      />%
                    </p>
                  </div>

                </div>
              ))}
            </CardBody>
          </Card>
        </div>
    )
}

export default PaymentSummary;