import { PrismaService } from "../prisma.service";
import { PlanOfStudy } from "@prisma/client";
import { PlanInput } from "gql/graphql";
export declare class PoSService {
    private prisma;
    constructor(prisma: PrismaService);
    plans(): Promise<PlanOfStudy[]>;
    planById(id: string): Promise<PlanOfStudy | null>;
    plan(studentID: string): Promise<PlanOfStudy | null>;
    addPlan(input: PlanInput): Promise<PlanOfStudy & {
        student: import(".prisma/client").User | null;
    }>;
    updatePlan(id: string, input: PlanInput): Promise<PlanOfStudy & {
        modules: import(".prisma/client").ModuleEnrollment[];
        assignmentResults: import(".prisma/client").AssignmentResult[];
        courses: import(".prisma/client").CourseEnrollment[];
        student: import(".prisma/client").User | null;
    }>;
    deletePlan(id: string): Promise<PlanOfStudy>;
}
