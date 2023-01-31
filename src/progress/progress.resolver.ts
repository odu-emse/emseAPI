import { Resolver } from "@nestjs/graphql";
import { ProgressService } from "@/progress/progress.service";
import { PlanOfStudyResolver } from "@/pos";
import { ProgramResolver } from "@/program/program.resolver";

@Resolver()
export class ProgressResolver {
	constructor(
		private readonly progressService: ProgressService,
		private readonly plan: PlanOfStudyResolver,
		private readonly program: ProgramResolver
	) {}
}
