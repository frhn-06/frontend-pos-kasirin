interface ICategory {
    _id?: string;
    name?: string;
    img?: string;
}

interface IcategoryUpdate extends ICategory {
    oldImg?: string;
}

export type {ICategory, IcategoryUpdate};