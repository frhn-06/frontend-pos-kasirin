interface IStore {
    name?: string;
    phone?: string | number;
    address?: string;
    description?: string;
    logo?: string;
    slug? :string;
    ownerId?: string;
}

export type {IStore}