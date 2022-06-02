import * as mongoose from "mongoose";
import { User } from "../user/user.schema";
export declare type PoSDocument = PlanOfStudy & mongoose.Document;
export declare class PlanOfStudy {
    _id: string;
    student: User | string;
}
export declare const PoSSchema: mongoose.Schema<any>;
export declare class PlanOfStudyInput {
    student: string;
}
