import { QuizService } from "./quiz.service";
import { PrismaService } from "@/prisma.service";
import { QuizResolver } from "@/quiz/quiz.resolver";
import { test, describe, expect, afterAll } from "vitest";
import {
	createAnswer,
	createCollection,
	createModule,
	createPlan,
	createQuestion,
	createQuiz,
	createQuizInstance,
	createRandomAnswer,
	createRandomModule,
	createRandomQuestion,
	createRandomQuiz,
	createSection,
	createUser
} from "../../utils";
import { ProgramResolver, ProgramService } from "@/program";
import { faker } from "@faker-js/faker";
import { UserService } from "@/user/user.service";
import { UserResolver } from "@/user/user.resolver";
import { PlanOfStudyResolver, PoSService } from "@/pos";
import { QuizResult } from "@/types/graphql";

describe("Quiz Services", () => {
	// Init resolvers
	const prisma: PrismaService = new PrismaService();
	const service: QuizService = new QuizService(prisma);
	const resolver: QuizResolver = new QuizResolver(service);
	const progServ: ProgramService = new ProgramService(prisma);
	const progResolver: ProgramResolver = new ProgramResolver(progServ);
	const userService = new UserService(prisma);
	const userResolver = new UserResolver(userService);
	const planService = new PoSService(prisma);
	const planResolver = new PlanOfStudyResolver(planService);

	// Make mock models for testing against
	let fakeCollection;
	let fakeSection;
	let fakeModule;
	let fakeQuiz;
	let fakeQuestion;
	let fakeAnswer;
	let fakeSubmission: QuizResult;
	let fakeUser;
	let fakePlan;
	let fakeQuizInstance;

	afterAll(async () => {
		await progResolver.deleteModule(fakeModule.id);
		await progResolver.delete(fakeSection.id);
		await resolver.deleteQuiz(fakeQuiz.id);
		await resolver.deleteQuestion(fakeQuestion.id);
		await resolver.deleteAnswer(fakeAnswer.id);
		await resolver.deleteQuizResult(fakeSubmission.id);
		await userResolver.delete(fakeUser.id);
		await planResolver.deletePlan(fakePlan.id);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
		expect(resolver).toBeDefined();
	});

	test("should create mock dependencies", async () => {
		fakeUser = await createUser(userResolver, {
			biography: faker.lorem.sentence(),
			email: faker.internet.email(),
			firstName: faker.name.firstName(),
			openID: faker.datatype.uuid(),
			lastName: faker.name.lastName(),
			picURL: faker.image.imageUrl(),
			middleName: faker.name.middleName(),
			phoneNumber: faker.phone.number()
		});

		if (fakeUser instanceof Error) throw new Error(fakeUser.message);

		fakePlan = await createPlan(planResolver, {
			userID: fakeUser.id
		});

		if (fakePlan instanceof Error) throw new Error(fakePlan.message);

		fakeModule = await createModule(progResolver, {
			name: "testing3",
			number: 1003,
			description: "Stuff",
			hours: faker.datatype.float({
				min: 0.25,
				max: 3,
				precision: 2
			}),
			objectives: [faker.lorem.sentence()]
		});

		if (fakeModule instanceof Error) throw new Error(fakeModule.message);

		fakeSection = await createSection(progResolver, {
			description: faker.lorem.sentence(),
			intro: faker.lorem.sentence(),
			numSlides: faker.datatype.number({ min: 1, max: 10 }),
			duration: faker.datatype.number({ min: 1, max: 10 }),
			keywords: [faker.lorem.word()],
			sectionName: faker.lorem.word(),
			sectionNumber: faker.datatype.number({ min: 1000, max: 9000 })
		});

		if (fakeSection instanceof Error) throw new Error(fakeSection.message);

		fakeCollection = await createCollection(progResolver, {
			name: "test",
			modules: [fakeModule.id],
			sectionID: fakeSection.id,
			positionIndex: 1
		});

		if (fakeCollection instanceof Error)
			throw new Error(fakeCollection.message);
	});

	describe("Creates", () => {
		describe("Mutation.createQuiz()", () => {
			test("should create a new quiz", async () => {
				const quizData = createRandomQuiz(fakeModule.id);
				fakeQuiz = await createQuiz(resolver, quizData);
				if (fakeQuiz instanceof Error) throw new Error(fakeQuiz.message);
				expect(fakeQuiz).toBeDefined();
				expect(fakeQuiz.id).toBeDefined();
				expect(fakeQuiz.totalPoints).toEqual(quizData.totalPoints);
				expect(fakeQuiz.instructions).toEqual(quizData.instructions);
				expect(fakeQuiz.numQuestions).toEqual(quizData.numQuestions);
				expect(fakeQuiz.minScore).toEqual(quizData.minScore);
				expect(fakeQuiz.dueAt).toEqual(quizData.dueAt);
				expect(fakeQuiz.parentModuleID).toEqual(fakeModule.id);
			});
		});
		describe("Mutation.createQuestion", () => {
			test("should create a question record", async () => {
				const start = (await resolver.question({})).length;
				const questionData = createRandomQuestion(fakeQuiz.id);
				fakeQuestion = await createQuestion(resolver, questionData);
				if (fakeQuestion instanceof Error)
					throw new Error(fakeQuestion.message);
				const final = (await resolver.question({})).length;
				expect(fakeQuestion).toBeDefined();
				expect(fakeQuestion.number).toEqual(questionData.number);
				expect(fakeQuestion.variant).toEqual(questionData.variant);
				expect(fakeQuestion.text).toEqual(questionData.text);
				expect(fakeQuestion.parentID).toEqual(fakeQuiz.id);
				expect(final).toEqual(start + 1);
			});
		});
		describe("Mutation.createAnswer", () => {
			test("should create an Answer record", async () => {
				const start = (await resolver.answer({})).length;
				const answerData = createRandomAnswer(fakeQuestion.id);
				fakeAnswer = await createAnswer(resolver, answerData);
				if (fakeAnswer instanceof Error) throw new Error(fakeAnswer.message);
				const end = (await resolver.answer({})).length;
				expect(fakeAnswer).toBeDefined();
				expect(fakeAnswer.text).toEqual(answerData.text);
				expect(fakeAnswer.correct).toEqual(answerData.correct);
				expect(fakeAnswer.weight).toEqual(answerData.weight);
				expect(fakeAnswer.index).toEqual(answerData.index);
				expect(fakeAnswer.parentQuestionID).toEqual(fakeQuestion.id);
				expect(end).toEqual(start + 1);
			});
		});
		describe("Mutation.createQuizInstance", () => {
			test("should create a QuizInstance record", async () => {
				fakeQuizInstance = await createQuizInstance(resolver, fakeQuiz.id);
				if (fakeQuizInstance instanceof Error)
					throw new Error(fakeQuizInstance.message);
				expect(fakeQuizInstance).toBeDefined();
				expect(fakeQuizInstance.id).toBeDefined();
				expect(fakeQuizInstance.quiz.id).toEqual(fakeQuiz.id);
			});
		});
		describe("Mutation.submitQuiz", () => {
			test("should create a QuizResult record", async () => {
				const answers: string[] = [fakeAnswer.id];
				const result = await resolver.submitQuiz({
					student: fakeUser.id,
					quizInstance: fakeQuizInstance.id,
					answers
				});
				if (result instanceof Error) return new Error(result.message);
				fakeSubmission = result;
				expect(result).toBeDefined();
				expect(result.score).toBeGreaterThanOrEqual(0.0);
				expect(result.score).toBeLessThanOrEqual(100.0);
			});
		});
	});

	describe("Reads", () => {
		describe("Query.quiz()", () => {
			test("should return a list of quizzes", async () => {
				const quizzes = await resolver.quiz({});
				expect(quizzes).toBeDefined();
				expect(typeof quizzes).toBe(typeof []);
				expect(quizzes.length).toBeGreaterThanOrEqual(1);
			});
			test("should return a single record given an ID", async () => {
				const quizzes = await resolver.quiz({ id: fakeQuiz.id });
				expect(quizzes).toBeDefined();
				expect(quizzes.length).toEqual(1);
				expect(quizzes[0].id).toEqual(fakeQuiz.id);
			});
			test("should return only records that match parameters", async () => {
				const params = fakeQuiz;
				const quizzes = await resolver.quiz({
					totalPoints: fakeQuiz.totalPoints,
					instructions: fakeQuiz.instructions,
					dueAt: fakeQuiz.dueAt,
					numQuestions: fakeQuiz.numQuestions,
					minScore: fakeQuiz.minScore,
					parentModule: fakeQuiz.parentModuleID
				});

				expect(quizzes).toBeDefined();
				quizzes.map((quiz) => {
					expect(quiz.totalPoints).toEqual(params.totalPoints);
					expect(quiz.dueAt).toEqual(params.dueAt);
					expect(quiz.numQuestions).toEqual(params.numQuestions);
					expect(quiz.minScore).toEqual(params.minScore);
					expect(quiz.parentModule.id).toEqual(params.parentModuleID);
				});
			});
			test("should take less than 1.5 seconds to get all quizzes", async () => {
				const start = new Date();
				const quizzes = await resolver.quiz({});
				const end = new Date();
				expect(quizzes).toBeDefined();
				expect(end.getTime() - start.getTime()).toBeLessThanOrEqual(1500);
			});
		});
		describe("Query.question()", () => {
			test("should return a list of questions", async () => {
				const questions = await resolver.question({});
				expect(questions).toBeDefined();
				expect(typeof questions).toBe(typeof []);
				expect(questions.length).toBeGreaterThanOrEqual(1);
			});
			test("should get a list in less than 1.5 seconds", async () => {
				const start = new Date();
				const questions = await resolver.question({});
				const end = new Date();
				expect(questions).toBeDefined();
				expect(questions.length).toBeGreaterThanOrEqual(1);
				expect(end.getTime() - start.getTime()).toBeLessThanOrEqual(1500);
			});
			test("should get a single record given an ID", async () => {
				const questions = await resolver.question({ id: fakeQuestion.id });
				expect(questions).toBeDefined();
				expect(questions.length).toEqual(1);
				expect(questions[0].id).toEqual(fakeQuestion.id);
			});
			test("should get only matching records", async () => {
				const questions = await resolver.question({
					number: fakeQuestion.number,
					variant: fakeQuestion.variant,
					text: fakeQuestion.text,
					points: fakeQuestion.points,
					parent: fakeQuestion.parentID
				});
				expect(questions).toBeDefined();
				expect(questions.length).toBeGreaterThanOrEqual(1);
				questions.map((question) => {
					expect(question.number).toEqual(fakeQuestion.number);
					expect(question.variant).toEqual(fakeQuestion.variant);
					expect(question.text).toEqual(fakeQuestion.text);
					expect(question.parentID).toEqual(fakeQuestion.parentID);
					expect(question.points).toEqual(fakeQuestion.points);
				});
			});
		});
		describe("Query.answer()", () => {
			test("should return a list of answers", async () => {
				const answers = await resolver.answer({});
				expect(answers).toBeDefined();
				expect(typeof answers).toBe(typeof []);
				expect(answers.length).toBeGreaterThanOrEqual(1);
			});
			test("should return all answers in less than 1.5s", async () => {
				const start = new Date();
				const answers = await resolver.answer({});
				const end = new Date();
				expect(answers).toBeDefined();
				expect(answers.length).toBeGreaterThanOrEqual(1);
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
			test("should return a single answer given ID", async () => {
				const answers = await resolver.answer({ id: fakeAnswer.id });
				expect(answers).toBeDefined();
				expect(answers.length).toEqual(1);
				expect(answers[0].id).toEqual(fakeAnswer.id);
			});
			test("should return only matching records", async () => {
				const answers = await resolver.answer({
					text: fakeAnswer.text,
					correct: fakeAnswer.correct,
					weight: fakeAnswer.weight,
					index: fakeAnswer.index,
					parentQuestion: fakeAnswer.parentQuestionID
				});
				expect(answers).toBeDefined();
				expect(typeof answers).toBe(typeof []);
				answers.map((answer) => {
					expect(answer.text).toEqual(fakeAnswer.text);
					expect(answer.correct).toEqual(fakeAnswer.correct);
					expect(answer.weight).toEqual(fakeAnswer.weight);
					expect(answer.index).toEqual(fakeAnswer.index);
					expect(answer.parentQuestionID).toEqual(fakeAnswer.parentQuestionID);
				});
			});
		});
		describe("Query.quizResult", () => {
			test("should return a list of quizResults", async () => {
				const results = await resolver.quizResult({});
				expect(results).toBeDefined();
				expect(typeof results).toBe(typeof []);
			});
			test("should return all records in less than 1.5s", async () => {
				const start = new Date();
				const results = await resolver.quizResult({});
				const end = new Date();
				expect(results).toBeDefined();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
			test("should return a single result given an ID", async () => {
				const results = await resolver.quizResult({ id: fakeSubmission.id });
				expect(results).toBeDefined();
				expect(results.length).toEqual(1);
				expect(results[0].id).toEqual(fakeSubmission.id);
			});
			test("should return only matching records", async () => {
				const results = await resolver.quizResult({
					score: fakeSubmission.score,
					student: fakeSubmission.studentID,
					quizInstance: fakeSubmission.quizID
				});
				expect(results).toBeDefined();
				results.map((result) => {
					expect(result.score).toEqual(fakeSubmission.score);
					expect(result.studentID).toEqual(fakeSubmission.studentID);
					expect(result.quizInstanceID).toEqual(fakeSubmission.quizID);
				});
			});
		});
	});

	describe("Updates", () => {
		describe("Mutation.updateQuiz()", () => {
			test("should update all specified fields", async () => {
				const otherModule = await createModule(
					progResolver,
					createRandomModule(fakeCollection.id)
				);
				if (otherModule instanceof Error) throw new Error(otherModule.message);
				const quizData = createRandomQuiz();
				const updatedQuiz = await resolver.updateQuiz(fakeQuiz.id, {
					totalPoints: quizData.totalPoints,
					instructions: quizData.instructions,
					numQuestions: quizData.numQuestions,
					minScore: quizData.minScore,
					parentModule: otherModule.id,
					dueAt: quizData.dueAt
				});
				expect(updatedQuiz).toBeDefined();
				expect(updatedQuiz.totalPoints).toEqual(quizData.totalPoints);
				expect(updatedQuiz.instructions).toEqual(quizData.instructions);
				expect(updatedQuiz.numQuestions).toEqual(quizData.numQuestions);
				expect(updatedQuiz.minScore).toEqual(quizData.minScore);
				expect(updatedQuiz.parentModule.id).toEqual(otherModule.id);
				expect(updatedQuiz.dueAt).toEqual(quizData.dueAt);
			});
		});
		describe("Mutation.updateQuestion", () => {
			test("should update only specified fields", async () => {
				// TODO add changing questions parent Quiz test case
				const questionData = createRandomQuestion();
				const updated = await resolver.updateQuestion(fakeQuestion.id, {
					number: questionData.number,
					variant: questionData.variant,
					text: questionData.text
				});
				expect(updated).toBeDefined();
				expect(updated.number).toEqual(questionData.number);
				expect(updated.text).toEqual(questionData.text);
			});
		});
		describe("Mutation.updateAnswer", () => {
			test("should update only matching fields", async () => {
				const questionData = createRandomQuestion(fakeQuiz.id);
				const question = await createQuestion(resolver, questionData);
				if (question instanceof Error) throw new Error(question.message);
				const answerData = createRandomAnswer();
				console.log(fakeAnswer.id, question.id);
				const update = await resolver.updateAnswer(fakeAnswer.id, {
					text: answerData.text,
					correct: answerData.correct,
					weight: answerData.weight,
					index: answerData.index,
					parentQuestion: question.id
				});
				expect(update).toBeDefined();
				expect(update.text).toEqual(answerData.text);
				expect(update.correct).toEqual(answerData.correct);
				expect(update.weight).toEqual(answerData.weight);
				expect(update.index).toEqual(answerData.index);
				expect(update.parentQuestionID).toEqual(question.id);
			});
		});
		describe("Mutation.updateQuizScore", () => {
			test("should update a quizResult score", async () => {
				const updated = await resolver.updateQuizScore(
					fakeSubmission.id,
					fakeSubmission.score + 1
				);
				expect(updated).toBeDefined();
				expect(updated.id).toEqual(fakeSubmission.id);
				expect(updated.score).toEqual(fakeSubmission.score + 1);
				fakeSubmission = updated;
			});
		});
	});

	describe("Deletes", () => {
		describe("Mutation.deleteAnswer", () => {
			test("should delete an Answer record", async () => {
				const deleted = await resolver.deleteAnswer(fakeAnswer.id);
				expect(deleted).toBeDefined();
				expect(deleted.id).toEqual(fakeAnswer.id);
			});
		});
		describe("Mutation.deleteQuestion", () => {
			test("should delete a question record", async () => {
				const deleted = await resolver.deleteQuestion(fakeQuestion.id);
				expect(deleted).toBeDefined();
				expect(deleted.id).toEqual(fakeQuestion.id);
			});
			test("should delete all child answers", async () => {
				fakeQuestion.answers.map(async (answer) => {
					const answers = await resolver.answer({ id: answer.id });
					expect(answers).toBeDefined();
					expect(typeof answers).toBe(typeof []);
					expect(answers.length).toEqual(0);
				});
			});
		});
		describe("Mutation.deleteQuizResult", () => {
			test("should delete a quiz result", async () => {
				await resolver.deleteQuizResult(fakeSubmission.id);
				const resultCheck = await resolver.quizResult({
					id: fakeSubmission.id
				});
				expect(resultCheck.length).toEqual(0);
			});
		});
		describe("Mutation.deleteQuiz()", () => {
			test("should delete a quiz record", async () => {
				await resolver.deleteQuiz(fakeQuiz.id);
				const quizCheck = await resolver.quiz({ id: fakeQuiz.id });
				expect(quizCheck.length).toEqual(0);
			});
		});
	});
});
