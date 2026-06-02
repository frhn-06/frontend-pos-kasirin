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

export type {IProduct, IProductUpdate}