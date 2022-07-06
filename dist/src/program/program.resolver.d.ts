import { AssignmentInput, CourseInput, ModuleEnrollmentInput, ModuleFeedbackUpdate, NewAssignment, NewAssignmentResult, NewModule, UpdateModule } from "gql/graphql";
import { ProgramService } from "./program.service";
import { Prisma } from "@prisma/client";
export declare class ProgramResolver {
    private readonly programService;
    constructor(programService: ProgramService);
    modules(): Promise<import(".prisma/client").Module[]>;
    module(args: string): Promise<import(".prisma/client").Module | null | undefined>;
    courses(): Promise<import(".prisma/client").Course[]>;
    assignment(args: string): Promise<import(".prisma/client").Assignment | null>;
    assignments(): Promise<import(".prisma/client").Assignment[]>;
    moduleInCourses(): Promise<import(".prisma/client").ModuleInCourse[]>;
    moduleFeedbacks(): Promise<import(".prisma/client").ModuleFeedback[]>;
    moduleFeedback(id: string): Promise<import(".prisma/client").ModuleFeedback | null>;
    assignmentResults(): Promise<import(".prisma/client").AssignmentResult[]>;
    assignmentResult(id: string): Promise<import(".prisma/client").AssignmentResult | null>;
    moduleEnrollments(): Promise<import(".prisma/client").ModuleEnrollment[]>;
    moduleEnrollment(id: string): Promise<import(".prisma/client").ModuleEnrollment | null>;
    courseEnrollments(): Promise<import(".prisma/client").CourseEnrollment[]>;
    courseEnrollment(id: string): Promise<import(".prisma/client").CourseEnrollment | null>;
    create(args: NewModule): Promise<import(".prisma/client").Module | Error>;
    update(args: UpdateModule): Promise<import(".prisma/client").Module>;
    delete(args: string): Promise<import(".prisma/client").Module>;
    createCourse(args: CourseInput): Promise<Error | import(".prisma/client").Course>;
    updateCourse(id: string, args: CourseInput): Promise<import(".prisma/client").Course>;
    deleteCourse(args: string): Promise<import(".prisma/client").Course>;
    addAssignment(input: NewAssignment): Promise<import(".prisma/client").Assignment>;
    deleteAssignment(args: string, id: string): Promise<import(".prisma/client").Module>;
    updateAssignment(id: string, args: AssignmentInput): Promise<import(".prisma/client").Assignment>;
    addModuleFeedback(moduleId: string, userId: string, data: Prisma.ModuleFeedbackCreateInput): Promise<import(".prisma/client").Module & {
        feedback: import(".prisma/client").ModuleFeedback[];
    }>;
    updateModuleFeedback(id: string, data: ModuleFeedbackUpdate): Promise<import(".prisma/client").ModuleFeedback>;
    deleteModuleFeedback(id: string): Promise<import(".prisma/client").ModuleFeedback>;
    addAssignmentResult(input: NewAssignmentResult): Promise<import(".prisma/client").AssignmentResult>;
    updateAssignmentResult(id: string, result: number): Promise<import(".prisma/client").AssignmentResult>;
    deleteAssignmentResult(id: string): Promise<import(".prisma/client").AssignmentResult>;
    addModuleEnrollment(input: ModuleEnrollmentInput): Promise<import(".prisma/client").ModuleEnrollment & {
        module: import(".prisma/client").Module;
        plan: import(".prisma/client").PlanOfStudy;
    }>;
    updateModuleEnrollment(id: string, input: ModuleEnrollmentInput): Promise<import(".prisma/client").ModuleEnrollment & {
        module: import(".prisma/client").Module;
        plan: import(".prisma/client").PlanOfStudy;
    }>;
    deleteModuleEnrollment(id: string): Promise<import(".prisma/client").ModuleEnrollment>;
    addCourseEnrollment(plan: string, course: string): Promise<import(".prisma/client").CourseEnrollment>;
    updateCourseEnrollment(id: string, plan: string, course: string): Promise<import(".prisma/client").CourseEnrollment>;
    deleteCourseEnrollment(id: string): Promise<import(".prisma/client").CourseEnrollment>;
    pairCourseModule(courseId: string, moduleId: string): Promise<import(".prisma/client").ModuleInCourse>;
    unpairCourseModule(courseId: string, moduleId: string): Promise<Prisma.BatchPayload>;
}
