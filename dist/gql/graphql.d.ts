export declare class NewPlan {
    studentID: string;
}
export declare class UpdatePlan {
    id: string;
    studentID: string;
}
export declare class NewUser {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    prefix?: string;
    password: string;
    passwordConf: string;
}
export declare class UpdateUser {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    prefix?: string;
    password?: string;
    passwordConf?: string;
}
export declare class PlanOfStudy {
    id?: string;
    studentID?: string;
}
export declare abstract class IQuery {
    abstract plan(studentID: string): PlanOfStudy | Promise<PlanOfStudy>;
    abstract plans(): PlanOfStudy[] | Promise<PlanOfStudy[]>;
    abstract planByID(id?: string): PlanOfStudy | Promise<PlanOfStudy>;
    abstract user(id: string): User | Promise<User>;
    abstract users(): User[] | Promise<User[]>;
}
export declare class User {
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
export declare class Error {
    message?: string;
}
export declare abstract class IMutation {
    abstract deleteUser(id: string): User | Promise<User>;
    abstract createUser(input?: NewUser): User | Promise<User>;
    abstract updateUser(input?: UpdateUser): User | Promise<User>;
}
