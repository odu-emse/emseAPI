import { Ref } from "../graphql/types";
import { Assignment } from "./Assignment";
export declare class Grade {
    assignment: Ref<Assignment>;
    result: number;
}
export declare const GradeModel: import("@typegoose/typegoose").ReturnModelType<typeof Grade, import("@typegoose/typegoose/lib/types").BeAnObject>;
