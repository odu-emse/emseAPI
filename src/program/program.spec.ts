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
	PlanOfStudy,
	User,
	NewSection
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
					expect(moduleFirst.name).toBeDefined();
					expect(moduleFirst.number).toBeDefined();
					expect(moduleFirst.description).toBeDefined();
					expect(moduleFirst.objectives).toBeInstanceOf(Array);
				}
			});
		});
	});
	describe("Enrollment", () => {
		describe("Query.moduleEnrollments()", () => {
			test("should return an array of moduleEnrollments", async () => {
				const moduleEnrollments = await resolver.sectionEnrollment({});
				expect(moduleEnrollments).toBeDefined();
				expect(moduleEnrollments.length).toBeGreaterThan(1);
				moduleEnrollments.map((enrollments) => {
					expect(enrollments.id).toBeDefined();
				});
			});
			test("should not take longer than 1.5 seconds to return all moduleEnrollments", async () => {
				const start = new Date();
				const moduleEnrollments = await resolver.sectionEnrollment({});
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
					expect(course.sections).toBeDefined();
					expect(course.sections).toBeInstanceOf(Array);
					expect(course.sections.length).toBeGreaterThanOrEqual(1);
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
				expect(Array.isArray(course[0].sections)).toBe(true);
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
					expect(assignmentFirst.section).toBeDefined();
					expect(assignmentFirst.dueAt).toBeDefined();

					// testing populated module field
					const section = assignmentFirst.section;
					expect(section.id).toBe(assignmentFirst.sectionId);
					expect(section.sectionName).toBeDefined();
					expect(section.sectionNumber).toBeDefined();
					expect(section.duration).toBeDefined();
					expect(section.intro).toBeDefined();
					expect(section.numSlides).toBeDefined();
					expect(section.createdAt).toBeDefined();
					expect(moment(section.createdAt).isBefore(new Date())).toBe(true);
					expect(section.updatedAt).toBeDefined();
					expect(moment(section.updatedAt).isBefore(new Date())).toBe(true);
					expect(section.description).toBeDefined();
					expect(section.keywords).toBeDefined();

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

	const deleteSection = async (id: string) => {
		return prisma.section.delete({
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

	const createSection = async (input: NewSection) => {
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
	let testingSectionID: string;
	let testingModuleID: string;

	afterAll(async () => {
		await deleteModule(testingModuleID);
		await deleteCollection(testingCollectionID);
		await deleteModule(testingModuleID);
		await deleteSection(testingSectionID);
	});
	test("should create dummy data structure", async () => {
		const section = await createSection({
			sectionName: "Test Module",
			sectionNumber: faker.datatype.number({
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
		testingSectionID = section.id;
		const collection = await createCollection({
			name: "Test Collection",
			positionIndex: 0,
			sectionID: testingSectionID
		});
		testingCollectionID = collection.id;

		const module = await createModule({
			name: "Test Module",
			collection: testingCollectionID,
			hours: 1
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
			modules: [testingModuleID]
		});
		expect(collection).toBeInstanceOf(Array);
		collection.map(async (col) => {
			expect(col.id).toBe(testingCollectionID);
			expect(col.name).toBeDefined();
			expect(col.moduleIDs).toContain(testingModuleID);
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
				expect(module.collectionIDs.includes(c.id)).toBe(true);
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
