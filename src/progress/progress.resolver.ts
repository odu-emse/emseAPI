import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProgressService } from "@/progress/progress.service";
import { PlanOfStudyResolver } from "@/pos";
import { ProgramResolver } from "@/program/program.resolver";
import { ProgressArgs } from "@/types/graphql";
import { Prisma } from "@prisma/client";

@Resolver()
export class ProgressResolver {
	constructor(
		private readonly progressService: ProgressService,
		private readonly plan: PlanOfStudyResolver,
		private readonly program: ProgramResolver
	) {
		this.progressService = progressService;
		this.plan = plan;
		this.program = program;
	}
	@Query("progress")
	async progress(@Args("args") args: ProgressArgs) {
		const response = await this.progressService.progress(args);
		if (response instanceof Error) return new Error(response.message);
		else return response;
	}

	@Mutation("createProgress")
	async createProgress(
		@Args("input") input: Prisma.ProgressCreateInput,
		@Args("enrollmentID") enrollmentID: string
	) {
		const enrollment = await this.program.moduleEnrollment({
			id: enrollmentID
		});
		console.log({ enrollmentID });
		if (!enrollment || enrollment.length === 0)
			return new Error("Enrollment not found");
		const response = await this.progressService.createProgress(
			input,
			enrollmentID
		);
		if (response instanceof Error) return new Error(response.message);
		else return response;
	}

	@Mutation("waiveModule")
	async waiveModule(@Args("args") args: any) {
		return await this.progressService.waiveModule(args);
	}

	@Mutation("deleteProgress")
	async deleteProgress(@Args("id") id: string) {
		return await this.progressService.deleteProgress(id);
	}
}
