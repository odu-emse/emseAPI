import {
	Resolver,
	Query,
	ResolveField,
	Parent,
	Args,
	Mutation,
} from "@nestjs/graphql";
import { PoSService } from "./pos.service";

@Resolver("PlanOfStudy")
export class PlanOfStudyResolver {
	constructor(private readonly planService: PoSService) {}

	@Query("plans")
	async plans() {
		const res = await this.planService.findMany();
		return res;
	}

	@Query("plan")
	async plan(@Args("studentID") studentID: string) {
		return this.planService.findByStudentID(studentID);
	}

	@Query("planByID")
	async planByID(@Args("id") arg: string) {
		return this.planService.findByPlanId(arg);
	}

	// @Mutation(() => PlanOfStudy)
	// async createPlan(@Args("input") plan: CreatePlanOfStudyInput) {
	// 	return this.planService.createPlan(plan);
	// }
}
