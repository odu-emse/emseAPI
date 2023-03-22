import { PlanOfStudyResolver } from "@/pos";
import { ProgramResolver } from "@/program";
import {
	CreateAnswer,
	CreateCollectionArgs, CreateQuestion, CreateQuiz, CreateContentArgs,
	EnrollmentStatus, LessonInput,
	UserRole, ContentType
} from "@/types/graphql";
import {QuizResolver} from "@/quiz/quiz.resolver";
import {Answer, Collection, Lesson, Question, Quiz, Content} from "@prisma/client";

export const shuffle = (str: string) =>
	[...str].sort(() => Math.random() - 0.5).join("");

export const pickRandomFromArray = (arr: any[]): number => {
	return Math.floor(Math.random() * arr.length);
};


export const createPlan = async (
	resolver: PlanOfStudyResolver,
	config: { userID: string }
) => {
	const self = await resolver.planByParams({
		id: config.userID
	});
	if (self instanceof Error) {
		const plan = await resolver.addPlan({
			student: config.userID
		});
		if (plan) return plan;
		else return new Error("Failed to create plan");
	} else return self[0];
};

export const createModule = async (
	resolver: ProgramResolver,
	config: {
		moduleName: string;
		moduleNumber: number;
		description: string;
		duration: number;
		intro: string;
		keywords: string[];
		numSlides: number;
	}
) => {
	const module = await resolver.create({ ...config });
	if (module) return module;
	else return new Error("Failed to create module");
};

export const createLesson = async (
	resolver: ProgramResolver,
	config: Lesson
) => {
	const data: LessonInput = {
		name: config.name,
		collection: config.collectionID
	}
	const lesson = await resolver.createLesson({...data});
	if(data) return lesson;
	else return new Error("Failed to create Lesson");
}

export const createEnrollment = async (
	resolver: ProgramResolver,
	config: {
		module: string;
		plan: string;
		status: EnrollmentStatus;
		role: UserRole;
	}
) => {
	const enrollment = await resolver.addModuleEnrollment({ ...config });
	if (enrollment) return enrollment;
	else return new Error("Failed to create enrollment");
};

export const createCollection = async (
	resolver: ProgramResolver,
	input: CreateCollectionArgs
) => {
	const collection = await resolver.createCollection(input);
	if (collection) return collection;
	else return new Error("Failed to create collection");
};

export const createQuiz = async (
	resolver: QuizResolver,
	input: Quiz
) => {
	const data: CreateQuiz = {
		totalPoints: input.totalPoints,
		dueAt: input.dueAt,
		timeLimit: input.timeLimit,
		numQuestions: input.numQuestions,
		minScore: input.minScore,
		parentLesson: input.parentLessonID,
	}
	const quiz = await resolver.createQuiz(data);
	if (quiz) return quiz;
	else return new Error("Failed to create Quiz");
}

export const createQuestion = async (
	resolver: QuizResolver,
	input: Question
) => {
	const data: CreateQuestion = {
		number: input.number,
		variant: input.variant,
		text: input.text,
		points: input.points,
		parentQuiz: input.parentID
	}
	const question = await resolver.createQuestion(data);
	if(question) return question;
	else return new Error("Failed to create question");
}

export const createAnswer = async (
	resolver: QuizResolver,
	input: Answer
) => {
	const data: CreateAnswer = {
		text: input.text,
		correct: input.correct,
		weight: input.weight,
		index: input.index,
		parentQuestion: input.parentQuestionID
	}
	const answer = await resolver.createAnswer(data);
	if (answer) return answer;
	else return new Error("Failed to create answer");
}

export const createContent = async (
	resolver: ProgramResolver,
	input: Content
) => {
	const data: CreateContentArgs = {
		
		type: ContentType.PDF,
		link: input.link,
		parent: input.parentID,
		primary: input.primary,
	}
	const content = await resolver.createContent(data);
	if (content) return content;
	else return new Error("Failed to create content");
}

