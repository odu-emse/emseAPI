import { Ref } from "../graphql/types";
import { Assignment } from "./Assignment";
import { Instructor } from "./Instructor";
export declare class Module {
    id?: string;
    moduleNumber: number;
    moduleName: string;
    description: string;
    duration: number;
    numSlides: number;
    instructor?: Ref<Instructor>;
    rating: [number];
    keywords: [string];
    hasAssignment: boolean;
    assignments?: Ref<Assignment>[];
    enrolled: [string];
}
export declare const ModuleModel: import("@typegoose/typegoose").ReturnModelType<typeof Module, import("@typegoose/typegoose/lib/types").BeAnObject>;
