import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { PlanInput } from "gql/graphql";
import { PoSService } from "./pos.service";

@Resolver()
export class PlanOfStudyResolver {
	constructor(private readonly planService: PoSService) {}

	@Query("plans")
	async plans() {
		const res = await this.planService.plans();
		return res;
	}

	@Query("plan")
	async plan(@Args("studentID") studentID: string) {
		return this.planService.studentPlan(studentID);
	}

	@Query("planByID")
	async planByID(@Args("id") arg: string) {
		return this.planService.plan(arg);
	}

	@Mutation("addPlan")
	async addPlan(@Args("input") args: PlanInput) {
		return this.planService.addPlan(args);
	}

	@Mutation("updatePlan")
	async updatePlan(@Args("id") id: string, @Args("input") input: PlanInput) {
		return this.planService.updatePlan(id, input);
	}

	@Mutation("deletePlan")
	async deletePlan(@Args("id") id: string) {
		return this.planService.deletePlan(id);
	}
}
