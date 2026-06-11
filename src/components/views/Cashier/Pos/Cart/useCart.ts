import { toasterContext } from '@/context/toasterContext';
import orderService from '@/services/order.service';
import { IOrder } from '@/types/order';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';



const schemaOrder = yup.object({
    items: yup.array().of(yup.object({
        productId: yup.string(),
        qty: yup.number(),
    })),
    paymentMethod: yup.string().required("silahkan pilih metode pembayaran"),
    paidAmount: yup.string().optional()
})

const useCart = () => {
    const toaster = useContext(toasterContext);

    const router = useRouter();

    const {handleSubmit: handleSubmitOrder, control, formState: {errors}, setValue, setError, getValues, reset} = useForm({
        resolver: yupResolver(schemaOrder)
    })

    const createOrder = async(payload: IOrder) => {
        const {data} = await orderService.create(payload);
        return data;
    }

    const {mutate:mutateCreateOrder, isPending:isPendingCreateOrder, isSuccess: isSuccessCreateOrder} = useMutation({
        mutationFn: (payload: IOrder) => createOrder(payload),
        onError: (error) => {
            toaster.setToaster({
                type: "error",
                message: error.message
            });
            setError("root", {
                type: "server",
                message: error.message
            });
        },
        onSuccess: (data) => {
            toaster.setToaster({
                type: "success",
                message: "order berhasil"
            });

            const id = data.data._id;
            router.push(`/order/${id}/receipt`)
        }

    })

    const onCreateOrder = (payload: IOrder) => {
        let data = payload
        if(payload.paidAmount) {
            data = {
                ...payload,
                paidAmount: Number(payload.paidAmount)
            }
        } else {
            data = {
                ...payload,
                paidAmount: 0
            }
        }
        mutateCreateOrder(data);
    }

    return {
        handleSubmitOrder,
        setValue,
        errors,
        control,
        getValues,
        reset,

        isPendingCreateOrder,
        isSuccessCreateOrder,
        onCreateOrder
    }
}

export default useCart;