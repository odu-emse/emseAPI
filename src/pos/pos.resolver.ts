import {
	Resolver,
	Query,
	ResolveField,
	Parent,
	Args,
	Mutation,
} from "@nestjs/graphql";
import { UserService } from "../user/user.service";
import { User } from "../user/user.schema";
import {
	PlanOfStudy,
	CreatePlanOfStudyInput,
	FindPlanOfStudyInput,
} from "./pos.schema";
import { PoSService } from "./pos.service";

@Resolver(() => PlanOfStudy)
export class PlanOfStudyResolver {
	constructor(
		private planService: PoSService,
		private userService: UserService
	) {}

	@Query(() => [PlanOfStudy]) // <-- what will the query return?
	async plans /* <-- Query name */() {
		return this.planService.findMany(); // Resolve the query
	}

	@Query(() => PlanOfStudy)
	async plan(@Args("input") { student }: FindPlanOfStudyInput) {
		return this.planService.findById(student);
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
