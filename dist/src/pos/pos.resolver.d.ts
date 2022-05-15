import { PlanInput } from "gql/graphql";
import { PoSService } from "./pos.service";
export declare class PlanOfStudyResolver {
    private readonly planService;
    constructor(planService: PoSService);
    plans(): Promise<import(".prisma/client").PlanOfStudy[]>;
    plan(studentID: string): Promise<import(".prisma/client").PlanOfStudy | null>;
    planByID(arg: string): Promise<import(".prisma/client").PlanOfStudy | null>;
    addPlan(args: PlanInput): Promise<import(".prisma/client").PlanOfStudy & {
        student: import(".prisma/client").User | null;
    }>;
    updatePlan(id: string, input: PlanInput): Promise<import(".prisma/client").PlanOfStudy & {
        modules: import(".prisma/client").ModuleEnrollment[];
        courses: import(".prisma/client").CourseEnrollment[];
        assignmentResults: import(".prisma/client").AssignmentResult[];
        student: import(".prisma/client").User | null;
    }>;
    deletePlan(id: string): Promise<import(".prisma/client").PlanOfStudy>;
}
