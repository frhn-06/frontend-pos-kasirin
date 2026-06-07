interface IProduct {
    _id?: string;
    name?: string;
    storeId?: string;
    img?: string;
    categoryId?: {
        _id?: string;
        name?: string;
    };
    description?: string;
    price?: number;
    isAvailible?: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface IProductUpdate extends Omit<IProduct, "categoryId"> {
    oldImg?: string;
    categoryId?: string;
}

// interface ICartProducts extends Omit<IProduct, "storeId" | "description" | "isAvailible" | "isDeleted" | "createdAt" | "updatedAt">
interface ICartProducts {
    _id?: string;
    name?: string;
    img?: string;
    categoryName?: string;
    price?: number;
    qty?: number;
}


export type {IProduct, IProductUpdate, ICartProducts}