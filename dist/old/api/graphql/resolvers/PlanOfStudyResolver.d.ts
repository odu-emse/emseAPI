import { PlanOfStudy } from "../../models/PlanOfStudy";
export declare class PlanOfStudyResolver {
    getPlan(id: string): Promise<import("@typegoose/typegoose").DocumentType<PlanOfStudy>>;
    getPlans(): Promise<PlanOfStudy[]>;
}
