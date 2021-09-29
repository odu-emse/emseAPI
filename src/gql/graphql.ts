
/*
 * ------------------------------------------------------
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
    id: string;
    moduleNumber: number;
    moduleName: string;
    description: string;
    duration: number;
    intro: string;
    numSlides: number;
    keywords?: string[];
    createdAt: string;
    updatedAt: string;
    assignments?: string[];
    members: ModuleEnrollment[];
    feedback?: string[];
    parentCourses?: string[];
}

export class UpdateModule {
    id: string;
    instructor?: string;
    moduleName?: string;
    moduleNumber?: number;
    intro?: string;
    description?: string;
    feedback?: number[];
    keywords?: string[];
    assignments?: string[];
    enrolled?: string[];
    updatedAt?: string;
}

export class NewUser {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    prefix?: string;
    password: string;
    passwordConf: string;
}

export class UpdateUser {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    prefix?: string;
    password?: string;
    passwordConf?: string;
}

export class PlanOfStudy {
    id?: string;
    studentID?: string;
}

export abstract class IQuery {
    abstract plan(studentID: string): PlanOfStudy | Promise<PlanOfStudy>;

    abstract plans(): PlanOfStudy[] | Promise<PlanOfStudy[]>;

    abstract planByID(id: string): PlanOfStudy | Promise<PlanOfStudy>;

    abstract modules(): Module[] | Promise<Module[]>;

    abstract module(id: string): Module | Promise<Module>;

    abstract user(id: string): User | Promise<User>;

    abstract users(): User[] | Promise<User[]>;
}

export class Module {
    id: string;
    instructor: string;
    moduleName: string;
    moduleNumber: number;
    intro: string;
    description: string;
    feedback?: number[];
    keywords?: string[];
    assignments?: string[];
    enrolled?: string[];
    createdAt?: string;
    updatedAt?: string;
    numSlides?: number;
    duration?: number;
}

export class Error {
    message?: string;
}

export class ModuleEnrollment {
    id: string;
    enrolledAt: string;
    role: UserRole;
    module: string;
    plan: string;
}

export abstract class IMutation {
    abstract deleteModule(id: string): User | Promise<User>;

    abstract addModule(input?: NewModule): Module | Promise<Module>;

    abstract updateModule(input?: UpdateModule): Module | Promise<Module>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract createUser(input?: NewUser): User | Promise<User>;

    abstract updateUser(input?: UpdateUser): User | Promise<User>;
}

export class User {
    id?: string;
    email?: string;
    createdAt?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    prefix?: string;
    password?: string;
    passwordConf?: string;
    isAdmin?: boolean;
}
