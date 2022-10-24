
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

export interface PlanInput {
    student?: Nullable<string>;
}

export interface NewModule {
    moduleNumber: number;
    moduleName: string;
    description: string;
    duration: number;
    intro: string;
    numSlides: number;
    keywords: string[];
}

export interface UpdateModule {
    id: string;
    moduleName?: Nullable<string>;
    moduleNumber?: Nullable<number>;
    intro?: Nullable<string>;
    description?: Nullable<string>;
    duration?: Nullable<number>;
    numSlides?: Nullable<number>;
    keywords?: Nullable<string[]>;
}

export interface NewAssignment {
    name: string;
    dueAt: string;
    module: string;
}

export interface AssignmentInput {
    name?: Nullable<string>;
    dueAt?: Nullable<string>;
    module?: Nullable<string>;
}

export interface CourseInput {
    name: string;
}

export interface ModuleFeedbackInput {
    feedback: string;
    rating: number;
}

export interface ModuleFeedbackUpdate {
    feedback?: Nullable<string>;
    rating?: Nullable<number>;
}

export interface NewAssignmentResult {
    assignment: string;
    student: string;
    grader: string;
    result: number;
}

export interface ModuleEnrollmentInput {
    module: string;
    plan: string;
    role: UserRole;
}

export interface NewUser {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    password: string;
    passwordConf: string;
}

export interface UpdateUser {
    id: string;
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    password: string;
    passwordConf: string;
    dob?: Nullable<Date>;
    isAdmin?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    instructorProfile?: Nullable<InstructorProfileInput>;
}

export interface InstructorProfileInput {
    title?: Nullable<string>;
    officeLocation?: Nullable<string>;
    officeHours?: Nullable<string>;
    contactPolicy?: Nullable<string>;
    phone?: Nullable<string>;
    background?: Nullable<string>;
    researchInterest?: Nullable<string>;
    selectedPapersAndPublications?: Nullable<string>;
    personalWebsite?: Nullable<string>;
    philosophy?: Nullable<string>;
}

export interface SocialInput {
    twitter?: Nullable<string>;
    github?: Nullable<string>;
    linkedin?: Nullable<string>;
    facebook?: Nullable<string>;
    portfolio?: Nullable<string>;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface AuthTokens {
    id_token?: Nullable<string>;
}

export interface IQuery {
    login(code?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
    refresh(token?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
    plan(studentID: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    plans(): Nullable<PlanOfStudy[]> | Promise<Nullable<PlanOfStudy[]>>;
    planByID(id: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    modules(): Module[] | Promise<Module[]>;
    module(id: string): Nullable<Module> | Promise<Nullable<Module>>;
    course(id: string): Nullable<Course> | Promise<Nullable<Course>>;
    courses(): Course[] | Promise<Course[]>;
    assignments(): Assignment[] | Promise<Assignment[]>;
    assignment(id: string): Nullable<Assignment> | Promise<Nullable<Assignment>>;
    moduleInCourses(): ModuleInCourse[] | Promise<ModuleInCourse[]>;
    moduleFeedbacks(): ModuleFeedback[] | Promise<ModuleFeedback[]>;
    moduleFeedback(id: string): Nullable<ModuleFeedback> | Promise<Nullable<ModuleFeedback>>;
    assignmentResults(): AssignmentResult[] | Promise<AssignmentResult[]>;
    assignmentResult(id: string): Nullable<AssignmentResult> | Promise<Nullable<AssignmentResult>>;
    moduleEnrollments(): ModuleEnrollment[] | Promise<ModuleEnrollment[]>;
    moduleEnrollment(id: string): Nullable<ModuleEnrollment> | Promise<Nullable<ModuleEnrollment>>;
    courseEnrollments(): CourseEnrollment[] | Promise<CourseEnrollment[]>;
    courseEnrollment(id: string): Nullable<CourseEnrollment> | Promise<Nullable<CourseEnrollment>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    users(): User[] | Promise<User[]>;
    socials(): Social[] | Promise<Social[]>;
    social(id: string): Nullable<Social> | Promise<Nullable<Social>>;
    instructorProfile(id: string): Nullable<InstructorProfile> | Promise<Nullable<InstructorProfile>>;
}

export interface PlanOfStudy {
    id: string;
    student?: Nullable<User>;
    modules?: Nullable<Nullable<ModuleEnrollment>[]>;
    assignmentResults?: Nullable<AssignmentResult[]>;
}

export interface IMutation {
    addPlan(input?: Nullable<PlanInput>): PlanOfStudy | Promise<PlanOfStudy>;
    updatePlan(id: string, input?: Nullable<PlanInput>): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    deletePlan(id: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    deleteModule(id: string): Nullable<Module> | Promise<Nullable<Module>>;
    addModule(input?: Nullable<NewModule>): Module | Promise<Module>;
    updateModule(input?: Nullable<UpdateModule>): Nullable<Module> | Promise<Nullable<Module>>;
    deleteCourse(id: string): Nullable<Course> | Promise<Nullable<Course>>;
    addCourse(input?: Nullable<CourseInput>): Course | Promise<Course>;
    updateCourse(id: string, input?: Nullable<CourseInput>): Nullable<Course> | Promise<Nullable<Course>>;
    addAssignment(input?: Nullable<NewAssignment>): Assignment | Promise<Assignment>;
    deleteAssignment(module: string, id: string): Nullable<Module> | Promise<Nullable<Module>>;
    updateAssignment(id: string, input?: Nullable<AssignmentInput>): Nullable<Assignment> | Promise<Nullable<Assignment>>;
    addModuleFeedback(moduleId: string, userId: string, input?: Nullable<ModuleFeedbackInput>): Nullable<Module> | Promise<Nullable<Module>>;
    updateModuleFeedback(id: string, input?: Nullable<ModuleFeedbackUpdate>): Nullable<ModuleFeedback> | Promise<Nullable<ModuleFeedback>>;
    deleteModuleFeedback(id: string): Nullable<ModuleFeedback> | Promise<Nullable<ModuleFeedback>>;
    addAssignmentResult(input?: Nullable<NewAssignmentResult>): AssignmentResult | Promise<AssignmentResult>;
    updateAssignmentResult(id: string, result: number): Nullable<AssignmentResult> | Promise<Nullable<AssignmentResult>>;
    deleteAssignmentResult(id: string): Nullable<AssignmentResult> | Promise<Nullable<AssignmentResult>>;
    addModuleEnrollment(input?: Nullable<ModuleEnrollmentInput>): ModuleEnrollment | Promise<ModuleEnrollment>;
    updateModuleEnrollment(id: string, input?: Nullable<ModuleEnrollmentInput>): Nullable<ModuleEnrollment> | Promise<Nullable<ModuleEnrollment>>;
    deleteModuleEnrollment(id: string): Nullable<ModuleEnrollment> | Promise<Nullable<ModuleEnrollment>>;
    addCourseEnrollment(planId: string, courseId: string): CourseEnrollment | Promise<CourseEnrollment>;
    updateCourseEnrollment(id: string, planId?: Nullable<string>, courseId?: Nullable<string>): Nullable<CourseEnrollment> | Promise<Nullable<CourseEnrollment>>;
    deleteCourseEnrollment(id: string): Nullable<CourseEnrollment> | Promise<Nullable<CourseEnrollment>>;
    pairCourseModule(courseId: string, moduleId: string): ModuleInCourse | Promise<ModuleInCourse>;
    unpairCourseModule(courseId: string, moduleId: string): Nullable<ModuleInCourse> | Promise<Nullable<ModuleInCourse>>;
    deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    createUser(input?: Nullable<NewUser>): User | Promise<User>;
    updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;
    addSocial(user: string, input?: Nullable<SocialInput>): Social | Promise<Social>;
    updateSocial(id: string, input: SocialInput): Nullable<Social> | Promise<Nullable<Social>>;
    updateUserSocial(userId: string, input: SocialInput): Nullable<Social> | Promise<Nullable<Social>>;
    deleteSocial(id: string): Nullable<Social> | Promise<Nullable<Social>>;
    deleteUserSocial(userId: string): Nullable<Social> | Promise<Nullable<Social>>;
}

export interface ModuleEnrollment {
    id: string;
    enrolledAt: string;
    role: UserRole;
    module: Module;
    plan: PlanOfStudy;
}

export interface AssignmentResult {
    id: string;
    submittedAt: string;
    result: number;
    feedback?: Nullable<string>;
    student?: Nullable<PlanOfStudy>;
    gradedBy?: Nullable<User>;
    assignment?: Nullable<Assignment>;
}

export interface Assignment {
    id: string;
    updatedAt: string;
    name: string;
    dueAt?: Nullable<string>;
    module: Module;
    assignmentResults?: Nullable<Nullable<AssignmentResult>[]>;
}

export interface ModuleFeedback {
    id: string;
    feedback: string;
    rating: number;
    student?: Nullable<User>;
    module?: Nullable<Module>;
}

export interface CourseEnrollment {
    id: string;
    enrolledAt: string;
    student: PlanOfStudy;
    course: Course;
}

export interface Course {
    id: string;
    name: string;
    enrollment?: Nullable<Nullable<CourseEnrollment>[]>;
    modules?: Nullable<Nullable<ModuleInCourse>[]>;
}

export interface Module {
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
    parentModules?: Nullable<Nullable<Requirement>[]>;
    childModules?: Nullable<Nullable<Requirement>[]>;
}

export interface Requirement {
    id: string;
    child: Module;
    parent: Module;
}

export interface ModuleInCourse {
    id: string;
    module?: Nullable<Module>;
    course?: Nullable<Course>;
}

export interface Error {
    message?: Nullable<string>;
}

export interface Social {
    id: string;
    twitter?: Nullable<string>;
    github?: Nullable<string>;
    linkedin?: Nullable<string>;
    facebook?: Nullable<string>;
    portfolio?: Nullable<string>;
    account: User;
}

export interface InstructorProfile {
    id: string;
    account?: Nullable<User>;
    title?: Nullable<string>;
    officeLocation?: Nullable<string>;
    officeHours?: Nullable<string>;
    contactPolicy?: Nullable<string>;
    phone?: Nullable<string>;
    background?: Nullable<string>;
    researchInterest?: Nullable<string>;
    selectedPapersAndPublications?: Nullable<string>;
    personalWebsite?: Nullable<string>;
    philosophy?: Nullable<string>;
}

export interface User {
    id: string;
    email?: Nullable<string>;
    createdAt?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    password?: Nullable<string>;
    passwordConf?: Nullable<string>;
    isAdmin?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    dob?: Nullable<Date>;
    social?: Nullable<Social>;
    plan?: Nullable<PlanOfStudy>;
    tokens?: Nullable<string[]>;
    feedback?: Nullable<ModuleFeedback[]>;
    assignmentGraded?: Nullable<AssignmentResult[]>;
    instructorProfile?: Nullable<InstructorProfile>;
}

export interface Token {
    id?: Nullable<string>;
    token?: Nullable<string>;
}

type Nullable<T> = T | null;
