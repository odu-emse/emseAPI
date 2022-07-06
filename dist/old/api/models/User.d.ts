import { Ref } from "../graphql/types";
import { PlanOfStudy } from "./PlanOfStudy";
export declare class User {
    id?: string;
    firstName: string;
    lastName?: string;
    middleName?: string;
    prefix?: string;
    email?: string;
    password?: string;
    passwordConf?: string;
    planOfStudy?: Ref<PlanOfStudy>;
    group?: string;
    active?: boolean;
}
export declare const UserModel: import("@typegoose/typegoose").ReturnModelType<typeof User, import("@typegoose/typegoose/lib/types").BeAnObject>;
