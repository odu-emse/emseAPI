//package imports
import { Resolver, Mutation, Arg, Query } from "type-graphql";

// custom imports
import { PlanOfStudyModel, PlanOfStudy } from "../../models/PlanOfStudy";

@Resolver()
export class PlanOfStudyResolver {
	@Query(_returns => PlanOfStudy, { nullable: true })
	async getPlan(@Arg("studentID") id: string) {
		return await PlanOfStudyModel.findOne({ student: id });
	}

	@Query(_returns => [PlanOfStudy], { nullable: false })
	async getPlans(): Promise<PlanOfStudy[]> {
		const plans = await PlanOfStudyModel.find();
		return plans;
	}
}
