import moment from "moment";
import { ProgramService } from "./program.service";
import { ProgramResolver } from "./program.resolver";
import { PrismaService } from "../prisma.service";
import {
	Assignment,
	Module,
	AssignmentResult,
	CourseEnrollment,
	ModuleEnrollment,
	Course,
	PlanOfStudy,
	User,
	ModuleFeedback
} from "gql/graphql";

interface IAssignment extends Assignment {
	id: string;
	name: string;
	dueAt?: string;
	moduleId: string;
	//cannot be null or undefined as we want to attach the assignment to a module in all cases
	module: Module;
	//can be null but not undefined as it can return an empty array if there are no results yet
	assignmentResults?: [IAssignmentResult] | [];
}
interface IAssignmentResult extends AssignmentResult {
	id: string;
	submittedAt: string;
	result: number;
	student: PlanOfStudy;
	gradedBy: User;
	assignmentId: string;
	studentId: string;
	graderId: string;
	assignment: IAssignment;
}
interface IModule extends Module {
	id: string;
	name: string;
	dueAt: string;
	moduleId: string;
	module: Module;
	createdAt: string;
	feedback: [ModuleFeedback];
}

interface IProgramResolver {
	//multi return queries
	courseEnrollments: () => Promise<CourseEnrollment[]>;
	moduleEnrollments: () => Promise<ModuleEnrollment[]>;
	assignmentResults: () => Promise<AssignmentResult[]>;
	assignments: () => Promise<IAssignment[]>;
	courses: () => Promise<Course[]>;
	modules: () => Promise<IModule[]>;
	//single return queries
	assignment: (ID: string) => Promise<IAssignment>;
	module: (ID: string) => Promise<IModule>;
	course: (ID: string) => Promise<Course>;
	assignmentResult: (ID: string) => Promise<AssignmentResult>;
	courseEnrollment: (ID: string) => Promise<CourseEnrollment>;
	moduleEnrollment: (ID: string) => Promise<ModuleEnrollment>;
}

describe("Plan services", () => {
	let service: ProgramService;
	let resolver: IProgramResolver;
	let prisma: PrismaService;
	prisma = new PrismaService();

	beforeEach(async () => {
		service = new ProgramService(prisma);
		//@ts-ignore
		resolver = new ProgramResolver(service);
	});

	let testingModuleID: string;
	let testingAssignmentID: string;
	let testingAssignmentResultID: string = "627aafa82aebc6eb40b00043";
	let testingCourseID: string;

	// multi-return queries

	describe("Query.modules()", () => {
		it("should return an array of modules", async () => {
			const modules = await resolver.modules();
			expect(modules).toBeDefined();
			expect(modules.length).toBeGreaterThan(1);
			modules.map(module => {
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
	describe("Query.courses()", () => {
		it("should return an array of courses", async () => {
			const courses = await resolver.courses();
			expect(courses).toBeDefined();
			expect(courses.length).toBeGreaterThan(1);
			courses.map(course => {
				expect(course.id).toBeDefined();
				testingCourseID = course.id;
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
				testingAssignmentID = assignment.id;
				if (assignment.assignmentResults !== undefined) {
					assignment.assignmentResults.map(
						(result: AssignmentResult) => {
							expect(result.id).toBeDefined();
							testingAssignmentResultID = result.id;
						}
					);
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

	describe("Query.module()", () => {
		it("should return a module", async () => {
			const module = await resolver.module(testingModuleID);
			expect(module).toBeDefined();
			expect(module!.id).toBe(testingModuleID);
			expect(module!.moduleName).toBeDefined();
			expect(module!.moduleNumber).toBeDefined();
			expect(module!.description).toBeDefined();
			expect(module!.createdAt).toBeDefined();
			expect(moment(module!.createdAt).isBefore(new Date())).toBe(true);
			expect(module!.updatedAt).toBeDefined();
			expect(moment(module!.updatedAt).isBefore(new Date())).toBe(true);
			expect(module!.duration).toBeDefined();
			expect(module!.numSlides).toBeDefined();

			expect(Array.isArray(module!.keywords)).toBe(true);
			expect(Array.isArray(module!.feedback)).toBe(true);
			expect(Array.isArray(module!.members)).toBe(true);
			expect(Array.isArray(module!.parentCourses)).toBe(true);
		});
	});
	describe("Query.assignment()", () => {
		it("should return a assignment", async () => {
			const assignment = await resolver.assignment(testingAssignmentID);
			expect(assignment).toBeDefined();
			expect(assignment!.id).toBe(testingAssignmentID);
			expect(assignment!.name).toBeDefined();
			expect(assignment!.moduleId).toBeDefined();
			expect(assignment!.dueAt).toBeDefined();

			// testing populated module field
			const module = assignment!.module;
			expect(module.id).toBe(assignment!.moduleId);
			expect(module!.moduleName).toBeDefined();
			expect(module!.moduleNumber).toBeDefined();
			expect(module!.duration).toBeDefined();
			expect(module!.intro).toBeDefined();
			expect(module!.numSlides).toBeDefined();
			expect(module!.createdAt).toBeDefined();
			expect(moment(module!.createdAt).isBefore(new Date())).toBe(true);
			expect(module!.updatedAt).toBeDefined();
			expect(moment(module!.updatedAt).isBefore(new Date())).toBe(true);
			expect(module!.description).toBeDefined();
			expect(module!.keywords).toBeDefined();

			// testing populated assignment results field
			if (
				assignment.assignmentResults !== undefined &&
				assignment.assignmentResults?.length > 0
			) {
				const result = assignment.assignmentResults[0];
				expect(result!.id).toBeDefined();
				expect(result!.submittedAt).toBeDefined();
				expect(result!.result).toBeDefined();
				expect(result!.student).toBeDefined();
				expect(result!.gradedBy).toBeDefined();
				expect(result!.assignment).toBeDefined();
			}
		});
	});
	describe("Query.course()", () => {
		it("should return a course", async () => {
			const course = await resolver.course(testingCourseID);
			expect(course).toBeDefined();
			expect(course!.id).toBe(testingCourseID);
			expect(course!.name).toBeDefined();
			expect(Array.isArray(course!.enrollment)).toBe(true);
			expect(Array.isArray(course!.modules)).toBe(true);
		});
	});
	describe("Query.assignmentResult()", () => {
		it("should return a assignmentResult", async () => {
			const assignmentResult = await resolver.assignmentResult(
				testingAssignmentResultID
			);

			expect(assignmentResult).toBeDefined();
			expect(assignmentResult!.id).toBeDefined();
			expect(assignmentResult!.id).toBe(testingAssignmentResultID);
			expect(assignmentResult!.submittedAt).toBeDefined();
			expect(
				moment(assignmentResult!.submittedAt).isBefore(new Date())
			).toBe(true);
			expect(assignmentResult!.result).toBeDefined();
			expect(assignmentResult!.student).toBeDefined();
			expect(assignmentResult!.gradedBy).toBeDefined();
			expect(assignmentResult!.assignment).toBeDefined();
		});
	});
});
