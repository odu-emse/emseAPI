import { ProgressService, ProgressResolver } from "@/progress";
import { PlanOfStudyResolver, PoSService } from "@/pos";
import { ProgramResolver, ProgramService } from "@/program";
import { Progress } from "@/types/graphql";
import { PrismaService } from "@/prisma.service";
import { shuffle } from "../../utils/tests";

describe("Progress", function () {
	let resolver: ProgressResolver;
	let prisma: PrismaService;
	let planRes: PlanOfStudyResolver;
	let progressService: ProgressService;
	let program: ProgramResolver;
	let planService: PoSService;
	let dummyProgress: Progress;
	let programService: ProgramService;

	beforeAll(async () => {
		prisma = new PrismaService();
		progressService = new ProgressService(prisma);
		planService = new PoSService(prisma);
		planRes = new PlanOfStudyResolver(planService);
		programService = new ProgramService(prisma);
		program = new ProgramResolver(programService);
		resolver = new ProgressResolver(progressService, planRes, program);
	});
	afterAll(async () => {
		//delete created documents
	});
	describe("Create", function () {});
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
