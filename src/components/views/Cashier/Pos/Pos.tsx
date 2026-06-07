import { useRouter } from "next/router";
import CatalogProduct from "./CatalogProduct";
import usePos from "./usePos";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import { ICartProducts } from "@/types/product";

const Pos = () => {
    const {
        currentPage,
        currentLimit,
        currentCategory,
        currentSearch,

        handlePage,
        handleLimit,
        handleCategory,
        handleSearch,
        handleClearSearch,

        setUrl,

        dataProducts,
        isLoadingProducts,
        refetchProducts,
        isRefetchingProducts
    } = usePos();

    const router = useRouter();

    useEffect(() => {
      setUrl();
    }, [router.isReady])


    const [carts, setCarts] = useState<ICartProducts[]>([]);

    const [totalFinalPrice, setTotalFinalPrice] = useState(0);

    return (
        <div className="py-12 px-4 lg:px-8">
          <div className="flex flex-col gap-8 xl:flex-row h-full w-full">
            <div className="min-h-60 w-full">
              {Object.keys(router.query).length > 0 && (
                <CatalogProduct
                  dataProducts={dataProducts?.data || []}
                  isLoading={isLoadingProducts}

                  onCategory={handleCategory}
                  onSearch={handleSearch}
                  onClearSearch={handleClearSearch}

                  setCarts={setCarts}
                />
              )}
            </div>

            <div className="w-full md:w-120 min-h-60">
              <Cart carts={carts} setCarts={setCarts} totalFinalPrice={totalFinalPrice} setTotalFinalPrice={setTotalFinalPrice} />
            </div>
          </div>
        </div>
    )
}

export default Pos;