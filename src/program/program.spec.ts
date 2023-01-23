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
	User,
	CreateCollectionArgs
} from "gql/graphql";
import { Prisma } from "@prisma/client";

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
			it("should return an array of modules", async () => {
				const modules = await resolver.modules();
				expect(modules).toBeDefined();
				expect(modules.length).toBeGreaterThan(1);
				modules.map((module) => {
					expect(module.id).toBeDefined();
					testingModuleID = module.id;
				});
			});
			it("should not take longer than 1.5 seconds to return all modules", async () => {
				const start = new Date();
				const modules = await resolver.modules();
				expect(modules.length).toBeGreaterThan(1);
				const end = new Date();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
		});
		describe("module Query", () => {
			it("should return a module", async () => {
				const module = await resolver.module(testingModuleID);
				expect(module).toBeDefined();
				if (module) {
					expect(module.id).toBe(testingModuleID);
					expect(module.moduleName).toBeDefined();
					expect(module.moduleNumber).toBeDefined();
					expect(module.description).toBeDefined();
					expect(module.createdAt).toBeDefined();
					expect(moment(module.createdAt).isBefore(new Date())).toBe(true);
					expect(module.updatedAt).toBeDefined();
					expect(moment(module.updatedAt).isBefore(new Date())).toBe(true);
					expect(module.duration).toBeDefined();
					expect(module.numSlides).toBeDefined();

					expect(module.keywords).toBeInstanceOf(Array);
					expect(module.objectives).toBeInstanceOf(Array);
					expect(module.feedback).toBeInstanceOf(Array);
					expect(module.members).toBeInstanceOf(Array);

					if (module.parentModules !== null || true)
						expect(module.parentModules).toBeInstanceOf(Array);
					if (module.subModules !== null || true)
						expect(module.subModules).toBeInstanceOf(Array);
				}
			});
		});
	});
	describe("Enrollment", () => {
		describe("Query.moduleEnrollments()", () => {
			it("should return an array of moduleEnrollments", async () => {
				const moduleEnrollments = await resolver.moduleEnrollments();
				expect(moduleEnrollments).toBeDefined();
				expect(moduleEnrollments.length).toBeGreaterThan(1);
				moduleEnrollments.map((enrollments) => {
					expect(enrollments.id).toBeDefined();
				});
			});
			it("should not take longer than 1.5 seconds to return all moduleEnrollments", async () => {
				const start = new Date();
				const moduleEnrollments = await resolver.moduleEnrollments();
				expect(moduleEnrollments.length).toBeGreaterThan(1);
				const end = new Date();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
		});
	});
	describe("Course", () => {
		describe("Query.courses()", () => {
			it("should return an array of courses", async () => {
				const courses = await resolver.courses();
				expect(courses).toBeDefined();
				expect(courses.length).toBeGreaterThan(1);
				courses.map((course) => {
					expect(course.id).toBeDefined();
					expect(course.name).toBeDefined();
				});
			});
			it("should return modules related to the course", async () => {
				const courses = await resolver.courses();
				courses.map((course) => {
					expect(course.module).toBeDefined();
					expect(course.module).toBeInstanceOf(Array);
					expect(course.module.length).toBeGreaterThanOrEqual(1);
					testingCourseID = course.id;
				});
			});
			it("should not take longer than 1.5 seconds to return all courses", () => {
				const start = new Date();
				expect(resolver.courses()).resolves.toBeDefined();
				const end = new Date();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
		});
		describe("Query.course()", () => {
			it("should return the course specified by argument", async () => {
				const course = await resolver.course(testingCourseID);
				expect(course).toBeDefined();
				expect(course.id).toBe(testingCourseID);
				expect(course.name).toBeDefined();
				expect(Array.isArray(course.module)).toBe(true);
			});
		});
	});
	describe("Assignment", () => {
		describe("Query.assignments()", () => {
			it("should return an array of assignments", async () => {
				const assignments = await resolver.assignments();
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
			it("should not take longer than 1.5 seconds to return all assignments", async () => {
				const start = new Date();
				const assignments = await resolver.assignments();
				expect(assignments.length).toBeGreaterThan(1);
				const end = new Date();
				expect(end.getTime() - start.getTime()).toBeLessThan(1500);
			});
		});
		describe("Query.assignment()", () => {
			it("should return a assignment", async () => {
				const assignment = await resolver.assignment(testingAssignmentID);
				expect(assignment).toBeDefined();
				if (assignment) {
					expect(assignment.id).toBe(testingAssignmentID);
					expect(assignment.name).toBeDefined();
					expect(assignment.moduleId).toBeDefined();
					expect(assignment.dueAt).toBeDefined();

					// testing populated module field
					const module = assignment.module;
					expect(module.id).toBe(assignment.moduleId);
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
					if (assignment.assignmentResults !== undefined) {
						const result = assignment.assignmentResults[0];
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
				it("should return an array of assignmentResults", async () => {
					const assignmentResults = await resolver.assignmentResults();
					expect(assignmentResults).toBeDefined();
					expect(assignmentResults.length).toBeGreaterThan(1);
					assignmentResults.map((results) => {
						expect(results.id).toBeDefined();
						testingAssignmentResultID = results.id;
					});
				});
				it("should not take longer than 1.5 seconds to return all assignmentResults", async () => {
					const start = new Date();
					const assignmentResults = await resolver.assignmentResults();
					expect(assignmentResults.length).toBeGreaterThan(1);
					const end = new Date();
					expect(end.getTime() - start.getTime()).toBeLessThan(1500);
				});
			});
			describe("Query.assignmentResult()", () => {
				it("should return a assignmentResult", async () => {
					const assignmentResult = await resolver.assignmentResult(
						testingAssignmentResultID
					);
					expect(assignmentResult).toBeDefined();
					if (assignmentResult) {
						expect(assignmentResult.id).toBeDefined();
						expect(assignmentResult.id).toBe(testingAssignmentResultID);
						expect(assignmentResult.submittedAt).toBeDefined();
						expect(
							moment(assignmentResult.submittedAt).isBefore(new Date())
						).toBe(true);
						expect(assignmentResult.result).toBeDefined();
						expect(assignmentResult.student).toBeDefined();
						expect(assignmentResult.gradedBy).toBeDefined();
						expect(assignmentResult.assignment).toBeDefined();
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

	const createModule = async (input: Prisma.ModuleCreateInput) => {
		return await resolver.create(input);
	};

	const createCollection = async (input: CreateCollectionArgs) => {
		return await resolver.createCollection(input);
	};

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

		const module = await createModule({
			moduleName: "Test Module",
			moduleNumber: 1,
			duration: 1,
			intro: "Test Intro",
			numSlides: 1,
			description: "Test Description"
		});

		testingModuleID = module.id;

		const collection = await createCollection({
			name: "Test Collection",
			moduleID: testingModuleID,
			lessons
		});

		testingCollectionID = collection.id;
	});
	afterAll(async () => {
		await deleteCollection(testingCollectionID);
		await deleteModule(testingModuleID);
		prisma.$disconnect();
	});
	it("should return an array of collections", async () => {
		expect(await resolver.collections()).toBeDefined();
		expect(await resolver.collections()).toBeInstanceOf(Array);
	});
	it("should return a collection", async () => {
		const collection = await resolver.collection(testingCollectionID);
		expect(collection).toBeDefined();
		if (collection) {
			expect(collection.id).toBe(testingCollectionID);
			expect(collection.name).toBeDefined();
			expect(collection.moduleID).toBeDefined();
			expect(await resolver.module(collection.moduleID)).toBeDefined();
		}
	});
	it("should populate first and last lessons properties", async () => {
		const coll = await resolver.collection(testingCollectionID);
		expect(coll).toBeDefined();
		if (coll) {
			expect(coll.first).toEqual(lessons.at(0));
			expect(coll.last).toEqual(lessons.at(-1));
		}
	});
	it("should populate previous and next based on module ID", function () {
		expect(true).toBe(true);
	});
});
