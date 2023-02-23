
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

export enum EnrollmentStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export interface IThreadCreateInput {
    title?: Nullable<string>;
    body: string;
    parentLesson?: Nullable<string>;
    parentThread?: Nullable<string>;
    author: string;
}

export interface ICommentCreateInput {
    id?: Nullable<string>;
    body: string;
    author: string;
}

export interface IThreadByParams {
    id?: Nullable<string>;
    title?: Nullable<string>;
    body?: Nullable<string>;
    parentLesson?: Nullable<string>;
    parentThread?: Nullable<string>;
    comments?: Nullable<string>;
    author?: Nullable<string>;
}

export interface PlanInput {
    student?: Nullable<string>;
}

export interface PlanFields {
    id?: Nullable<string>;
    student?: Nullable<string>;
    module?: Nullable<string>;
    assignmentResult?: Nullable<string>;
    modulesLeft?: Nullable<string>;
}

export interface CreateContentArgs {
    type: string;
    link: string;
    parent: string;
}

export interface ContentFields {
    id?: Nullable<string>;
    type?: Nullable<string>;
    link?: Nullable<string>;
    parent?: Nullable<string>;
}

export interface CreateCollectionArgs {
    name: string;
    moduleID: string;
    lessons?: Nullable<string[]>;
    positionIndex: number;
}

export interface CollectionFields {
    id?: Nullable<string>;
    name?: Nullable<string>;
    moduleID?: Nullable<string>;
    lessons?: Nullable<Nullable<string>[]>;
    positionIndex?: Nullable<number>;
}

export interface ModuleFields {
    id?: Nullable<string>;
    moduleNumber?: Nullable<number>;
    moduleName?: Nullable<string>;
    description?: Nullable<string>;
    duration?: Nullable<number>;
    intro?: Nullable<string>;
    numSlides?: Nullable<number>;
    keywords?: Nullable<string[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    objectives?: Nullable<string[]>;
    assignments?: Nullable<string>;
    members?: Nullable<string[]>;
    feedback?: Nullable<string>;
    parentModules?: Nullable<string[]>;
    subModules?: Nullable<string[]>;
}

export interface CourseFields {
    id?: Nullable<string>;
    name?: Nullable<string>;
    module?: Nullable<string>;
}

export interface AssignmentFields {
    id?: Nullable<string>;
    updatedAt?: Nullable<Date>;
    name?: Nullable<string>;
    dueAt?: Nullable<Date>;
    module?: Nullable<string>;
    assignmentResult?: Nullable<string>;
}

export interface ModFeedbackFields {
    id?: Nullable<string>;
    feedback?: Nullable<string>;
    rating?: Nullable<number>;
    student?: Nullable<string>;
    module?: Nullable<string>;
}

export interface AssignmentResFields {
    id?: Nullable<string>;
    submittedAt?: Nullable<Date>;
    result?: Nullable<number>;
    feedback?: Nullable<string>;
    student?: Nullable<string>;
    gradedBy?: Nullable<string>;
    assignment?: Nullable<string>;
}

export interface ModEnrollmentFields {
    id?: Nullable<string>;
    enrolledAt?: Nullable<Date>;
    role?: Nullable<UserRole>;
    module?: Nullable<string>;
    plan?: Nullable<string>;
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
    dueAt: Date;
    module: string;
}

export interface AssignmentInput {
    name?: Nullable<string>;
    dueAt?: Nullable<Date>;
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
    status: EnrollmentStatus;
}

export interface LessonInput {
    name: string;
    content?: Nullable<string>;
    transcript?: Nullable<string>;
    collection: string;
    position?: Nullable<number>;
}

export interface LessonFields {
    id?: Nullable<string>;
    name?: Nullable<string>;
    content?: Nullable<string>;
    transcript?: Nullable<string>;
    thread?: Nullable<string>;
    collection?: Nullable<string>;
    position?: Nullable<number>;
}

export interface ProgressArgs {
    id?: Nullable<string>;
    completed?: Nullable<boolean>;
    status?: Nullable<number>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    enrollmentID?: Nullable<string>;
}

export interface ProgressWaiveArgs {
    enrollmentID?: Nullable<string>;
    moduleID?: Nullable<string>;
    planID?: Nullable<string>;
}

export interface QuizFields {
    id?: Nullable<string>;
    totalPoints?: Nullable<number>;
    dueAt?: Nullable<Date>;
    timeLimit?: Nullable<number>;
    numQuestions?: Nullable<number>;
    minScore?: Nullable<number>;
    parentLesson?: Nullable<string>;
    questionPool?: Nullable<string>;
}

export interface QuestionPoolFields {
    id?: Nullable<string>;
    questions?: Nullable<string[]>;
    quizzes?: Nullable<string[]>;
}

export interface QuestionFields {
    id?: Nullable<string>;
    number?: Nullable<number>;
    text?: Nullable<string>;
    points?: Nullable<number>;
    parentPool?: Nullable<string>;
    answers?: Nullable<string[]>;
}

export interface AnswerFields {
    id?: Nullable<string>;
    text?: Nullable<string>;
    correct?: Nullable<boolean>;
    weight?: Nullable<number>;
    index?: Nullable<string>;
    parentQuestion?: Nullable<string>;
}

export interface CreateQuiz {
    totalPoints: number;
    dueAt?: Nullable<Date>;
    timeLimit?: Nullable<number>;
    numQuestions: number;
    minScore?: Nullable<number>;
    parentLesson: string;
    questionPool: string;
}

export interface UpdateQuiz {
    totalPoints?: Nullable<number>;
    dueAt?: Nullable<Date>;
    timeLimit?: Nullable<number>;
    numQuestions?: Nullable<number>;
    minScore?: Nullable<number>;
    parentLesson?: Nullable<string>;
    questionPool?: Nullable<string>;
}

export interface CreateQuestion {
    number: number;
    text: string;
    points?: Nullable<number>;
    parentPool: string;
}

export interface UpdateQuestion {
    number?: Nullable<number>;
    text?: Nullable<string>;
    points?: Nullable<number>;
    parentPool?: Nullable<string>;
}

export interface CreateAnswer {
    text: string;
    correct: boolean;
    weight?: Nullable<number>;
    index?: Nullable<string>;
    parentQuestion: string;
}

export interface UpdateAnswer {
    text?: Nullable<string>;
    correct?: Nullable<boolean>;
    weight?: Nullable<number>;
    index?: Nullable<string>;
    parentQuestion?: Nullable<string>;
}

export interface NewUser {
    openID: string;
    email: string;
    picURL: string;
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface UserFields {
    id?: Nullable<string>;
    openID?: Nullable<string>;
    email?: Nullable<string>;
    picURL?: Nullable<string>;
    createdAt?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    isAdmin?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    dob?: Nullable<Date>;
    social?: Nullable<string>;
    plan?: Nullable<string>;
    feedback?: Nullable<string>;
    assignmentGraded?: Nullable<string>;
    instructorProfile?: Nullable<string>;
}

export interface SocialFields {
    id?: Nullable<string>;
    twitter?: Nullable<string>;
    github?: Nullable<string>;
    linkedin?: Nullable<string>;
    facebook?: Nullable<string>;
    portfolio?: Nullable<string>;
    account?: Nullable<string>;
}

export interface UpdateUser {
    id: string;
    openID: string;
    email?: Nullable<string>;
    picURL?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
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

export interface AuthTokens {
    id_token?: Nullable<string>;
    refresh_token?: Nullable<string>;
}

export interface IMutation {
    login(code?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
    createThread(data: IThreadCreateInput): Nullable<Thread> | Promise<Nullable<Thread>>;
    addCommentToThread(parentThreadID: string, data: ICommentCreateInput): Nullable<Thread> | Promise<Nullable<Thread>>;
    upvoteThread(id: string): Nullable<Thread> | Promise<Nullable<Thread>>;
    updateThread(id: string, data: IThreadCreateInput): Nullable<Thread> | Promise<Nullable<Thread>>;
    deleteThread(id: string): Nullable<Thread> | Promise<Nullable<Thread>>;
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
    pairCourseModule(courseId: string, moduleId: string): Module | Promise<Module>;
    unpairCourseModule(courseId: string, moduleId: string): Nullable<Module> | Promise<Nullable<Module>>;
    createCollection(data: CreateCollectionArgs): Collection | Promise<Collection>;
    updateCollection(id: string, data: CollectionFields): Collection | Promise<Collection>;
    createLesson(input: LessonInput): Lesson | Promise<Lesson>;
    updateLesson(input?: Nullable<LessonFields>): Nullable<Lesson> | Promise<Nullable<Lesson>>;
    deleteLesson(id: string): Nullable<Lesson> | Promise<Nullable<Lesson>>;
    createContent(input: CreateContentArgs): Content | Promise<Content>;
    updateContent(input: ContentFields): Nullable<Content> | Promise<Nullable<Content>>;
    deleteContent(contentID: string): Nullable<Content> | Promise<Nullable<Content>>;
    createProgress(input: ProgressArgs, enrollmentID: string): Progress | Promise<Progress>;
    waiveModule(args: ProgressWaiveArgs): Progress | Promise<Progress>;
    deleteProgress(id: string): boolean | Promise<boolean>;
    updateProgress(status: number, id?: Nullable<string>, enrollmentID?: Nullable<string>): Progress | Promise<Progress>;
    createQuiz(input?: Nullable<CreateQuiz>): Quiz | Promise<Quiz>;
    updateQuiz(id: string, values: UpdateQuiz): Quiz[] | Promise<Quiz[]>;
    deleteQuiz(id: string): Quiz | Promise<Quiz>;
    createQuestionPool(): QuestionPool | Promise<QuestionPool>;
    deleteQuestionPool(id: string): QuestionPool | Promise<QuestionPool>;
    createQuestion(input?: Nullable<CreateQuestion>): Question[] | Promise<Question[]>;
    updateQuestion(id: string, values: UpdateQuestion): Question[] | Promise<Question[]>;
    deleteQuestion(id: string): Question | Promise<Question>;
    createAnswer(input: CreateAnswer): Answer | Promise<Answer>;
    updateAnswer(id: string, values: UpdateAnswer): Answer[] | Promise<Answer[]>;
    deleteAnswer(id: string): Answer | Promise<Answer>;
    deleteUser(openId: string): Nullable<User> | Promise<Nullable<User>>;
    createUser(input?: Nullable<NewUser>): User | Promise<User>;
    updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;
    addSocial(user: string, input?: Nullable<SocialInput>): Social | Promise<Social>;
    updateSocial(id: string, input: SocialInput): Nullable<Social> | Promise<Nullable<Social>>;
    updateUserSocial(userId: string, input: SocialInput): Nullable<Social> | Promise<Nullable<Social>>;
    deleteSocial(id: string): Nullable<Social> | Promise<Nullable<Social>>;
    deleteUserSocial(userId: string): Nullable<Social> | Promise<Nullable<Social>>;
}

export interface IQuery {
    refresh(token?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
    thread(input?: Nullable<IThreadByParams>): Thread[] | Promise<Thread[]>;
    plan(studentID: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    plans(): Nullable<PlanOfStudy[]> | Promise<Nullable<PlanOfStudy[]>>;
    planByID(id: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    planByParams(input?: Nullable<PlanFields>): Nullable<PlanOfStudy[]> | Promise<Nullable<PlanOfStudy[]>>;
    module(input: ModuleFields, memberRole?: Nullable<UserRole>): Nullable<Module[]> | Promise<Nullable<Module[]>>;
    course(input: CourseFields): Nullable<Course[]> | Promise<Nullable<Course[]>>;
    assignment(input: AssignmentFields): Nullable<Assignment[]> | Promise<Nullable<Assignment[]>>;
    moduleFeedback(input: ModFeedbackFields): Nullable<ModuleFeedback[]> | Promise<Nullable<ModuleFeedback[]>>;
    assignmentResult(input: AssignmentResFields): Nullable<AssignmentResult[]> | Promise<Nullable<AssignmentResult[]>>;
    moduleEnrollment(input: ModEnrollmentFields): Nullable<ModuleEnrollment[]> | Promise<Nullable<ModuleEnrollment[]>>;
    collection(input?: Nullable<CollectionFields>): Nullable<Nullable<Collection>[]> | Promise<Nullable<Nullable<Collection>[]>>;
    lesson(input?: Nullable<LessonFields>): Nullable<Lesson[]> | Promise<Nullable<Lesson[]>>;
    content(input?: Nullable<ContentFields>): Nullable<Content[]> | Promise<Nullable<Content[]>>;
    progress(args: ProgressArgs): Nullable<Progress>[] | Promise<Nullable<Progress>[]>;
    quiz(args: QuizFields): Quiz[] | Promise<Quiz[]>;
    questionPool(args: QuestionPoolFields): QuestionPool[] | Promise<QuestionPool[]>;
    question(args: QuestionFields): Question[] | Promise<Question[]>;
    answer(args: AnswerFields): Answer[] | Promise<Answer[]>;
    user(input?: Nullable<UserFields>): User[] | Promise<User[]>;
    socials(): Social[] | Promise<Social[]>;
    social(id: string): Nullable<Social> | Promise<Nullable<Social>>;
    socialsByParam(input?: Nullable<SocialFields>): Nullable<Social[]> | Promise<Nullable<Social[]>>;
    instructorProfile(id: string): Nullable<InstructorProfile> | Promise<Nullable<InstructorProfile>>;
}

export interface Thread {
    id: string;
    title?: Nullable<string>;
    author: User;
    body: string;
    comments?: Nullable<Nullable<Thread>[]>;
    upvotes?: Nullable<User[]>;
    usersWatching?: Nullable<User[]>;
    parentLesson?: Nullable<Lesson>;
    createdAt: Date;
    updatedAt: Date;
    parentThread?: Nullable<Thread>;
    parentThreadID?: Nullable<string>;
}

export interface PlanOfStudy {
    id: string;
    student?: Nullable<User>;
    modules?: Nullable<Nullable<ModuleEnrollment>[]>;
    assignmentResults?: Nullable<AssignmentResult[]>;
    modulesLeft?: Nullable<Nullable<ModuleEnrollment>[]>;
}

export interface ModuleEnrollment {
    id: string;
    enrolledAt: Date;
    role: UserRole;
    status: EnrollmentStatus;
    module: Module;
    plan?: Nullable<PlanOfStudy>;
    inactivePlan?: Nullable<PlanOfStudy>;
    progress: Progress;
}

export interface AssignmentResult {
    id: string;
    submittedAt: Date;
    result: number;
    feedback?: Nullable<string>;
    student?: Nullable<PlanOfStudy>;
    gradedBy?: Nullable<User>;
    assignment?: Nullable<Assignment>;
}

export interface Assignment {
    id: string;
    updatedAt: Date;
    name: string;
    dueAt?: Nullable<Date>;
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

export interface Course {
    id: string;
    name: string;
    moduleIDs?: Nullable<Nullable<string>[]>;
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
    objectives: string[];
    createdAt: Date;
    updatedAt: Date;
    assignments: Assignment[];
    members: ModuleEnrollment[];
    feedback: ModuleFeedback[];
    parentModules: Module[];
    subModules: Module[];
    collections: Collection[];
    courseIDs: string[];
}

export interface Collection {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    lessons?: Nullable<Nullable<Lesson>[]>;
    module: Module;
    moduleID: string;
    position?: Nullable<number>;
}

export interface Lesson {
    id: string;
    name: string;
    content?: Nullable<Nullable<Content>[]>;
    transcript?: Nullable<string>;
    threads?: Nullable<Nullable<Thread>[]>;
    collection?: Nullable<Collection>;
    position?: Nullable<number>;
    quizzes?: Nullable<Quiz[]>;
}

export interface Content {
    id: string;
    type: string;
    link: string;
    parent: Lesson;
}

export interface Error {
    message?: Nullable<string>;
}

export interface Progress {
    id: string;
    status: number;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    enrollment: ModuleEnrollment;
}

export interface Quiz {
    id: string;
    totalPoints: number;
    dueAt?: Nullable<Date>;
    timeLimit?: Nullable<number>;
    numQuestions: number;
    minScore: number;
    parentLesson: Lesson;
    questionPool: QuestionPool;
}

export interface QuestionPool {
    id: string;
    questions: Question[];
    quizzes: Quiz[];
}

export interface Question {
    id: string;
    number: number;
    text: string;
    points: number;
    parentPool: QuestionPool;
    answers: Answer[];
}

export interface Answer {
    id: string;
    text: string;
    correct: boolean;
    weight?: Nullable<number>;
    index?: Nullable<string>;
    parentQuestion: Question;
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
    openID: string;
    email: string;
    picURL?: Nullable<string>;
    createdAt?: Nullable<Date>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    isAdmin?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    dob?: Nullable<Date>;
    social?: Nullable<Social>;
    plan?: Nullable<PlanOfStudy>;
    tokens?: Nullable<string[]>;
    feedback?: Nullable<ModuleFeedback[]>;
    assignmentGraded?: Nullable<AssignmentResult[]>;
    instructorProfile?: Nullable<InstructorProfile>;
    watchedThreads?: Nullable<Thread[]>;
    watchedThreadIDs?: Nullable<string[]>;
    createdThreads?: Nullable<Thread[]>;
}

export interface Token {
    id?: Nullable<string>;
    token?: Nullable<string>;
}

type Nullable<T> = T | null;
