
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewPlan {
    studentID: string;
}

export class UpdatePlan {
    id: string;
    studentID: string;
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
    //abstract plan(studen)
    abstract plans(): PlanOfStudy[] | Promise<PlanOfStudy[]>;

    abstract user(id: string): User | Promise<User>;

    abstract users(): User[] | Promise<User[]>;
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

export class Error {
    message?: string;
}

export abstract class IMutation {
    abstract deleteUser(id: string): User | Promise<User>;

    abstract createUser(input?: NewUser): User | Promise<User>;

    abstract updateUser(input?: UpdateUser): User | Promise<User>;
}
