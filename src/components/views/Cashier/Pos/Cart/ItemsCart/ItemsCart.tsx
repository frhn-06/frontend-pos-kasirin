import { ICartProducts } from "@/types/product"
import convert from "@/utils/convert";
import { SetStateAction, useCallback } from "react";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";

interface TypeProps {
  carts: ICartProducts[];
  setCarts: React.Dispatch<SetStateAction<ICartProducts[]>>;
  resetInput: () => void;
}

const ItemsCart = (props: TypeProps) => {
    const {
      carts,
      setCarts,
      resetInput
    } = props;

    const addQty = (id: string) => {
      setCarts((prev) => {
        return prev.map((p) => {
          if(p._id === id) {
            return {
              ...p,
              qty: Number(p.qty) + 1
            }
          } else {
            return p
          }
        })
       
      })
    }

    const minQty = (id: string) => {
      setCarts((prev) => {
        return prev.map((p) => {
          if(p._id === id) {
            if(Number(p.qty) <= 1) {
              return p
            } else {
              return {
                ...p,
                qty: Number(p.qty) - 1
              }
            }
          } else {
            return p
          }
        })
      })
    }

    const onDeleteCart = (id: string) => {
      setCarts((prev) => {
        return prev.filter((c) => c._id !== id);
      })
      
    }
    
    const renderItemsCart = useCallback(() => {
      return carts.map((cart: ICartProducts) => (
        <div key={cart._id}  className="flex gap-4 rounded-xl border-1 border-gray-400/30 p-2 min-h-24 relative">
          <div className="w-1/4 h-full">
            <Image src={`${cart.img}`} alt={`foto-cart-${cart.name}`} width={480} height={480} className="w-full aspect-square object-cover object-center rounded-lg" />
          </div>

          <div className="flex flex-col justify-between">
            <h4 className="font-semibold lg:text-sm line-clamp-1">
              {cart.name}
            </h4>

            <div className="flex flex-col gap-1">
              <p className="text-sm">
                Harga: <b>{convert.IDR(Number(cart.price))}</b>
              </p>

              <div className="flex items-center gap-4">
                <FaMinusSquare className="text-green-600 w-5 h-5 cursor-pointer active:text-green-700" onClick={() => minQty(`${cart._id}`)} />
                <span>
                  {cart.qty}
                </span>
                <FaPlusSquare className="text-green-600 w-5 h-5 cursor-pointer active:text-green-700" onClick={() => addQty(`${cart._id}`)} />
              </div>

              <p className="text-sm">
                Sub Total: <b>{convert.IDR(Number(cart.price) * Number(cart.qty))}</b>
              </p>
            </div>
          </div>

          <div className="absolute top-1 right-1">
            <IoIosCloseCircle className="text-danger cursor-pointer active:text-red-700" onClick={() => onDeleteCart(`${cart._id}`)} />
          </div>
        </div> 
      ))
    },[carts])

    return (
        <div className="flex flex-col gap-3">
          {renderItemsCart()}
        </div>
    )
}


export default ItemsCart;