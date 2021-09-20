import {
	Resolver,
	Query,
	ResolveField,
	Parent,
	Args,
	Mutation,
} from "@nestjs/graphql";
import { UserService } from "../user/user.service";
import { PoSService } from "./pos.service";

@Resolver("PlanOfStudy")
export class PlanOfStudyResolver {
	constructor(
		private readonly planService: PoSService,
		private readonly userService: UserService
	) {}

	@Query("plans")
	async plans() {
		const res = this.planService.findMany();
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

	// @ResolveField(() => User)
	// async findUser(@Parent() plan: PlanOfStudy) {
	// 	return this.userService.findById(plan.student);
	// }
}
