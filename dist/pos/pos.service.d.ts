import { PrismaService } from "../prisma.service";
import { PlanOfStudy } from "@prisma/client";
export declare class PoSService {
    private prisma;
    constructor(prisma: PrismaService);
    findMany(): Promise<PlanOfStudy[]>;
    findByPlanId(id: string): Promise<PlanOfStudy | null>;
    findByStudentID(studentID: string): Promise<PlanOfStudy | null>;
}
