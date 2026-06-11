import OrderReceiptLayout from "@/components/layouts/OrderReceiptLayout";
import OrderReceipt from "@/components/views/OrderReceipt";
import orderService from "@/services/order.service";
import StoreService from "@/services/store.service";
import { Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";





const PageOrderReceipt = () => {

    const router = useRouter();
    const getOrder = async () => {
        const result = await orderService.findById(`${router.query.id}`);
        return result
    }
    
    const {data: dataOrder, isLoading: isLoadingOrder} = useQuery({
        queryKey: ["OrderReceipt"],
        queryFn: getOrder,
        enabled: !!router.query.id
    });

    if(isLoadingOrder ) return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Spinner color="primary" />
        </div>
    )

    return (
        <OrderReceiptLayout title="">
            <div className="flex flex-col gap-8">
                <OrderReceipt order={dataOrder?.data?.data}  />

                <div className="flex justify-between items-center px-4">
                    <Link  href="/cashier/pos">
                        <Button className="bg-blue-500 text-white">
                            Pos
                        </Button>
                    </Link>

                    <Link  href="/cashier/transaction">
                        <Button className="bg-blue-500 text-white">
                            Transaction
                        </Button>
                    </Link>

                    <Button className="bg-blue-500 text-white">
                        Cetak
                    </Button>
                </div>
            </div>
        </OrderReceiptLayout>
    )
}

export default PageOrderReceipt;