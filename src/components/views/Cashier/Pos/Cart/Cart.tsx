import { ICartProducts } from "@/types/product";
import convert from "@/utils/convert";
import { Button, Card, CardBody, CardFooter, CardHeader, input, Input, Radio, RadioGroup, Spinner } from "@heroui/react";
import {  SetStateAction, useCallback, useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import ItemsCart from "./ItemsCart";
import { Controller } from "react-hook-form";
import useCart from "./useCart";
import cn from "@/utils/cn";


interface TypeProps {
  carts: ICartProducts[];
  setCarts: React.Dispatch<SetStateAction<ICartProducts[]>>;
  totalFinalPrice: number;
  setTotalFinalPrice: React.Dispatch<SetStateAction<number>>;
}
const Cart = (props: TypeProps) => {
    const {
      carts,
      setCarts,
      totalFinalPrice,
      setTotalFinalPrice
    } = props;

    const {
        handleSubmitOrder,
        setValue,
        errors,
        control,
        getValues,
        reset,

        isPendingCreateOrder,
        isSuccessCreateOrder,
        onCreateOrder
    } = useCart();
    

    const totalPrice = useCallback(() => {
      const total = carts.reduce((sum, c) => {
        return sum + (Number(c.price) * Number(c.qty));
      },0)

      setTotalFinalPrice(total);

      return total;
    },[carts, setCarts]);

    useEffect(() => {
      if(carts.length === 0) {
        reset();
      }


      const data = carts.map((c) => {
        return {
          productId: c._id,
          qty: c.qty
        }
      })
      setValue("items", data);
    },[carts, setCarts])


    useEffect(() => {
      if(isSuccessCreateOrder) {
        reset();
        setCarts([]);
      }
    }, [isSuccessCreateOrder])



		return (
			<Card className="min-h-60 w-full">
        <form onSubmit={handleSubmitOrder(onCreateOrder)}>
          <CardHeader className="flex gap-2">
            <FaCartShopping />
            <h2 className="font-semibold text-lg">
              Shoping Cart
            </h2>
          </CardHeader>

          <CardBody>
            {carts.length < 1 ? (
              <div className="flex flex-col justify-center items-center">
                <MdOutlineRemoveShoppingCart className="w-12 h-12 text-default-400" />
                <p className="text-default-400">
                  Keranjang Kosong
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                
                <ItemsCart carts={carts} setCarts={setCarts} resetInput={reset} />

                <div>
                  Total = <b>{convert.IDR(Number(totalPrice()))}</b>
                </div>

              
                <Controller control={control} name="paymentMethod" render={({field}) => (
                  <RadioGroup {...field} 
                    color="primary" 
                    size="sm" 
                    label={(<p className="text-black font-semibold">Metode Pembayaran</p>)} 
                    onChange={(value) => {
                      field.onChange(value)
                      setValue("paidAmount", "");
                    }}
                    isInvalid={!!errors.paidAmount} 
                    errorMessage={errors?.paidAmount?.message}
                  >
                    <Radio value="cash">Cash</Radio>
                    <Radio value="qris">Qris</Radio>
                    <Radio value="transfer" isDisabled>Transfer</Radio>
                  </RadioGroup>
                )} />

             
                <Controller control={control} name="paidAmount" render={({field}) => (
                  <Input {...field} 
                    variant="bordered" 
                    label={(<p className="text-black font-semibold">Nominal</p>)}
                    labelPlacement="outside"
                    isInvalid={!!errors.paidAmount} 
                    errorMessage={errors?.paidAmount?.message} 
                    startContent={(<p className="text-default-500">Rp.</p>)} 
                    className={cn({"hidden" : getValues("paymentMethod") !== "cash"})} 
                  />
                )} />

                {errors.root && (
                  <p className="text-danger">
                    {errors.root?.message}
                  </p>
                )}
              </div>
            )}
          </CardBody>
          <CardFooter>
            <Button type="submit" className="bg-blue-500 text-white" fullWidth isDisabled={carts.length === 0 || isPendingCreateOrder} >
              {isPendingCreateOrder ? <Spinner size="sm" color="default" /> : "Order"}
            </Button>
          </CardFooter>
        </form>
			</Card>
		)
}

export default Cart;