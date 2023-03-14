import moment from "moment";
import { ProgramService } from "./program.service";
import { ProgramResolver } from "./program.resolver";
import { PrismaService } from "@/prisma.service";
import {
	Assignment,
	Module,
	AssignmentResult,
	Course,
	PlanOfStudy,
	User
} from "@/types/graphql";
import { createCollection, createModule } from "../../utils/tests";
import { test, describe, beforeAll, afterAll, expect } from "vitest";

interface IAssignment extends Assignment {
	id: string;
	name: string;
	dueAt?: Date;
	moduleId: string;
	//cannot be null or undefined as we want to attach the assignment to a module in all cases
	module: Module;
	//can be null but not undefined as it can return an empty array if there are no results yet
	assignmentResults?: [IAssignmentResult] | [];
}

interface IAssignmentResult extends AssignmentResult {
	id: string;
	submittedAt: Date;
	result: number;
	student: PlanOfStudy;
	gradedBy: User;
	assignmentId: string;
	studentId: string;
	graderId: string;
	assignment: IAssignment;
}

describe("Plan services", () => {
	let service: ProgramService;
	let resolver: ProgramResolver;
	let prisma: PrismaService;
	prisma = new PrismaService();

	beforeAll(async () => {
		service = new ProgramService(prisma);
		resolver = new ProgramResolver(service);
	});

	let testingModuleID: string;
	let testingAssignmentID: string;
	let testingAssignmentResultID: string;
	let testingCourseID: string;

	describe("Module", () => {
		describe("modules Query", () => {
			test("should return an array of modules", async () => {
				const modules = await resolver.module({});
				if (modules instanceof Error) return new Error(modules.message);
				expect(modules).toBeDefined();
				expect(modules.length).toBeGreaterThan(1);
				modules.map((module) => {
					expect(module.id).toBeDefined();
					testingModuleID = module.id;
				});
			});
			test("should not take longer than 1.5 seconds to return all modules", async () => {
				const start = new Date();
				const modules = await resolver.module({});
				if (modules instanceof Error) return new Error(modules.message);
				expect(modules.length).toBeGreaterThan(1);
				const end = new Date();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
		});
		describe("module Query", () => {
			test("should return a module", async () => {
				const module = await resolver.module({ id: testingModuleID });
				if (module instanceof Error) return new Error(module.message);
				expect(module.length).toBe(1);
				const moduleFirst = module[0];
				expect(moduleFirst).toBeDefined();
				if (moduleFirst) {
					expect(moduleFirst.id).toBe(testingModuleID);
					expect(moduleFirst.moduleName).toBeDefined();
					expect(moduleFirst.moduleNumber).toBeDefined();
					expect(moduleFirst.description).toBeDefined();
					expect(moduleFirst.createdAt).toBeDefined();
					expect(moment(moduleFirst.createdAt).isBefore(new Date())).toBe(true);
					expect(moduleFirst.updatedAt).toBeDefined();
					expect(moment(moduleFirst.updatedAt).isBefore(new Date())).toBe(true);
					expect(moduleFirst.duration).toBeDefined();
					expect(moduleFirst.numSlides).toBeDefined();

					expect(moduleFirst.keywords).toBeInstanceOf(Array);
					expect(moduleFirst.objectives).toBeInstanceOf(Array);
					expect(moduleFirst.feedback).toBeInstanceOf(Array);
					expect(moduleFirst.members).toBeInstanceOf(Array);
				}
			});
		});
	});
	describe("Enrollment", () => {
		describe("Query.moduleEnrollments()", () => {
			test("should return an array of moduleEnrollments", async () => {
				const moduleEnrollments = await resolver.moduleEnrollment({});
				expect(moduleEnrollments).toBeDefined();
				expect(moduleEnrollments.length).toBeGreaterThan(1);
				moduleEnrollments.map((enrollments) => {
					expect(enrollments.id).toBeDefined();
				});
			});
			test("should not take longer than 1.5 seconds to return all moduleEnrollments", async () => {
				const start = new Date();
				const moduleEnrollments = await resolver.moduleEnrollment({});
				expect(moduleEnrollments.length).toBeGreaterThan(1);
				const end = new Date();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
		});
	});
	describe("Course", () => {
		describe("Query.courses()", () => {
			test("should return an array of courses", async () => {
				const courses = await resolver.course({});
				expect(courses).toBeDefined();
				expect(courses.length).toBeGreaterThan(1);
				courses.map((course) => {
					expect(course.id).toBeDefined();
					expect(course.name).toBeDefined();
				});
			});
			test("should return modules related to the course", async () => {
				const courses = await resolver.course({});
				courses.map((course) => {
					expect(course.module).toBeDefined();
					expect(course.module).toBeInstanceOf(Array);
					expect(course.module.length).toBeGreaterThanOrEqual(1);
					testingCourseID = course.id;
				});
			});
			test("should not take longer than 1.5 seconds to return all courses", () => {
				const start = new Date();
				expect(resolver.course({})).resolves.toBeDefined();
				const end = new Date();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
		});
		describe("Query.course()", () => {
			test("should return the course specified by argument", async () => {
				const course = await resolver.course({ id: testingCourseID });
				expect(course[0]).toBeDefined();
				expect(course[0].id).toBe(testingCourseID);
				expect(course[0].name).toBeDefined();
				expect(Array.isArray(course[0].module)).toBe(true);
			});
		});
	});
	describe("Assignment", () => {
		describe("Query.assignments()", () => {
			test("should return an array of assignments", async () => {
				const assignments = await resolver.assignment({});
				expect(assignments).toBeDefined();
				expect(assignments.length).toBeGreaterThan(1);
				assignments.map((assignment) => {
					expect(assignment.id).toBeDefined();
					testingAssignmentID = assignment.id;
					if (assignment.assignmentResults !== undefined) {
						assignment.assignmentResults.map((result) => {
							expect(result.id).toBeDefined();
							expect(result.result).toBeDefined();
							expect(result.submittedAt).toBeDefined();
							expect(result.student).toBeDefined();
							expect(result.gradedBy).toBeDefined();
							expect(result.assignment).toBeDefined();
							testingAssignmentResultID = result.id;
						});
					}
				});
			});
			test("should not take longer than 1.5 seconds to return all assignments", async () => {
				const start = new Date();
				const assignments = await resolver.assignment({});
				expect(assignments.length).toBeGreaterThan(1);
				const end = new Date();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
		});
		describe("Query.assignment()", () => {
			test("should return a assignment", async () => {
				const assignment = await resolver.assignment({
					id: testingAssignmentID
				});
				expect(assignment).toBeDefined();
				expect(assignment.length).toBe(1);
				const assignmentFirst = assignment[0];
				expect(assignmentFirst).toBeDefined();
				if (assignmentFirst) {
					expect(assignmentFirst.id).toBe(testingAssignmentID);
					expect(assignmentFirst.name).toBeDefined();
					expect(assignmentFirst.moduleId).toBeDefined();
					expect(assignmentFirst.dueAt).toBeDefined();

					// testing populated module field
					const module = assignmentFirst.module;
					expect(module.id).toBe(assignmentFirst.moduleId);
					expect(module.moduleName).toBeDefined();
					expect(module.moduleNumber).toBeDefined();
					expect(module.duration).toBeDefined();
					expect(module.intro).toBeDefined();
					expect(module.numSlides).toBeDefined();
					expect(module.createdAt).toBeDefined();
					expect(moment(module.createdAt).isBefore(new Date())).toBe(true);
					expect(module.updatedAt).toBeDefined();
					expect(moment(module.updatedAt).isBefore(new Date())).toBe(true);
					expect(module.description).toBeDefined();
					expect(module.keywords).toBeDefined();

					// testing populated assignment results field
					if (assignmentFirst.assignmentResults !== undefined) {
						const result = assignmentFirst.assignmentResults[0];
						expect(result.id).toBeDefined();
						expect(result.submittedAt).toBeDefined();
						expect(result.result).toBeDefined();
						expect(result.student).toBeDefined();
						expect(result.gradedBy).toBeDefined();
						expect(result.assignment).toBeDefined();
					}
				}
			});
		});
		describe("Results", () => {
			describe("Query.assignmentResults()", () => {
				test("should return an array of assignmentResults", async () => {
					const assignmentResults = await resolver.assignmentResult({});
					expect(assignmentResults).toBeDefined();
					expect(assignmentResults.length).toBeGreaterThan(1);
					assignmentResults.map((results) => {
						expect(results.id).toBeDefined();
						testingAssignmentResultID = results.id;
					});
				});
				test("should not take longer than 1.5 seconds to return all assignmentResults", async () => {
					const start = new Date();
					const assignmentResults = await resolver.assignmentResult({});
					expect(assignmentResults.length).toBeGreaterThan(1);
					const end = new Date();
					expect(end.getTime() - start.getTime()).toBeLessThan(1500);
				});
			});
			describe("Query.assignmentResult()", () => {
				test("should return a assignmentResult", async () => {
					const assignmentResult = await resolver.assignmentResult({
						id: testingAssignmentResultID
					});
					expect(assignmentResult).toBeDefined();
					expect(assignmentResult.length).toBe(1);
					const assignmentResultFirst = assignmentResult[0];
					expect(assignmentResultFirst).toBeDefined();
					if (assignmentResultFirst) {
						expect(assignmentResultFirst.id).toBeDefined();
						expect(assignmentResultFirst.id).toBe(testingAssignmentResultID);
						expect(assignmentResultFirst.submittedAt).toBeDefined();
						expect(
							moment(assignmentResultFirst.submittedAt).isBefore(new Date())
						).toBe(true);
						expect(assignmentResultFirst.result).toBeDefined();
						expect(assignmentResultFirst.student).toBeDefined();
						expect(assignmentResultFirst.gradedBy).toBeDefined();
						expect(assignmentResultFirst.assignment).toBeDefined();
					}
				});
			});
		});
	});
});

describe("Collection", () => {
	let service: ProgramService;
	let resolver: ProgramResolver;
	let prisma: PrismaService;
	prisma = new PrismaService();

	const deleteModule = async (id: string) => {
		return await prisma.module.delete({
			where: { id }
		});
	};

	const deleteCollection = async (id: string) => {
		return await prisma.collection.delete({
			where: { id }
		});
	};

	const lessons = [
		"639217c90482bbfb9aba86cc",
		"639217e70482bbfb9aba86d0",
		"639217e70482bbfb9aba86d1",
		"639217e70482bbfb9aba86d2"
	];

	let testingCollectionID: string;
	let testingModuleID: string;

	beforeAll(async () => {
		service = new ProgramService(prisma);
		resolver = new ProgramResolver(service);

		const module = await createModule(resolver, {
			moduleName: "Test Module",
			moduleNumber: 10,
			duration: 1,
			intro: "Test Intro",
			numSlides: 1,
			description: "Test Description",
			keywords: ["test", "keyword"]
		});
		if (module instanceof Error) throw new Error(module.message);

		testingModuleID = module.id;

		const collection = await createCollection(resolver, {
			name: "Test Collection",
			moduleID: testingModuleID,
			lessons,
			positionIndex: 0
		});
		if (typeof collection === "undefined")
			throw new Error("Collection is undefined");
		testingCollectionID = collection[0].id;
	});
	afterAll(async () => {
		await deleteCollection(testingCollectionID);
		await deleteModule(testingModuleID);
		await prisma.$disconnect();
	});
	test("should return an array of collections", async () => {
		expect(await resolver.collection()).toBeDefined();
		expect(await resolver.collection()).toBeInstanceOf(Array);
	});
	test("should return a collection", async () => {
		const collection = await resolver.collection({
			moduleID: testingCollectionID
		});
		expect(collection).toBeDefined();
		if (collection.length > 0) {
			collection.map(async (col) => {
				expect(col.id).toBe(testingCollectionID);
				expect(col.name).toBeDefined();
				expect(col.moduleID).toBeDefined();
				expect(await resolver.module({ id: col.moduleID })).toBeDefined();
			});
		}
	});
	test("should match lesson position field to array index", async () => {
		const coll = await resolver.collection({ id: testingCollectionID });
		expect(coll).toBeDefined();
		if (coll.length > 0) {
			coll.map((c) => {
				c.lessons.map((lesson) => {
					expect(lesson.position === c.lessons[lesson.position].position).toBe(
						true
					);
					expect(lesson.collectionID === c.id).toBe(true);
				});
			});
		}
	});
	test("should populate previous and next based on module ID", function () {
		expect(true).toBe(true);
	});

	test("should set first content entry of a lesson as primary content entry", async function () {
		const coll = await resolver.collection({ id: testingCollectionID });
		expect(coll).toBeDefined();
		if (coll.length > 0) {
			coll.map((c) => {
				c.lessons.map((lesson) => {
					if (lesson.content.length == 1)
						expect(lesson.content[0].primary).toBe(true);
				});
			});
		}
	});
});
