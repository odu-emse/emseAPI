import { ProgressResolver, ProgressService } from "@/progress";
import { PlanOfStudyResolver, PoSService } from "@/pos";
import { ProgramResolver, ProgramService } from "@/program";
import {
	EnrollmentStatus,
	PlanOfStudy,
	Progress,
	UserRole
} from "../../gql/graphql";
import { PrismaService } from "@/prisma.service";
import {
	createEnrollment,
	createModule,
	createPlan,
	shuffle
} from "../../utils/tests";
import { Prisma } from "@prisma/client";

describe("Progress", function () {
	let resolver: ProgressResolver;
	let prisma: PrismaService;
	let planRes: PlanOfStudyResolver;
	let progressService: ProgressService;
	let program: ProgramResolver;
	let planService: PoSService;
	let dummyProgress: Progress;
	let programService: ProgramService;
	let dummyUserID = "63dabf67020a625cc55f64ff";

	const planToDelete: Array<string> = [];
	const moduleToDelete: Array<string> = [];
	const enrollmentToDelete: Array<string> = [];
	const progressToDelete: Array<string> = [];

	let plan: PlanOfStudy;
	let enrollment: Prisma.ModuleEnrollmentGetPayload<{
		include: {
			plan: {
				include: {
					student: true;
				};
			};
			module: true;
			progress: true;
		};
	}>;
	let module: Prisma.ModuleGetPayload<{
		include: {
			members: {
				include: {
					plan: {
						include: {
							student: true;
						};
					};
					progress: true;
				};
			};
			assignments: {
				include: {
					assignmentResults: {
						include: {
							student: {
								include: {
									student: true;
								};
							};
							gradedBy: {
								include: {
									social: true;
									instructorProfile: true;
								};
							};
						};
					};
				};
			};
			feedback: {
				include: {
					student: true;
				};
			};
			parentModules: true;
			subModules: true;
			collections: {
				include: {
					lessons: {
						include: {
							threads: {
								include: {
									author: true;
									comments: true;
									usersWatching: true;
									parentThread: true;
								};
							};
							content: true;
						};
					};
				};
			};
			course: true;
		};
	}>;

	beforeAll(async () => {
		prisma = new PrismaService();

		// plan of study being instantiated here
		planService = new PoSService(prisma);
		planRes = new PlanOfStudyResolver(planService);

		// program being instantiated here
		programService = new ProgramService(prisma);
		program = new ProgramResolver(programService);

		// progress being instantiated here
		progressService = new ProgressService(prisma);
		resolver = new ProgressResolver(progressService, planRes, program);

		const data = await initializeTest({
			dummyUserID,
			planRes,
			program
		});
		plan = data.plan;
		enrollment = data.enrollment;
		module = data.module;
	});
	afterAll(async () => {
		//delete created documents
		//currently using native prisma delete, might need to be changed to delete services
		for (const id of planToDelete) {
			await prisma.planOfStudy.delete({ where: { id } });
		}
		for (const id of moduleToDelete) {
			await prisma.module.delete({ where: { id } });
		}
		for (const id of enrollmentToDelete) {
			await prisma.moduleEnrollment.delete({ where: { id } });
		}
		for (const id of progressToDelete) {
			await prisma.progress.delete({ where: { id } });
		}
	});
	describe("Create", function () {
		it("should create document", async function () {
			const res = await resolver.createProgress(
				{
					enrollment: {
						connect: {
							id: enrollment.id
						}
					}
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
		it("should fail to create a document", async function () {
			const res = await resolver.createProgress(
				{
					enrollment: {
						connect: {
							id: shuffle(enrollment.id)
						}
					}
				},
				shuffle(enrollment.id)
			);
			expect(res).toBeInstanceOf(Error);
		});
	});
	describe("Read", function () {
		it("should return an array of progress documents", async () => {
			const result = await resolver.progress({});
			expect(result).toBeInstanceOf(Array);
			if (result) dummyProgress = result[0];
		});
		it("should thrown an error if ID was not found", async () => {
			const result = await resolver.progress({ id: shuffle(dummyProgress.id) });
			expect(result).toBeInstanceOf(Error);
		});
		it("should return an empty array if no results are found", async function () {
			const result = await resolver.progress({ status: 0, completed: true });
			expect(result).toBeInstanceOf(Array);
		});
	});
	describe("Update", function () {});
	describe("Delete", function () {});
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
