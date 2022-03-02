import { PoSService } from "./pos.service";
export declare class PlanOfStudyResolver {
    private readonly planService;
    constructor(planService: PoSService);
    plans(): Promise<import(".prisma/client").PlanOfStudy[]>;
    plan(studentID: string): Promise<import(".prisma/client").PlanOfStudy | null>;
    planByID(arg: string): Promise<import(".prisma/client").PlanOfStudy | null>;
}
