import { Button, Card, CardBody, Chip, cn, Input, Link, Skeleton } from "@heroui/react";
import { IoClose, IoSearch } from "react-icons/io5";
import useCatalogProduct from "./useCatalogProduct";
import { ICategory } from "@/types/category";
import { ICartProducts, IProduct } from "@/types/product";
import { ChangeEvent, SetStateAction, useMemo, useState } from "react";
import convert from "@/utils/convert";
import { useRouter } from "next/router";
import Image from 'next/image';


interface TypeProps {
  dataProducts: IProduct[] | [];
  isLoading: boolean;

  onCategory: (e: string) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;

  setCarts: React.Dispatch<SetStateAction<ICartProducts[]>>;

} 

const CatalogProduct = (props: TypeProps) => {
    const {
      dataProducts,
      isLoading,

      onCategory,
      onSearch,
      onClearSearch,

      setCarts,
    } = props;

    const {
      dataCategoryPos,

      isLoadingCategoryPos
    } = useCatalogProduct();

    const router = useRouter();

    const [search, setSearch] = useState("");

    const searching = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onSearch(e);
    }

    const clearSearching = () => {
      setSearch("");
      onClearSearch()
    }


    const onAddCarts = (object: {id: string; name: string; img: string; category: string; price: number;}) => {
      setCarts((prev) => {
        const isExist = prev.some((item) => {
          return item._id === object.id
        });

        if(isExist) {
          return prev;
        };

        return [
          ...prev,
          {
            _id: object.id,
            name: object.name,
            img: object.img,
            categoryName: object.category,
            price: object.price,
            qty: 1
          }
        ]
      });
    }

    const renderCardProduct = useMemo(() => {
      return (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 ">

          {isLoading && Array.from({length: 8}).map((_,i) => (
            <Card key={i} className="aspect-square p-4 flex flex-col gap-2" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="aspect-[4/3] rounded-lg bg-default-300" />
              </Skeleton>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-4 w-4/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-5 w-1/5 rounded-lg bg-default-300" />
                </Skeleton>
              </div>
            </Card>
          ))}

          {dataProducts.map((product:IProduct) => (
            <div key={product._id} onClick={() => onAddCarts({
              id: `${product._id}`, 
              name: `${product.name}`, 
              img: `${product.img}`,
              category: `${product.categoryId?.name}`, 
              price: Number(product.price),
            })}>
              <div className="active:scale-98 active:shadow-sm transition duration-200">
                <Card className="h-fit cursor-pointer bg-blue-500 relative border-1 border-blue-500">
                  
                  <div className="absolute h-[97%] w-full top-0 bg-white rounded-b-2xl" />

                  <CardBody className="gap-2">
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image src={`${product.img}`} alt="foto-product" width={470} height={470} className="object-cover object-center h-full rounded-lg"/>
                    </div>
                    <div className=" h-full px-2 flex flex-col justify-between gap-2">
                      <h1 className="font-semibold text-sm line-clamp-1">
                        {product.name}
                      </h1>
                      <Chip color="success" size="sm" className="rounded-lg text-gray-100 text-xs cursor-pointer">
                        {convert.IDR(product.price as number)}
                      </Chip>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )
    },[onCategory, onSearch, searching, onClearSearch, clearSearching])
    

    return (
        <div className="h-full w-full">
          <Input placeholder="Cari Product" variant="bordered" className="max-w-100 bg-white rounded-2xl" value={search} startContent={(<IoSearch />)} endContent={(<IoClose className="cursor-pointer" onClick={clearSearching} />)} onChange={(e) => searching(e)} />

          <div className="w-full flex flex-wrap gap-4 mt-4">
            <Button className={cn("bg-blue-500 text-white", {"bg-blue-200 border-1 border-blue-300 text-blue-500" : router.query.category !== ""})} onPress={() => onCategory("")}>
              ALL
            </Button>
            {dataCategoryPos?.data?.map((c: ICategory) => (
              <Button key={c._id} className={cn("bg-blue-500 text-white", {"bg-blue-200 border-1 border-blue-300 text-blue-500" : router.query.category !== `${c._id}`})} onPress={() => onCategory(`${c._id}`)}>
                {c.name}
              </Button>
            ))} 
          </div>

          {renderCardProduct}
        </div>
    )
}

export default CatalogProduct;