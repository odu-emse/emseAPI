import { Document } from "mongoose";
export interface User extends Document {
    readonly _id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName: string;
    readonly email: string;
    readonly prefix: string;
    readonly dob: string;
    readonly password: string;
    readonly passwordConf: string;
    readonly group: string;
    readonly active: boolean;
    readonly created_at: Date;
}
