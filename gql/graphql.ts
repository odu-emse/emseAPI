
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    GRADER = "GRADER"
}

export class PlanInput {
    student?: Nullable<string>;
}

export class NewModule {
    moduleNumber: number;
    moduleName: string;
    description: string;
    duration: number;
    intro: string;
    numSlides: number;
    keywords: string[];
}

export class UpdateModule {
    id: string;
    moduleName?: Nullable<string>;
    moduleNumber?: Nullable<number>;
    intro?: Nullable<string>;
    description?: Nullable<string>;
    duration?: Nullable<number>;
    numSlides?: Nullable<number>;
    keywords?: Nullable<string[]>;
}

export class NewAssignment {
    name: string;
    dueAt: string;
    module: string;
}

export class AssignmentInput {
    name?: Nullable<string>;
    dueAt?: Nullable<string>;
    module?: Nullable<string>;
}

export class CourseInput {
    name: string;
}

export class ModuleFeedbackInput {
    feedback: string;
    rating: number;
}

export class ModuleFeedbackUpdate {
    feedback?: Nullable<string>;
    rating?: Nullable<number>;
}

export class NewAssignmentResult {
    assignment: string;
    student: string;
    grader: string;
    result: number;
}

export class ModuleEnrollmentInput {
    module: string;
    plan: string;
    role: UserRole;
}

export class NewUser {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    prefix?: Nullable<string>;
    password: string;
    passwordConf: string;
}

export class UpdateUser {
    id: string;
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    prefix?: Nullable<string>;
    password?: Nullable<string>;
    passwordConf?: Nullable<string>;
    isAdmin?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
}

export class SocialInput {
    twitter?: Nullable<string>;
    github?: Nullable<string>;
    linkedin?: Nullable<string>;
    facebook?: Nullable<string>;
    portfolio?: Nullable<string>;
}

export class LoginUser {
    email: string;
    password: string;
}

export class PlanOfStudy {
    id: string;
    student?: Nullable<User>;
    modules?: Nullable<Nullable<ModuleEnrollment>[]>;
    assignmentResults?: Nullable<AssignmentResult[]>;
    courses?: Nullable<Nullable<CourseEnrollment>[]>;
}

export abstract class IQuery {
    abstract plan(studentID: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;

    abstract plans(): Nullable<PlanOfStudy[]> | Promise<Nullable<PlanOfStudy[]>>;

    abstract planByID(id: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;

    abstract modules(): Module[] | Promise<Module[]>;

    abstract module(id: string): Nullable<Module> | Promise<Nullable<Module>>;

    abstract courses(): Course[] | Promise<Course[]>;

    abstract assignments(): Assignment[] | Promise<Assignment[]>;

    abstract assignment(id: string): Nullable<Assignment> | Promise<Nullable<Assignment>>;

    abstract moduleInCourses(): ModuleInCourse[] | Promise<ModuleInCourse[]>;

    abstract moduleFeedbacks(): ModuleFeedback[] | Promise<ModuleFeedback[]>;

    abstract moduleFeedback(id: string): Nullable<ModuleFeedback> | Promise<Nullable<ModuleFeedback>>;

    abstract assignmentResults(): AssignmentResult[] | Promise<AssignmentResult[]>;

    abstract assignmentResult(id: string): Nullable<AssignmentResult> | Promise<Nullable<AssignmentResult>>;

    abstract moduleEnrollments(): ModuleEnrollment[] | Promise<ModuleEnrollment[]>;

    abstract moduleEnrollment(id: string): Nullable<ModuleEnrollment> | Promise<Nullable<ModuleEnrollment>>;

    abstract courseEnrollments(): CourseEnrollment[] | Promise<CourseEnrollment[]>;

    abstract courseEnrollment(id: string): Nullable<CourseEnrollment> | Promise<Nullable<CourseEnrollment>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract users(): User[] | Promise<User[]>;

    abstract login(input?: Nullable<LoginUser>): Nullable<Token> | Promise<Nullable<Token>>;

    abstract socials(): Social[] | Promise<Social[]>;

    abstract social(id: string): Nullable<Social> | Promise<Nullable<Social>>;
}

export abstract class IMutation {
    abstract addPlan(input?: Nullable<PlanInput>): PlanOfStudy | Promise<PlanOfStudy>;

    abstract updatePlan(id: string, input?: Nullable<PlanInput>): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;

    abstract deletePlan(id: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;

    abstract deleteModule(id: string): Nullable<Module> | Promise<Nullable<Module>>;

    abstract addModule(input?: Nullable<NewModule>): Module | Promise<Module>;

    abstract updateModule(input?: Nullable<UpdateModule>): Nullable<Module> | Promise<Nullable<Module>>;

    abstract deleteCourse(id: string): Nullable<Course> | Promise<Nullable<Course>>;

    abstract addCourse(input?: Nullable<CourseInput>): Course | Promise<Course>;

    abstract updateCourse(id: string, input?: Nullable<CourseInput>): Nullable<Course> | Promise<Nullable<Course>>;

    abstract addAssignment(input?: Nullable<NewAssignment>): Assignment | Promise<Assignment>;

    abstract deleteAssignment(module: string, id: string): Nullable<Module> | Promise<Nullable<Module>>;

    abstract updateAssignment(id: string, input?: Nullable<AssignmentInput>): Nullable<Assignment> | Promise<Nullable<Assignment>>;

    abstract addModuleFeedback(moduleId: string, userId: string, input?: Nullable<ModuleFeedbackInput>): Nullable<Module> | Promise<Nullable<Module>>;

    abstract updateModuleFeedback(id: string, input?: Nullable<ModuleFeedbackUpdate>): Nullable<ModuleFeedback> | Promise<Nullable<ModuleFeedback>>;

    abstract deleteModuleFeedback(id: string): Nullable<ModuleFeedback> | Promise<Nullable<ModuleFeedback>>;

    abstract addAssignmentResult(input?: Nullable<NewAssignmentResult>): AssignmentResult | Promise<AssignmentResult>;

    abstract updateAssignmentResult(id: string, result: number): Nullable<AssignmentResult> | Promise<Nullable<AssignmentResult>>;

    abstract deleteAssignmentResult(id: string): Nullable<AssignmentResult> | Promise<Nullable<AssignmentResult>>;

    abstract addModuleEnrollment(input?: Nullable<ModuleEnrollmentInput>): ModuleEnrollment | Promise<ModuleEnrollment>;

    abstract updateModuleEnrollment(id: string, input?: Nullable<ModuleEnrollmentInput>): Nullable<ModuleEnrollment> | Promise<Nullable<ModuleEnrollment>>;

    abstract deleteModuleEnrollment(id: string): Nullable<ModuleEnrollment> | Promise<Nullable<ModuleEnrollment>>;

    abstract addCourseEnrollment(planId: string, courseId: string): CourseEnrollment | Promise<CourseEnrollment>;

    abstract updateCourseEnrollment(id: string, planId?: Nullable<string>, courseId?: Nullable<string>): Nullable<CourseEnrollment> | Promise<Nullable<CourseEnrollment>>;

    abstract deleteCourseEnrollment(id: string): Nullable<CourseEnrollment> | Promise<Nullable<CourseEnrollment>>;

    abstract pairCourseModule(courseId: string, moduleId: string): ModuleInCourse | Promise<ModuleInCourse>;

    abstract unpairCourseModule(courseId: string, moduleId: string): Nullable<ModuleInCourse> | Promise<Nullable<ModuleInCourse>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract createUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;

    abstract addSocial(user: string, input?: Nullable<SocialInput>): Social | Promise<Social>;

    abstract updateSocial(id: string, input: SocialInput): Nullable<Social> | Promise<Nullable<Social>>;

    abstract updateUserSocial(userId: string, input: SocialInput): Nullable<Social> | Promise<Nullable<Social>>;

    abstract deleteSocial(id: string): Nullable<Social> | Promise<Nullable<Social>>;

    abstract deleteUserSocial(userId: string): Nullable<Social> | Promise<Nullable<Social>>;
}

export class ModuleEnrollment {
    id: string;
    enrolledAt: string;
    role: UserRole;
    module: Module;
    plan: PlanOfStudy;
}

export class AssignmentResult {
    id: string;
    sumbittedAt: string;
    result: number;
    student?: Nullable<PlanOfStudy>;
    gradedBy?: Nullable<User>;
    assignment?: Nullable<Assignment>;
}

export class Assignment {
    id: string;
    updatedAt: string;
    name: string;
    dueAt?: Nullable<string>;
    module?: Nullable<Module>;
    assignmentResults?: Nullable<Nullable<AssignmentResult>[]>;
}

export class ModuleFeedback {
    id: string;
    feedback: string;
    rating: number;
    student?: Nullable<User>;
    module?: Nullable<Module>;
}

export class CourseEnrollment {
    id: string;
    enrolledAt: string;
    student: PlanOfStudy;
    course: Course;
}

export class Course {
    id: string;
    name: string;
    enrollment?: Nullable<Nullable<CourseEnrollment>[]>;
    modules?: Nullable<Nullable<ModuleInCourse>[]>;
}

export class Module {
    id: string;
    moduleNumber: number;
    moduleName: string;
    description: string;
    duration: number;
    intro: string;
    numSlides: number;
    keywords: string[];
    createdAt: string;
    updatedAt: string;
    assignments?: Nullable<Nullable<Assignment>[]>;
    members?: Nullable<Nullable<ModuleEnrollment>[]>;
    feedback?: Nullable<Nullable<ModuleFeedback>[]>;
    parentCourses?: Nullable<Nullable<ModuleInCourse>[]>;
}

export class ModuleInCourse {
    id: string;
    module?: Nullable<Module>;
    course?: Nullable<Course>;
}

export class Error {
    message?: Nullable<string>;
}

export class Social {
    id: string;
    twitter?: Nullable<string>;
    github?: Nullable<string>;
    linkedin?: Nullable<string>;
    facebook?: Nullable<string>;
    portfolio?: Nullable<string>;
    account: User;
}

export class User {
    id: string;
    email?: Nullable<string>;
    createdAt?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    prefix?: Nullable<string>;
    password?: Nullable<string>;
    passwordConf?: Nullable<string>;
    isAdmin?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    social?: Nullable<Social>;
    plan?: Nullable<PlanOfStudy>;
    tokens?: Nullable<string[]>;
    feedback?: Nullable<ModuleFeedback[]>;
    assignmentGraded?: Nullable<AssignmentResult[]>;
}

export class Token {
    id?: Nullable<string>;
    token?: Nullable<string>;
}

type Nullable<T> = T | null;
