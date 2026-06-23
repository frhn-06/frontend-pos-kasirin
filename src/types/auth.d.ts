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
    id?: string;
    role?: string;
    storeId?: string | null;
    userName?: string;
    fullName?: string;
    email?: string;
    avatar?: string;
    password?: string;
}

interface IUser extends ISesson {
    _id?: string;
}

interface IPassword {
    oldPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

export type {IRegister, ILogin, ISesson, IUser, IPassword}