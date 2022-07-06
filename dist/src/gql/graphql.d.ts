export declare class NewUser {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    prefix?: string;
    password: string;
    passwordConf: string;
}
export declare class UpdateUser {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    prefix?: string;
    password?: string;
    passwordConf?: string;
}
export declare class User {
    _id?: string;
    email?: string;
    createdAt?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    prefix?: string;
    password?: string;
    passwordConf?: string;
    isAdmin?: boolean;
}
export declare abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;
    abstract user(id: string): User | Promise<User>;
}
export declare abstract class IMutation {
    abstract deleteUser(id: string): User | Promise<User>;
    abstract createUser(input?: NewUser): User | Promise<User>;
    abstract updateUser(input?: UpdateUser): User | Promise<User>;
}
