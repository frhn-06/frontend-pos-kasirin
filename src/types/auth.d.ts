interface IRegister {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}


interface ILogin {
    identifier: string;
    password: string;
}


interface ISesson extends Session {
    _id: string;
    role: string;
    storeId: string | null;
    userName: string;
    fullName: string;
    email: string;
    avatar;
}


export type {IRegister, ILogin, ISesson}