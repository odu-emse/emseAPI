
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

export enum ContentType {
    PDF = "PDF",
    DOC = "DOC",
    DOCX = "DOCX",
    VIDEO = "VIDEO",
    CAPTION = "CAPTION",
    TRANSCRIPT = "TRANSCRIPT",
    QUIZ = "QUIZ",
    TEXT = "TEXT"
}

export enum FileType {
    DOCX = "DOCX",
    DOC = "DOC",
    PDF = "PDF",
    TTT = "TTT",
    TXT = "TXT"
}

export interface IThreadCreateInput {
    title?: Nullable<string>;
    body: string;
    topics?: Nullable<Nullable<string>[]>;
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
    topics?: Nullable<Nullable<string>[]>;
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
    section?: Nullable<string>;
    assignmentResult?: Nullable<string>;
    sectionsLeft?: Nullable<string>;
}

export interface CreateContentArgs {
    type: ContentType;
    link: string;
    parent: string;
    primary: boolean;
}

export interface ContentFields {
    id?: Nullable<string>;
    type?: Nullable<ContentType>;
    link?: Nullable<string>;
    parent?: Nullable<string>;
    primary?: Nullable<boolean>;
}

export interface CreateCollectionArgs {
    name: string;
    sectionID: string;
    lessons?: Nullable<string[]>;
    positionIndex: number;
}

export interface CollectionFields {
    id?: Nullable<string>;
    name?: Nullable<string>;
    sectionID?: Nullable<string>;
    lessons?: Nullable<Nullable<string>[]>;
    positionIndex?: Nullable<number>;
}

export interface SectionFields {
    id?: Nullable<string>;
    sectionNumber?: Nullable<number>;
    sectionName?: Nullable<string>;
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
    parentSections?: Nullable<string[]>;
    subSections?: Nullable<string[]>;
}

export interface CourseFields {
    id?: Nullable<string>;
    name?: Nullable<string>;
    section?: Nullable<string>;
    required?: Nullable<boolean>;
    carnegieHours?: Nullable<number>;
}

export interface AssignmentFields {
    id?: Nullable<string>;
    updatedAt?: Nullable<Date>;
    name?: Nullable<string>;
    dueAt?: Nullable<Date>;
    contentURL?: Nullable<string>;
    contentType?: Nullable<string>;
    acceptedTypes?: Nullable<FileType>;
    section?: Nullable<string>;
    assignmentResult?: Nullable<string>;
}

export interface ModFeedbackFields {
    id?: Nullable<string>;
    feedback?: Nullable<string>;
    rating?: Nullable<number>;
    student?: Nullable<string>;
    section?: Nullable<string>;
}

export interface AssignmentResFields {
    id?: Nullable<string>;
    submittedAt?: Nullable<Date>;
    result?: Nullable<number>;
    feedback?: Nullable<string>;
    submissionURL?: Nullable<string>;
    fileType?: Nullable<string>;
    student?: Nullable<string>;
    gradedBy?: Nullable<string>;
    assignment?: Nullable<string>;
}

export interface ModEnrollmentFields {
    id?: Nullable<string>;
    enrolledAt?: Nullable<Date>;
    role?: Nullable<UserRole>;
    section?: Nullable<string>;
    plan?: Nullable<string>;
}

export interface NewSection {
    sectionNumber: number;
    sectionName: string;
    description: string;
    duration: number;
    intro: string;
    numSlides: number;
    keywords: string[];
}

export interface UpdateSection {
    id: string;
    sectionName?: Nullable<string>;
    sectionNumber?: Nullable<number>;
    intro?: Nullable<string>;
    description?: Nullable<string>;
    duration?: Nullable<number>;
    numSlides?: Nullable<number>;
    keywords?: Nullable<string[]>;
    objectives?: Nullable<string[]>;
}

export interface NewAssignment {
    name: string;
    dueAt: Date;
    section: string;
    contentType: string;
    contentURL: string;
    acceptedTypes: FileType;
}

export interface AssignmentInput {
    name?: Nullable<string>;
    dueAt?: Nullable<Date>;
    section?: Nullable<string>;
}

export interface CourseInput {
    name: string;
    section: string;
    required: boolean;
    carnegieHours: number;
}

export interface SectionFeedbackInput {
    feedback: string;
    rating: number;
}

export interface SectionFeedbackUpdate {
    feedback?: Nullable<string>;
    rating?: Nullable<number>;
}

export interface NewAssignmentResult {
    assignment: string;
    student: string;
    grader: string;
    result: number;
    submissionURL: string;
    fileType: string;
}

export interface SectionEnrollmentInput {
    section: string;
    plan: string;
    role: UserRole;
    status: EnrollmentStatus;
}

export interface LessonInput {
    name: string;
    content?: Nullable<string>;
    collection: string;
    position?: Nullable<number>;
    objectives?: Nullable<string[]>;
    hours: number;
}

export interface LessonFields {
    id?: Nullable<string>;
    name?: Nullable<string>;
    content?: Nullable<string>;
    thread?: Nullable<string>;
    collection?: Nullable<string>;
    position?: Nullable<number>;
    objectives?: Nullable<string[]>;
    hours?: Nullable<number>;
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
    sectionID?: Nullable<string>;
    planID?: Nullable<string>;
}

export interface QuizFields {
    id?: Nullable<string>;
    totalPoints?: Nullable<number>;
    instructions?: Nullable<string>;
    dueAt?: Nullable<Date>;
    timeLimit?: Nullable<number>;
    numQuestions?: Nullable<number>;
    minScore?: Nullable<number>;
    parentLesson?: Nullable<string>;
}

export interface QuizInstanceFields {
    id?: Nullable<string>;
    quiz?: Nullable<string>;
}

export interface QuestionFields {
    id?: Nullable<string>;
    number?: Nullable<number>;
    variant?: Nullable<number>;
    text?: Nullable<string>;
    points?: Nullable<number>;
    parent?: Nullable<string>;
}

export interface AnswerFields {
    id?: Nullable<string>;
    text?: Nullable<string>;
    correct?: Nullable<boolean>;
    weight?: Nullable<number>;
    index?: Nullable<string>;
    parentQuestion?: Nullable<string>;
}

export interface QuizResultFields {
    id?: Nullable<string>;
    score?: Nullable<number>;
    student?: Nullable<string>;
    quizInstance?: Nullable<string>;
}

export interface CreateQuiz {
    totalPoints: number;
    instructions?: Nullable<string>;
    dueAt?: Nullable<Date>;
    timeLimit?: Nullable<number>;
    numQuestions: number;
    minScore?: Nullable<number>;
    parentLesson: string;
}

export interface UpdateQuiz {
    totalPoints?: Nullable<number>;
    instructions?: Nullable<string>;
    dueAt?: Nullable<Date>;
    timeLimit?: Nullable<number>;
    numQuestions?: Nullable<number>;
    minScore?: Nullable<number>;
    parentLesson?: Nullable<string>;
}

export interface CreateQuestion {
    number: number;
    variant: number;
    text: string;
    points?: Nullable<number>;
    parentQuiz: string;
}

export interface UpdateQuestion {
    number?: Nullable<number>;
    variant?: Nullable<number>;
    text?: Nullable<string>;
    points?: Nullable<number>;
    parentQuiz?: Nullable<string>;
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

export interface QuizSubmission {
    student: string;
    quizInstance: string;
    answers: string[];
}

export interface NewUser {
    openID: string;
    email: string;
    picURL: string;
    firstName: string;
    lastName: string;
    middleName: string;
    biography?: Nullable<string>;
    phoneNumber?: Nullable<string>;
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
    biography?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    dob?: Nullable<Date>;
    social?: Nullable<string>;
    plan?: Nullable<string>;
    feedback?: Nullable<string>;
    assignmentGraded?: Nullable<string>;
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
    biography?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    dob?: Nullable<Date>;
    isAdmin?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    instructorProfile?: Nullable<string>;
}

export interface InstructorProfileInput {
    title?: Nullable<string>;
    officeLocation?: Nullable<string>;
    officeHours?: Nullable<Nullable<string>[]>;
    contactPolicy?: Nullable<string>;
    background?: Nullable<string>;
    researchInterest?: Nullable<Nullable<string>[]>;
    selectedPapersAndPublications?: Nullable<Nullable<string>[]>;
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
    upvoteThread(id: string, userID: string): Nullable<Thread> | Promise<Nullable<Thread>>;
    downvoteThread(id: string, userID: string): Nullable<Thread> | Promise<Nullable<Thread>>;
    updateThread(id: string, data: IThreadCreateInput): Nullable<Thread> | Promise<Nullable<Thread>>;
    deleteThread(id: string): Nullable<Thread> | Promise<Nullable<Thread>>;
    addUserAsWatcherToThread(id: string, userID: string): Nullable<Thread> | Promise<Nullable<Thread>>;
    createDirectMessage(receiverID: string, message: string, senderID: string): boolean | Promise<boolean>;
    newGroupMessage(groupID: string, message: string, senderID: string): boolean | Promise<boolean>;
    addPlan(input?: Nullable<PlanInput>): PlanOfStudy | Promise<PlanOfStudy>;
    updatePlan(id: string, input?: Nullable<PlanInput>): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    deletePlan(id: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    deleteSection(id: string): Nullable<Section> | Promise<Nullable<Section>>;
    addSection(input?: Nullable<NewSection>): Section | Promise<Section>;
    updateSection(input?: Nullable<UpdateSection>): Nullable<Section> | Promise<Nullable<Section>>;
    deleteCourse(id: string): Nullable<Course> | Promise<Nullable<Course>>;
    addCourse(input?: Nullable<CourseInput>): Course | Promise<Course>;
    updateCourse(id: string, input?: Nullable<CourseInput>): Nullable<Course> | Promise<Nullable<Course>>;
    addAssignment(input?: Nullable<NewAssignment>): Assignment | Promise<Assignment>;
    addObjectives(id: string, input?: Nullable<string[]>): Nullable<Section> | Promise<Nullable<Section>>;
    deleteAssignment(section: string, id: string): Nullable<Section> | Promise<Nullable<Section>>;
    updateAssignment(id: string, input?: Nullable<AssignmentInput>): Nullable<Assignment> | Promise<Nullable<Assignment>>;
    addSectionFeedback(sectionId: string, userId: string, input?: Nullable<SectionFeedbackInput>): Nullable<Section> | Promise<Nullable<Section>>;
    updateSectionFeedback(id: string, input?: Nullable<SectionFeedbackUpdate>): Nullable<SectionFeedback> | Promise<Nullable<SectionFeedback>>;
    deleteSectionFeedback(id: string): Nullable<SectionFeedback> | Promise<Nullable<SectionFeedback>>;
    addAssignmentResult(input?: Nullable<NewAssignmentResult>): AssignmentResult | Promise<AssignmentResult>;
    updateAssignmentResult(id: string, result: number): Nullable<AssignmentResult> | Promise<Nullable<AssignmentResult>>;
    deleteAssignmentResult(id: string): Nullable<AssignmentResult> | Promise<Nullable<AssignmentResult>>;
    addSectionEnrollment(input?: Nullable<SectionEnrollmentInput>): SectionEnrollment | Promise<SectionEnrollment>;
    updateSectionEnrollment(id: string, input?: Nullable<SectionEnrollmentInput>): Nullable<SectionEnrollment> | Promise<Nullable<SectionEnrollment>>;
    deleteSectionEnrollment(id: string): Nullable<SectionEnrollment> | Promise<Nullable<SectionEnrollment>>;
    pairCourseSection(courseId: string, sectionId: string): Section | Promise<Section>;
    unpairCourseSection(courseId: string, sectionId: string): Nullable<Section> | Promise<Nullable<Section>>;
    createCollection(data: CreateCollectionArgs): Collection | Promise<Collection>;
    updateCollection(id: string, data: CollectionFields): Collection | Promise<Collection>;
    createLesson(input: LessonInput): Lesson | Promise<Lesson>;
    updateLesson(input?: Nullable<LessonFields>, replaceObj?: Nullable<boolean>): Nullable<Lesson> | Promise<Nullable<Lesson>>;
    deleteLesson(id: string): Nullable<Lesson> | Promise<Nullable<Lesson>>;
    createContent(input: CreateContentArgs): Content | Promise<Content>;
    updateContent(input: ContentFields): Nullable<Content[]> | Promise<Nullable<Content[]>>;
    deleteContent(contentID: string): Nullable<Content> | Promise<Nullable<Content>>;
    createProgress(input: ProgressArgs, enrollmentID: string): Progress | Promise<Progress>;
    waiveSection(args: ProgressWaiveArgs): Progress | Promise<Progress>;
    deleteProgress(id: string): boolean | Promise<boolean>;
    updateProgress(status: number, id?: Nullable<string>, enrollmentID?: Nullable<string>): Progress | Promise<Progress>;
    createQuiz(input?: Nullable<CreateQuiz>): Quiz | Promise<Quiz>;
    updateQuiz(id: string, values: UpdateQuiz): Quiz[] | Promise<Quiz[]>;
    deleteQuiz(id: string): Quiz | Promise<Quiz>;
    createQuizInstance(quizID: string): QuizInstance | Promise<QuizInstance>;
    deleteQuizInstance(id: string): QuizInstance | Promise<QuizInstance>;
    createQuestion(input?: Nullable<CreateQuestion>): Question | Promise<Question>;
    updateQuestion(id: string, values: UpdateQuestion): Question[] | Promise<Question[]>;
    deleteQuestion(id: string): Question | Promise<Question>;
    createAnswer(input: CreateAnswer): Answer | Promise<Answer>;
    updateAnswer(id: string, values: UpdateAnswer): Answer[] | Promise<Answer[]>;
    deleteAnswer(id: string): Answer | Promise<Answer>;
    submitQuiz(input: QuizSubmission): Nullable<QuizResult> | Promise<Nullable<QuizResult>>;
    updateQuizScore(id: string, newScore: number): Nullable<QuizResult> | Promise<Nullable<QuizResult>>;
    deleteQuizResult(id: string): Nullable<QuizResult> | Promise<Nullable<QuizResult>>;
    deleteUser(openId: string): Nullable<User> | Promise<Nullable<User>>;
    createUser(input?: Nullable<NewUser>): User | Promise<User>;
    updateUser(input?: Nullable<UpdateUser>): Nullable<User> | Promise<Nullable<User>>;
    updateInstructorProfile(id: string, input: InstructorProfileInput): Nullable<InstructorProfile> | Promise<Nullable<InstructorProfile>>;
    addSocial(user: string, input?: Nullable<SocialInput>): Social | Promise<Social>;
    updateSocial(id: string, input: SocialInput): Nullable<Social> | Promise<Nullable<Social>>;
    updateUserSocial(userId: string, input: SocialInput): Nullable<Social> | Promise<Nullable<Social>>;
    deleteSocial(id: string): Nullable<Social> | Promise<Nullable<Social>>;
    deleteUserSocial(userId: string): Nullable<Social> | Promise<Nullable<Social>>;
}

export interface IQuery {
    refresh(token?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
    thread(input?: Nullable<IThreadByParams>): Thread[] | Promise<Thread[]>;
    directMessages(receiverID: string): DirectMessageResponse[] | Promise<DirectMessageResponse[]>;
    groups(userID: string): Group[] | Promise<Group[]>;
    groupMessages(groupID: string): DirectMessageResponse[] | Promise<DirectMessageResponse[]>;
    plan(studentID: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    plans(): Nullable<PlanOfStudy[]> | Promise<Nullable<PlanOfStudy[]>>;
    planByID(id: string): Nullable<PlanOfStudy> | Promise<Nullable<PlanOfStudy>>;
    planByParams(input?: Nullable<PlanFields>): Nullable<PlanOfStudy[]> | Promise<Nullable<PlanOfStudy[]>>;
    section(input: SectionFields, memberRole?: Nullable<UserRole>): Nullable<Section[]> | Promise<Nullable<Section[]>>;
    course(input: CourseFields): Nullable<Course[]> | Promise<Nullable<Course[]>>;
    assignment(input: AssignmentFields): Nullable<Assignment[]> | Promise<Nullable<Assignment[]>>;
    sectionFeedback(input: ModFeedbackFields): Nullable<SectionFeedback[]> | Promise<Nullable<SectionFeedback[]>>;
    assignmentResult(input: AssignmentResFields): Nullable<AssignmentResult[]> | Promise<Nullable<AssignmentResult[]>>;
    sectionEnrollment(input: ModEnrollmentFields): Nullable<SectionEnrollment[]> | Promise<Nullable<SectionEnrollment[]>>;
    lessonsBySectionEnrollment(planID: string, SectionID: string): Nullable<Lesson[]> | Promise<Nullable<Lesson[]>>;
    collection(input?: Nullable<CollectionFields>): Nullable<Nullable<Collection>[]> | Promise<Nullable<Nullable<Collection>[]>>;
    lesson(input?: Nullable<LessonFields>): Nullable<Lesson[]> | Promise<Nullable<Lesson[]>>;
    content(input?: Nullable<ContentFields>): Nullable<Content[]> | Promise<Nullable<Content[]>>;
    progress(args: ProgressArgs): Nullable<Progress>[] | Promise<Nullable<Progress>[]>;
    quiz(args: QuizFields): Quiz[] | Promise<Quiz[]>;
    quizInstance(args: QuizInstanceFields): QuizInstance[] | Promise<QuizInstance[]>;
    question(args: QuestionFields): Question[] | Promise<Question[]>;
    answer(args: AnswerFields): Answer[] | Promise<Answer[]>;
    quizResult(args: QuizResultFields): QuizResult[] | Promise<QuizResult[]>;
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
    topics?: Nullable<Nullable<string>[]>;
    upvotes?: Nullable<User[]>;
    usersWatching?: Nullable<User[]>;
    createdAt: Date;
    updatedAt: Date;
    parentThread?: Nullable<Thread>;
    parentThreadID?: Nullable<string>;
}

export interface ISubscription {
    newDirectMessage(receiverID?: Nullable<string>): DirectMessageResponse | Promise<DirectMessageResponse>;
    newGroupMessage(groupID?: Nullable<string>): DirectMessageResponse | Promise<DirectMessageResponse>;
}

export interface CreateMessageInput {
    authorID: string;
    recipientID: string;
    message: string;
}

export interface DirectMessageResponse {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    authorID: string;
    recipientID: string;
    author: User;
    recipient: Members;
}

export interface Group {
    id: string;
    name: string;
    members: User[];
    public: boolean;
    messages: DirectMessageResponse[];
}

export interface PlanOfStudy {
    id: string;
    student?: Nullable<User>;
    sections?: Nullable<Nullable<SectionEnrollment>[]>;
    assignmentResults?: Nullable<AssignmentResult[]>;
    sectionsLeft?: Nullable<Nullable<SectionEnrollment>[]>;
    quizResults?: Nullable<QuizResult[]>;
}

export interface SectionEnrollment {
    id: string;
    enrolledAt: Date;
    role: UserRole;
    status: EnrollmentStatus;
    section: Section;
    plan?: Nullable<PlanOfStudy>;
    inactivePlan?: Nullable<PlanOfStudy>;
    progress: Progress;
    lessonProgress?: Nullable<Nullable<LessonProgress>[]>;
}

export interface AssignmentResult {
    id: string;
    submittedAt: Date;
    result: number;
    feedback?: Nullable<string>;
    submissionURL?: Nullable<string>;
    fileType?: Nullable<string>;
    student?: Nullable<PlanOfStudy>;
    gradedBy?: Nullable<User>;
    assignment?: Nullable<Assignment>;
}

export interface Assignment {
    id: string;
    updatedAt: Date;
    name: string;
    dueAt?: Nullable<Date>;
    contentURL?: Nullable<string>;
    contentType?: Nullable<string>;
    acceptedTypes?: Nullable<FileType>;
    section: Section;
    assignmentResults?: Nullable<Nullable<AssignmentResult>[]>;
}

export interface SectionFeedback {
    id: string;
    feedback: string;
    rating: number;
    student?: Nullable<User>;
    section?: Nullable<Section>;
}

export interface Course {
    id: string;
    name: string;
    sectionIDs?: Nullable<Nullable<string>[]>;
    required: boolean;
    carnegieHours: number;
}

export interface Section {
    id: string;
    sectionNumber: number;
    sectionName: string;
    description: string;
    duration: number;
    intro: string;
    numSlides: number;
    keywords: string[];
    objectives: string[];
    createdAt: Date;
    updatedAt: Date;
    assignments: Assignment[];
    members: SectionEnrollment[];
    feedback: SectionFeedback[];
    parentSections: Section[];
    subSections: Section[];
    collections: Collection[];
    courseIDs: string[];
}

export interface Collection {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    lessons?: Nullable<Nullable<Lesson>[]>;
    section: Section;
    sectionID: string;
    position?: Nullable<number>;
}

export interface Lesson {
    id: string;
    name: string;
    content?: Nullable<Nullable<Content>[]>;
    threads?: Nullable<Nullable<Thread>[]>;
    collection?: Nullable<Collection>;
    position?: Nullable<number>;
    quizzes?: Nullable<Quiz[]>;
    lessonProgress?: Nullable<Nullable<LessonProgress>[]>;
    objectives: string[];
    hours: number;
}

export interface Content {
    id: string;
    type: ContentType;
    link: string;
    parent: Lesson;
    primary: boolean;
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
    enrollment: SectionEnrollment;
}

export interface LessonProgress {
    id: string;
    status: number;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    enrollment: SectionEnrollment;
    lesson: Lesson;
}

export interface Quiz {
    id: string;
    totalPoints: number;
    instructions?: Nullable<string>;
    dueAt?: Nullable<Date>;
    timeLimit?: Nullable<number>;
    numQuestions: number;
    minScore: number;
    parentLesson: Lesson;
    questionPool: Question[];
    instances: QuizInstance[];
}

export interface QuizInstance {
    id: string;
    quiz: Quiz;
    questions: Question[];
    quizResult: QuizResult;
}

export interface Question {
    id: string;
    number: number;
    variant?: Nullable<number>;
    text: string;
    points: number;
    answers: Answer[];
    parent: Quiz;
    instances: QuizInstance[];
}

export interface Answer {
    id: string;
    text: string;
    correct: boolean;
    weight?: Nullable<number>;
    index?: Nullable<string>;
    parentQuestion: Question;
}

export interface QuizResult {
    id: string;
    score: number;
    answers: string[];
    submittedAt?: Nullable<Date>;
    student: PlanOfStudy;
    quizInstance: QuizInstance;
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
    officeHours?: Nullable<Nullable<string>[]>;
    contactPolicy?: Nullable<string>;
    background?: Nullable<string>;
    researchInterest?: Nullable<Nullable<string>[]>;
    selectedPapersAndPublications?: Nullable<Nullable<string>[]>;
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
    biography?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    dob?: Nullable<Date>;
    social?: Nullable<Social>;
    plan?: Nullable<PlanOfStudy>;
    tokens?: Nullable<string[]>;
    feedback?: Nullable<SectionFeedback[]>;
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

export type Members = User | Group;
type Nullable<T> = T | null;
