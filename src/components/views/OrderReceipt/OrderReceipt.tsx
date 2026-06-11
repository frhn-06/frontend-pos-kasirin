import { IDataOrder } from "@/types/order";
import convert from "@/utils/convert";
import { cn } from "@heroui/react";
import Image from "next/image";

interface TypeProps {
  order: IDataOrder;
}

const OrderReceipt = (props: TypeProps) => {
    const {
      order,
    } = props;


    return (
      <div className="w-full max-w-[380px] bg-white min-h-[300px] flex flex-col items-center p-4 gap-3 text-xs Font-base-struk">
        <div className="relative w-1/2">
          <Image src={`${order.storeSnapshot.logo}`} alt="store-logo"  className="w-full" width={100} height={100}/>
        </div>

        <div className="text-center">
          <h1 className="text-sm">
            {order.storeSnapshot.name}
          </h1>
          <p>
            {order.storeSnapshot.address}
          </p>
        </div>

        <div className=" w-full pb-2">
          <div>
            <h3>
              Pesanan: {order.orderNumber} 
            </h3>
            <h3>
              Cashier: {order.cashierSnapshot.name}
            </h3>
            <h3>
              Date: {convert.TimeInTable(`${order.createdAt}`)} WIB
            </h3>
          </div>
        </div>

        <div className=" w-full">
          <table className="w-full border-y-1 border-dashed">
            <tbody>
              {order.items?.map((i, index) => (
                <tr key={index}>
                  <td>
                    <p>
                      {i.productName}
                    </p>
                    <p>
                      {i.qty} X {convert.IDR(Number(i.price))}
                    </p>
                  </td>
                  <td>
                    {convert.IDR(Number(i.qty) * Number(i.price))}
                  </td>
                </tr>
              ))}

              <tr className="border-t-1 border-dashed">
                <td>
                  Subtotal
                </td>
                <td>
                  {convert.IDR(Number(order.totalAmount))}
                </td>
              </tr>
              <tr>
                <td>
                  Dibayar
                </td>
                <td>
                  {convert.IDR(Number(order.paidAmount))}
                </td>
              </tr>
              <tr>
                <td>
                  Kembalian
                </td>
                <td>
                  {order.changeAmount !== 0 ? convert.IDR(Number(order.changeAmount)) : "-"}
                </td>
              </tr>

              
              <tr className="border-t-1 border-dashed">
                <td>
                  Payment
                </td>
                <td>
                  {order.paymentMethod === "cash" ? "Cash" : order.paymentMethod === "qris" ? "Qris" : "Transfer"}
                </td>
              </tr>
              <tr>
                <td>
                  Status
                </td>
                <td>
                  {order.status === "paid" ? "Lunas" : "Tidak Lunas"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center">
          <p>
            Terimakasih atas pesanan anda
          </p>
        </div>
      </div>
    )
}

export default OrderReceipt;