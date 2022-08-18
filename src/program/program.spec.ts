import { ProgramService } from "./program.service";
import { ProgramResolver } from "./program.resolver";
import { PrismaService } from "../prisma.service";
import { Module, User } from "@prisma/client";

describe("Plan services", () => {
	let service: ProgramService;
	let resolver: ProgramResolver;
	let prisma: PrismaService;
	prisma = new PrismaService();

	beforeEach(async () => {
		service = new ProgramService(prisma);
		resolver = new ProgramResolver(service);
	});

	// multi-return queries

	describe("Query.modules()", () => {
		it("should return an array of modules", async () => {
			const modules = await resolver.modules();
			expect(modules).toBeDefined();
			expect(modules.length).toBeGreaterThan(1);
			modules.map(module => {
				expect(module.id).toBeDefined();
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
	describe("Query.courses()", () => {
		it("should return an array of courses", async () => {
			const courses = await resolver.courses();
			expect(courses).toBeDefined();
			expect(courses.length).toBeGreaterThan(1);
			courses.map(course => {
				expect(course.id).toBeDefined();
			});
		});
		it("should not take longer than 1.5 seconds to return all courses", async () => {
			const start = new Date();
			const courses = await resolver.courses();
			expect(courses.length).toBeGreaterThan(1);
			const end = new Date();
			expect(end.getTime() - start.getTime()).toBeLessThan(1500);
		});
	});
	describe("Query.assignments()", () => {
		it("should return an array of assignments", async () => {
			const assignments = await resolver.assignments();
			expect(assignments).toBeDefined();
			expect(assignments.length).toBeGreaterThan(1);
			assignments.map(assignment => {
				expect(assignment.id).toBeDefined();
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
	describe("Query.assignmentResults()", () => {
		it("should return an array of assignmentResults", async () => {
			const assignmentResults = await resolver.assignmentResults();
			expect(assignmentResults).toBeDefined();
			expect(assignmentResults.length).toBeGreaterThan(1);
			assignmentResults.map(results => {
				expect(results.id).toBeDefined();
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
	describe("Query.moduleEnrollments()", () => {
		it("should return an array of moduleEnrollments", async () => {
			const moduleEnrollments = await resolver.moduleEnrollments();
			expect(moduleEnrollments).toBeDefined();
			expect(moduleEnrollments.length).toBeGreaterThan(1);
			moduleEnrollments.map(enrollments => {
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
	describe("Query.courseEnrollments()", () => {
		it("should return an array of courseEnrollments", async () => {
			const courseEnrollments = await resolver.courseEnrollments();
			expect(courseEnrollments).toBeDefined();
			expect(courseEnrollments.length).toBeGreaterThan(1);
			courseEnrollments.map(enrollments => {
				expect(enrollments.id).toBeDefined();
			});
		});
		it("should not take longer than 1.5 seconds to return all courseEnrollments", async () => {
			const start = new Date();
			const courseEnrollments = await resolver.courseEnrollments();
			expect(courseEnrollments.length).toBeGreaterThan(1);
			const end = new Date();
			expect(end.getTime() - start.getTime()).toBeLessThan(1500);
		});
	});

	// singular return queries

	const testingModuleID = "620d2d2df524b2dcf02b5bbe";

	describe("Query.module()", () => {
		it("should return a module", async () => {
			const module = await resolver.module(testingModuleID);
			expect(module).toBeDefined();
			expect(module!.id).toBe(testingModuleID);
			expect(module!.moduleName).toBeDefined();
			expect(module!.moduleNumber).toBeDefined();
			expect(module!.description).toBeDefined();
			expect(module!.keywords).toBeDefined();
		});
	});
});
