import { PlanOfStudyResolver } from "@/pos";
import { ProgramResolver } from "@/program";
import {
	CreateAnswer,
	CreateCollectionArgs,
	CreateQuestion,
	CreateQuiz,
	EnrollmentStatus,
	ModuleInput,
	UserRole
} from "@/types/graphql";
import { QuizResolver } from "@/quiz/quiz.resolver";
import { Answer, Module, Question, Quiz } from "@prisma/client";

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

export const createSection = async (
	resolver: ProgramResolver,
	config: {
		sectionName: string;
		sectionNumber: number;
		description: string;
		duration: number;
		intro: string;
		keywords: string[];
		numSlides: number;
	}
) => {
	const section = await resolver.create({ ...config });
	if (section) return section;
	else return new Error("Failed to create section");
};

export const createModule = async (
	resolver: ProgramResolver,
	config: Module
) => {
	const data: ModuleInput = {
		name: config.name,
		collection: config.collectionID
	};
	const module = await resolver.createModule({ ...data });
	if (data) return module;
	else return new Error("Failed to create Module");
};

export const createEnrollment = async (
	resolver: ProgramResolver,
	config: {
		section: string;
		plan: string;
		status: EnrollmentStatus;
		role: UserRole;
	}
) => {
	const enrollment = await resolver.addSectionEnrollment({ ...config });
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

export const createQuiz = async (resolver: QuizResolver, input: Quiz) => {
	const data: CreateQuiz = {
		totalPoints: input.totalPoints,
		instructions: input.instructions,
		dueAt: input.dueAt,
		timeLimit: input.timeLimit,
		numQuestions: input.numQuestions,
		minScore: input.minScore,
		parentModule: input.parentModuleID
	};
	const quiz = await resolver.createQuiz(data);
	if (quiz) return quiz;
	else return new Error("Failed to create Quiz");
};

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
	};
	const question = await resolver.createQuestion(data);
	if (question) return question;
	else return new Error("Failed to create question");
};

export const createAnswer = async (resolver: QuizResolver, input: Answer) => {
	const data: CreateAnswer = {
		text: input.text,
		correct: input.correct,
		weight: input.weight,
		index: input.index,
		parentQuestion: input.parentQuestionID
	};
	const answer = await resolver.createAnswer(data);
	if (answer) return answer;
	else return new Error("Failed to create answer");
};
