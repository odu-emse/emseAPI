import { AssignmentInput, CourseInput, ModuleFeedbackUpdate, NewAssignment, UpdateModule, NewAssignmentResult, ModuleEnrollmentInput } from "gql/graphql";
import { Module, Course, Assignment, ModuleInCourse, ModuleFeedback, AssignmentResult, ModuleEnrollment, CourseEnrollment } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
export declare class ProgramService {
    private prisma;
    constructor(prisma: PrismaService);
    modules(): Promise<Module[]>;
    module(id: string): Promise<Module | null>;
    courses(): Promise<Course[]>;
    assignments(): Promise<Assignment[]>;
    assignment(id: string): Promise<Assignment | null>;
    moduleInCourses(): Promise<ModuleInCourse[]>;
    moduleFeedbacks(): Promise<ModuleFeedback[]>;
    moduleFeedback(id: string): Promise<ModuleFeedback | null>;
    assignmentResults(): Promise<AssignmentResult[]>;
    assignmentResult(id: string): Promise<AssignmentResult | null>;
    moduleEnrollments(): Promise<ModuleEnrollment[]>;
    moduleEnrollment(id: string): Promise<ModuleEnrollment | null>;
    courseEnrollments(): Promise<CourseEnrollment[]>;
    courseEnrollment(id: string): Promise<CourseEnrollment | null>;
    addModule(data: Prisma.ModuleCreateInput): Promise<Module | Error>;
    updateModule(data: UpdateModule): Promise<Module>;
    deleteModule(id: string): Promise<Module>;
    addCourse(data: Prisma.CourseCreateInput): Promise<Course | Error>;
    updateCourse(id: string, data: CourseInput): Promise<Course>;
    deleteCourse(id: string): Promise<Course>;
    deleteAssignment(module: string, id: string): Promise<Module>;
    addAssignment(input: NewAssignment): Promise<Assignment>;
    updateAssignment(id: string, data: AssignmentInput): Promise<Assignment>;
    addModuleFeedback(moduleId: string, userId: string, input: Prisma.ModuleFeedbackCreateInput): Promise<Module & {
        feedback: ModuleFeedback[];
    }>;
    updateModuleFeedback(id: string, input: ModuleFeedbackUpdate): Promise<ModuleFeedback>;
    deleteModuleFeedback(id: string): Promise<ModuleFeedback>;
    addAssignmentResult(input: NewAssignmentResult): Promise<AssignmentResult>;
    updateAssignmentResult(id: string, result: number): Promise<AssignmentResult>;
    deleteAssignmentResult(id: string): Promise<AssignmentResult>;
    addModuleEnrollment(input: ModuleEnrollmentInput): Promise<ModuleEnrollment & {
        module: Module;
        plan: import(".prisma/client").PlanOfStudy;
    }>;
    updateModuleEnrollment(id: string, input: ModuleEnrollmentInput): Promise<ModuleEnrollment & {
        module: Module;
        plan: import(".prisma/client").PlanOfStudy;
    }>;
    deleteModuleEnrollment(id: string): Promise<ModuleEnrollment>;
    addCourseEnrollment(planId: string, courseId: string): Promise<CourseEnrollment>;
    updateCourseEnrollment(id: string, planId: string, courseId: string): Promise<CourseEnrollment>;
    deleteCourseEnrollment(id: string): Promise<CourseEnrollment>;
    pairCourseModule(courseId: string, moduleId: string): Promise<ModuleInCourse>;
    unpairCourseModule(courseId: string, moduleId: string): Promise<Prisma.BatchPayload>;
}
