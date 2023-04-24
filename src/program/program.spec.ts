import moment from "moment";
import { ProgramService } from "./program.service";
import { ProgramResolver } from "./program.resolver";
import { PrismaService } from "@/prisma.service";
import {
	Assignment,
	AssignmentResult,
	ContentType,
	CreateCollectionArgs,
	CreateContentArgs,
	ModuleInput,
	Module,
	NewModule,
	PlanOfStudy,
	User
} from "@/types/graphql";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { faker } from "@faker-js/faker";

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

	let testingModuleID;
	let testingAssignmentID;
	let testingAssignmentResultID: string;
	let testingCourseID: string;
	let createNewContent;
	const progServ: ProgramService = new ProgramService(prisma);
	const progResolver: ProgramResolver = new ProgramResolver(progServ);

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
				expect(assignments.length).toBeGreaterThan(0);
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
	const prisma = new PrismaService();
	const service = new ProgramService(prisma);
	const resolver = new ProgramResolver(service);

	const deleteModule = async (id: string) => {
		return prisma.module.delete({
			where: { id }
		});
	};

	const deleteCollection = async (id: string) => {
		return prisma.collection.delete({
			where: { id }
		});
	};

	const deleteModule = async (id: string) => {
		return prisma.module.delete({
			where: { id }
		});
	};

	const createCollection = async (input: CreateCollectionArgs) => {
		return resolver.createCollection(input);
	};

	const createModule = async (input: NewModule) => {
		return resolver.create(input);
	};

	const createModule = async (input: ModuleInput) => {
		return resolver.createModule(input);
	};

	const createModuleContent = async (input: CreateContentArgs) => {
		return resolver.createContent(input);
	};

	let testingContentID: string;
	let testingCollectionID: string;
	let testingModuleID: string;
	let testingModuleID: string;

	afterAll(async () => {
		await deleteModule(testingModuleID);
		await deleteCollection(testingCollectionID);
		await deleteModule(testingModuleID);
	});
	test("should create dummy data structure", async () => {
		const module = await createModule({
			moduleName: "Test Module",
			moduleNumber: faker.datatype.number({
				min: 123,
				max: 9999,
				precision: 1
			}),
			duration: 1,
			intro: "Test Intro",
			numSlides: 1,
			description: "Test Description",
			keywords: ["Test Keywords"]
		});
		testingModuleID = module.id;
		const collection = await createCollection({
			name: "Test Collection",
			moduleID: testingModuleID,
			positionIndex: 0
		});
		testingCollectionID = collection.id;

		const module = await createModule({
			name: "Test Module",
			collection: testingCollectionID
		});
		testingModuleID = module.id;

		const content = await createModuleContent({
			parent: testingModuleID,
			link: "",
			primary: true,
			type: ContentType.VIDEO
		});

		testingContentID = content.id;
	});
	test("should return an array of collections", async () => {
		const collection = await resolver.collection();
		expect(collection).toBeInstanceOf(Array);
		expect(collection.length).toBeGreaterThan(0);
	});
	test("should return a collection that belongs to the Module inputted", async () => {
		const collection = await resolver.collection({
			moduleID: testingModuleID
		});
		expect(collection).toBeInstanceOf(Array);
		collection.map(async (col) => {
			expect(col.id).toBe(testingCollectionID);
			expect(col.name).toBeDefined();
			expect(col.moduleID).toBe(testingModuleID);
		});
	});
	test("should return a collection that partially matches the name passed in", async () => {
		const collection = await resolver.collection({
			name: "Test"
		});
		expect(collection).toBeInstanceOf(Array);
		collection.map(async (col) => {
			expect(col.name).toBeDefined();
			expect(col.name).toMatch(/Test/);
		});
	});
	test("should return a collection that has modules with IDs matching the inputted one", async () => {
		const collection = await resolver.collection({
			modules: [testingModuleID]
		});
		expect(collection).toBeInstanceOf(Array);
		collection.map(async (col) => {
			expect(col.modules).toBeDefined();
			col.modules.map((module) => {
				expect(module.id).toBe(testingModuleID);
			});
		});
	});
	test("should return a collection that has position field matching the inputted one", async () => {
		const collection = await resolver.collection({
			positionIndex: 0
		});
		expect(collection).toBeInstanceOf(Array);
		expect(collection[0].position).toBe(0);
	});
	test("should match module position field to array index", async () => {
		const coll = await resolver.collection({ id: testingCollectionID });
		expect(coll).toBeInstanceOf(Array);
		coll.map((c) => {
			c.modules.map((module) => {
				expect(module.position === c.modules[module.position].position).toBe(
					true
				);
				expect(module.collectionID === c.id).toBe(true);
			});
		});
	});

	test("should return an array of contents", async () => {
		const contents = await resolver.content({});
		expect(contents).toBeInstanceOf(Array);
		expect(contents.length).toBeGreaterThan(0);
	});
	test("should return a content that belongs to the Module inputted", async () => {
		const contents = await resolver.content({
			parent: testingModuleID
		});
		expect(contents).toBeInstanceOf(Array);
		contents.map(async (content) => {
			expect(content.id).toBeDefined();
			expect(content.parentID).toBe(testingModuleID);
		});
	});
	test("should return a content array that has only one primary content within a module", async () => {
		const contents = await resolver.content({
			parent: testingModuleID
		});
		expect(contents).toBeInstanceOf(Array);
		expect(contents.filter((c) => c.primary).length).toBe(1);
	});
});
