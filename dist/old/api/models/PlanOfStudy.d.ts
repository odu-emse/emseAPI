import { Ref } from "../graphql/types";
import { User } from "./User";
import { Module } from "./Module";
import { Degree } from "./Degree";
import { Grade } from "./Grade";
export declare class PlanOfStudy {
    id?: string;
    student: Ref<User>;
    modules?: Ref<Module>[];
    grades?: Ref<Grade>[];
    degree?: Ref<Degree>;
    adviser?: Ref<User>;
}
export declare const PlanOfStudyModel: import("@typegoose/typegoose").ReturnModelType<typeof PlanOfStudy, import("@typegoose/typegoose/lib/types").BeAnObject>;
