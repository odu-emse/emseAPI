import {PoSService} from "./pos.service";
import {PlanOfStudyResolver} from "./pos.resolver";
import {PrismaService} from "@/prisma.service";
import {PlanOfStudy} from "@/types/graphql";

describe("Plan services", () => {
    let service: PoSService;
    let resolver: PlanOfStudyResolver;
    let prisma: PrismaService;
    prisma = new PrismaService();

    const testingAccountStudentID = "616701c22e17f3fb9f5085f7";
    const testingAccountPlanID = "620e9a07e57bd45e4e3fc88c";

    beforeEach(async () => {
        service = new PoSService(prisma);
        resolver = new PlanOfStudyResolver(service);
    });

    describe("Query.plans()", () => {
        it("should return an array of plans", async () => {
            const plans: PlanOfStudy[] = await resolver.plans();
            expect(plans).toBeDefined();
            expect(plans.length).toBeGreaterThan(0);
            plans.map(plan => {
                expect(plan.id).toBeDefined();
                expect(plan.modules).toBeDefined();
                expect(plan.assignmentResults).toBeDefined();
            })
        });
        it("should not take longer than 1 seconds to return all plans", async () => {
            const start = new Date();
            const plans = await resolver.plans();
            expect(plans.length).toBeGreaterThan(1);
            const end = new Date();
            expect(end.getTime() - start.getTime()).toBeLessThan(1000);
        });
    });

    describe("Query.plan()", () => {
        it("should return a plan", async () => {
            const plan : PlanOfStudy | null = await resolver.plan(testingAccountStudentID);
            expect(plan).toBeDefined();
            if(!plan) return;
            expect(plan.id).toBeDefined();
            expect(plan.student).toBeDefined();
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
