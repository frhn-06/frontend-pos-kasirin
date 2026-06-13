import { Card, CardBody, CardHeader } from "@heroui/react";
import useTopProducts from "./useTopProducts";
import { ITopProductsDashboardOwner } from "@/types/dashboard";
import convert from "@/utils/convert";

const TopProducts = () => {
    const {
      dataTopProducts,
      isLoadingTopProducts
    } = useTopProducts();

    return (
        <Card className="w-full max-w-160 flex-1 min-h-fit">
          <CardHeader className="bg-blue-500 p-4">
            <h1 className="font-semibold text-white">
              Top Products
            </h1>
          </CardHeader>
          <CardBody className="p-4 gap-2">
            {dataTopProducts?.data?.map((data: ITopProductsDashboardOwner, id:number) => (
              <div key={id} className="flex items-end border-b-2 border-gray-400/30">
                <div className="flex-3">
                  <h3>
                    {data.productName}
                  </h3>
                  <p>
                    {convert.IDR(Number(data.price))}
                  </p>
                </div>
                <div className="flex-1">
                  <p>
                    {data.totalSold}
                  </p>
                </div>
              </div>
            ) )}
          </CardBody>
        </Card>
    )
}

export default TopProducts;