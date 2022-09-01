import { PoSService } from "./pos.service";
import { PlanOfStudyResolver } from "./pos.resolver";
import { PrismaService } from "../prisma.service";

describe("Plan services", () => {
	let service: PoSService;
	let resolver: PlanOfStudyResolver;
	let prisma: PrismaService;
	prisma = new PrismaService();

	const testingAccountStudentID = "621faf87751282e60aa06d11";
	const testingAccountPlanID = "62741bf0b99712afc71c7df3";

	beforeEach(async () => {
		service = new PoSService(prisma);
		resolver = new PlanOfStudyResolver(service);
	});

	describe("Query.plans()", () => {
		it("should return an array of plans", async () => {
			const plans = await resolver.plans();
			expect(plans).toBeDefined();
			expect(plans.length).toBeGreaterThan(0);
			expect(plans[0].id).toBeDefined();
		});
		it("should not take longer than 1.5 seconds to return all plans", async () => {
			const start = new Date();
			const plans = await resolver.plans();
			expect(plans.length).toBeGreaterThan(1);
			const end = new Date();
			expect(end.getTime() - start.getTime()).toBeLessThan(1500);
		});
	});

	describe("Query.plan()", () => {
		it("should return a plan", async () => {
			const plan = await resolver.plan(testingAccountStudentID);
			expect(plan).toBeDefined();
			expect(plan!.id).toBeDefined();
			expect(plan!.studentID).toBeDefined();
		});
		it("should match studentID with query parameter", async () => {
			const plan = await resolver.plan(testingAccountStudentID);
			expect(plan!.studentID === testingAccountStudentID).toBeTruthy();
		});
		it("should match plan ID with query parameter", async () => {
			const plan = await resolver.planByID(testingAccountPlanID);
			expect(plan!.id === testingAccountPlanID).toBeTruthy();
		});
	});
});
