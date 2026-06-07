interface IOrder {
    _id?: string;
    items?: {
        productId?: string;
        qty?: number;
    }[],
    paymentMethod: string;
    paidAmount?: number | string | undefined;
}

export type {IOrder}