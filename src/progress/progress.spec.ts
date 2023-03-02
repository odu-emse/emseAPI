import { ProgressResolver, ProgressService } from "@/progress";
import { PlanOfStudyResolver, PoSService } from "@/pos";
import { ProgramResolver, ProgramService } from "@/program";
import { PrismaService } from "@/prisma.service";
import { Progress } from "@prisma/client";
import { test, describe, afterAll, expect } from "vitest";
import {
	createRandomModule,
	createRandomModuleEnrollment,
	createRandomPlanOfStudy,
	createRandomProgress,
	createRandomUser,
	shuffle
} from "../../utils";

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

	const progressToDelete: Array<string> = [];

	const [user, plan, module, enrollment] = initializeTest();

	afterAll(async () => {
		//delete created documents
		//currently using native prisma delete, might need to be changed to delete services
		for (const id of progressToDelete) {
			await resolver.deleteProgress(id);
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
			if (result) dummyProgress = createRandomProgress(enrollment.id, true);
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
				shuffle(enrollment.id)
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

	describe("Waive module progress", function () {
		test("should waive a user's module and set it to completed", async function () {
			const result = await resolver.waiveModule({
				enrollmentID: enrollment.id
			})
			if(result instanceof Error) throw new Error('Progress not waived.')
			else {
				expect(result?.completed).toBe(true)
				expect(result?.status).toBe(100)
			}
		})
	})
});

const initializeTest = () => {
	const usr = createRandomUser();
	const plan = createRandomPlanOfStudy(usr.id);
	const module = createRandomModule();
	const enrollment = createRandomModuleEnrollment(module.id, plan.id);

	return [usr, plan, module, enrollment];
};
