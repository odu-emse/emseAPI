import { PlanOfStudyResolver } from "@/pos";
import { ProgramResolver } from "@/program";
import {
	CreateCollectionArgs, CreateQuiz,
	EnrollmentStatus,
	UserRole
} from "@/types/graphql";
import {QuizResolver} from "@/quiz/quiz.resolver";

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
};

export const createQuiz = async (
	resolver: QuizResolver,
	input: CreateQuiz
) => {
	const quiz = await resolver.createQuiz(input);
	if (quiz) return quiz;
}

