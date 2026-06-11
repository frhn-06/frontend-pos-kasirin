interface IOrder {
    _id?: string;
    items?: {
        productId?: string;
        qty?: number;
    }[],
    paymentMethod: string;
    paidAmount?: number | string;
}


interface IItems {
    productId?: string;
    productName?: string;
    price?: number;
    qty?: number;
    subTotal?: number;
}

interface IDataOrder {
    _id?: string;
    items?: IItems[];
    paymentMethod?: string;
    paidAmount?: number | string;
    storeSnapshot: {
        name: string;
        logo: string;
        address: string;
        phone: string;
    };
    cashierSnapshot: {
        name: string;
    }
    totalAmount?: number;
    changeAmount?: number;
    cashierId?: string;
    storeId?: string;
    orderNumber?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type {IOrder, IDataOrder, IItems}