
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

export class NewPlan {
    studentID: string;
}

export class UpdatePlan {
    id: string;
    studentID: string;
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

export class CourseInput {
    name: string;
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
}

export class PlanOfStudy {
    id?: Nullable<string>;
    studentID?: Nullable<string>;
}

export abstract class IQuery {
    abstract plan(studentID: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;

    abstract plans(): Nullable<PlanOfStudy[]> | Promise<Nullable<PlanOfStudy[]>>;

    abstract planByID(id: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;

    abstract modules(): Module[] | Promise<Module[]>;

    abstract module(id: string): Nullable<Module> | Promise<Nullable<Module>>;

    abstract courses(): Course[] | Promise<Course[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract users(): User[] | Promise<User[]>;
}

export class ModuleEnrollment {
    id: string;
    enrolledAt: string;
    role: UserRole;
    module: Module;
    plan: string;
}

export class AssignmentResult {
    id: string;
    sumbittedAt: string;
    result: number;
    student?: Nullable<string>;
    gradedBy?: Nullable<string>;
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
    student?: Nullable<string>;
    module?: Nullable<Module>;
}

export class CourseEnrollment {
    id: string;
    enrolledAt: string;
    student?: Nullable<string>;
    course?: Nullable<Course>;
}

export class Course {
    id: string;
    name: string;
    enrollment?: Nullable<Nullable<CourseEnrollment>[]>;
    modules?: Nullable<Nullable<Module>[]>;
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
    parentCourses?: Nullable<Nullable<Course>[]>;
}

export class Error {
    message?: Nullable<string>;
}

export abstract class IMutation {
    abstract deleteModule(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract addModule(input?: Nullable<NewModule>): Module | Promise<Module>;

    abstract updateModule(input?: Nullable<UpdateModule>): Nullable<Module> | Promise<Nullable<Module>>;

    abstract deleteCourse(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract addCourse(input?: Nullable<CourseInput>): Course | Promise<Course>;

    abstract updateCourse(id: string, input?: Nullable<CourseInput>): Nullable<Course> | Promise<Nullable<Course>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract createUser(input?: Nullable<NewUser>): User | Promise<User>;

    abstract updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id?: Nullable<string>;
    email?: Nullable<string>;
    createdAt?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    prefix?: Nullable<string>;
    password?: Nullable<string>;
    passwordConf?: Nullable<string>;
    isAdmin?: Nullable<boolean>;
}

type Nullable<T> = T | null;
