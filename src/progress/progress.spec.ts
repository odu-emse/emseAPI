import { ProgressResolver, ProgressService } from "@/progress";
import { PlanOfStudyResolver, PoSService } from "@/pos";
import { ProgramResolver, ProgramService } from "@/program";
import {
	EnrollmentStatus,
	PlanOfStudy,
	Progress,
	UserRole
} from "@/types/graphql";
import { PrismaService } from "@/prisma.service";
import {
	createEnrollment,
	createModule,
	createPlan,
	shuffle
} from "../../utils/tests";
import { Prisma } from "@prisma/client";
import { test, describe, beforeAll, afterAll, expect } from "vitest";

describe("Progress", function () {
	const prisma = new PrismaService();

	// plan of study being instantiated here
	const planService = new PoSService(prisma);
	const planRes = new PlanOfStudyResolver(planService);

	// program being instantiated here
	const programService = new ProgramService(prisma);
	const program = new ProgramResolver(programService);

	// progress being instantiated here
	const progressService = new ProgressService(prisma);
	const resolver = new ProgressResolver(progressService, planRes, program);

	let dummyProgress: Progress;
	const dummyUserID = "63dabf67020a625cc55f64ff";

	const planToDelete: Array<string> = [];
	const moduleToDelete: Array<string> = [];
	const enrollmentToDelete: Array<string> = [];
	const progressToDelete: Array<string> = [];

	let plan: PlanOfStudy;
	let enrollment: Prisma.ModuleEnrollmentGetPayload<{
		include: typeof programService.moduleEnrollmentInclude;
	}>;
	let module: Prisma.ModuleGetPayload<{
		include: typeof programService.moduleInclude;
	}>;

	beforeAll(async () => {
		const data = await initializeTest({
			dummyUserID,
			planRes,
			program
		});
		plan = data.plan;
		planToDelete.push(plan.id);
		enrollment = data.enrollment;
		enrollmentToDelete.push(enrollment.id);
		module = data.module;
		moduleToDelete.push(module.id);
	});
	afterAll(async () => {
		//delete created documents
		//currently using native prisma delete, might need to be changed to delete services
		for (const id of progressToDelete) {
			await resolver.deleteProgress(id);
		}
		for (const id of enrollmentToDelete) {
			await program.deleteModuleEnrollment(id);
		}
		for (const id of planToDelete) {
			await planRes.deletePlan(id);
		}
		for (const id of moduleToDelete) {
			await program.delete(id);
		}
	});
	describe("Create", function () {
		test("should create document", async function () {
			const res = await resolver.createProgress(
				{
					enrollmentID: enrollment.id
				},
				enrollment.id
			);
			if (res instanceof Error) throw new Error("Progress not created");
			expect(res).toBeInstanceOf(Object);

			//clean up
			progressToDelete.push(res.id);
			planToDelete.push(plan.id);
			moduleToDelete.push(module.id);
			enrollmentToDelete.push(enrollment.id);
		});
		test("should fail to create a document", async function () {
			const res = await resolver.createProgress(
				{
					enrollmentID: enrollment.id
				},
				shuffle(enrollment.id)
			);
			expect(res).toBeInstanceOf(Error);
		});
	});
	describe("Read", function () {
		test("should return an array of progress documents with no args", async () => {
			const result = await resolver.progress({});
			expect(result).toBeInstanceOf(Array);
			if (result) dummyProgress = result[0];
		});
		test("should return a single progress document as an array of one", async () => {
			const result = await resolver.progress({ id: dummyProgress.id });
			if (result instanceof Error) throw new Error("Progress not found");
			else {
				expect(result).toBeInstanceOf(Array);
				expect(result.length).toBe(1);
			}
		});
		test("should thrown an error if ID was not found", async () => {
			const result = await resolver.progress({ id: shuffle(dummyProgress.id) });
			expect(result).toBeInstanceOf(Error);
		});
		test("should return an empty array if no results are found", async function () {
			const result = await resolver.progress({ status: 0, completed: true });
			expect(result).toBeInstanceOf(Array);
		});
	});
	describe("Update", function () {
		test("should not let status be more than 100", async function () {
			const result = await resolver.updateProgress(
				1000,
				dummyProgress.id,
				undefined
			);
			expect(result).toBeInstanceOf(Error);
		});
		test("should not let status be less than 0", async function () {
			const result = await resolver.updateProgress(
				-100,
				dummyProgress.id,
				undefined
			);
			expect(result).toBeInstanceOf(Error);
		});
		test("should set completed to true if status is set to 100", async function () {
			const result = await resolver.updateProgress(
				100,
				dummyProgress.id,
				undefined
			);
			if (result instanceof Error) throw new Error("Progress not updated");
			expect(result.completed).toBe(true);
		});
		test("should set completed to false if status is set to less than 100", async function () {
			const result = await resolver.updateProgress(
				50,
				dummyProgress.id,
				undefined
			);
			if (result instanceof Error) throw new Error("Progress not updated");
			expect(result.completed).toBe(false);
		});
		test("should return an error if document ID are not found", async function () {
			const result = await resolver.updateProgress(
				100,
				shuffle(dummyProgress.id),
				undefined
			);
			expect(result).toBeInstanceOf(Error);
		});
		test("should return an error if enrollment ID are not found", async function () {
			const result = await resolver.updateProgress(
				100,
				undefined,
				shuffle(dummyProgress.enrollment.id)
			);
			expect(result).toBeInstanceOf(Error);
		});
	});
	describe("Delete", function () {
		test("should delete document", async function () {
			const res = await resolver.deleteProgress(dummyProgress.id);
			expect(res).toBe(true);
		});
		test("should fail to delete a document", async function () {
			const res = await resolver.deleteProgress(shuffle(dummyProgress.id));
			expect(res).toBeInstanceOf(Error);
		});
	});
});

const initializeTest = async ({ dummyUserID, planRes, program }) => {
	const plan = await createPlan(planRes, { userID: dummyUserID });
	if (plan instanceof Error) throw new Error("Plan not created");

	const module = await createModule(program, {
		moduleName: "Test",
		moduleNumber: 1,
		description: "This is a module created from a test case",
		duration: 1,
		intro: "This should not be seen by anyone",
		keywords: ["test", "module"],
		numSlides: 1
	});
	if (module instanceof Error) throw new Error("Module not created");

	const enrollment = await createEnrollment(program, {
		module: module.id,
		plan: plan.id,
		status: EnrollmentStatus.INACTIVE,
		role: UserRole.STUDENT
	});
	if (enrollment instanceof Error) throw new Error("Enrollment not created");

	return { plan, module, enrollment };
};
