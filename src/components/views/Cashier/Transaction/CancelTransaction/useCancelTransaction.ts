import { toasterContext } from "@/context/toasterContext";
import orderService from "@/services/order.service";
import productService from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useCancelTransaction = (id: string) => {
    const toaster = useContext(toasterContext);

    const CancelTransaction = async () => {
        const {data} = await orderService.cancel(id);
        return data;
    }

    const {mutate:mutateCancelTransaction, isPending:isPendingCancelTransaction, isSuccess:isSuccessCancelTransaction} = useMutation({
        mutationFn: CancelTransaction,
        onError: (error) => {
            toaster.setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            toaster.setToaster({
                type: "success",
                message: "berhasil mencancel transaksi"
            })
        },
    });

    const UnCancelTransaction = async () => {
        const {data} = await orderService.uncancel(id);
        return data;
    }

    const {mutate:mutateUnUnCancelTransaction, isPending:isPendingUnCancelTransaction, isSuccess:isSuccessUnCancelTransaction} = useMutation({
        mutationFn: UnCancelTransaction,
        onError: (error) => {
            toaster.setToaster({
                type: "error",
                message: error.message
            })
        },
        onSuccess: () => {
            toaster.setToaster({
                type: "success",
                message: "berhasil men uncancel transaksi"
            })
        },
    });

    const onCancel = () => {
        mutateCancelTransaction();
    }

    const onUnCancel = () => {
        mutateUnUnCancelTransaction();
    }
    return {
        onCancel,
        isPendingCancelTransaction,
        isSuccessCancelTransaction,

        onUnCancel,
        isPendingUnCancelTransaction,
        isSuccessUnCancelTransaction
    }
}

export default useCancelTransaction
