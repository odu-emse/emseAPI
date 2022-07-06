import * as mongoose from "mongoose";
export declare type UserDocument = User & mongoose.Document;
export declare class User {
    id: string;
    firstName: string;
    lastName?: string;
    middleName?: string;
    prefix?: string;
    email?: string;
    password?: string;
    passwordConf?: string;
}
export declare const UserSchema: mongoose.Schema<any>;
export declare class CreateUserInput {
    firstName: string;
    lastName: string;
    middleName: string;
    prefix: string;
    email: string;
    password: string;
    passwordConf: string;
}
