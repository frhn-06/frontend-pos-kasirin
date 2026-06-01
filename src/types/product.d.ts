interface IProduct {
    _id?: string;
    name?: string;
    storeId?: string;
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

export type {IProduct}