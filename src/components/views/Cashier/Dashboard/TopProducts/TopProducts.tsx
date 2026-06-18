import { Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import useTopProducts from "./useTopProducts";
import { ITopProductsDashboardCashier } from "@/types/dashboard";
import convert from "@/utils/convert";

const TopProducts = () => {
    const {
      dataTopProducts,
      isLoadingTopProducts
    } = useTopProducts();

    return (
      <div className="w-full max-w-160 flex-1  min-h-fit relative">
        {isLoadingTopProducts ? (
          <div className="bg-black/40 top-0 bottom-0 w-full absolute z-1 backdrop-blur-xs rounded-2xl flex justify-center items-center">
            <Spinner />
          </div>
        ) : dataTopProducts && ( 
          <Card className="h-full z-0">
            <CardHeader className="bg-blue-500 p-4">
              <h1 className="font-semibold text-white">
                Top Products
              </h1>
            </CardHeader>
            <CardBody className="p-4 gap-2">
              { dataTopProducts?.data?.length === 0 ? (
                <div className="min-h-24 flex justify-center items-center">
                  <p className="text-gray-400 italic">
                    Data Produk teratas hari ini kosong
                  </p>
                </div>
              ) :
              dataTopProducts?.data?.map((data: ITopProductsDashboardCashier, id:number) => (
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
        )}

      </div>
    
    )
}

export default TopProducts;