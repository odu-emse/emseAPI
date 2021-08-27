import { InputType } from "type-graphql";
import { PlanOfStudy } from "../../../models/PlanOfStudy";
import { ObjectId } from "mongodb";

@InputType()
export class PlanOfStudyInput implements Partial<PlanOfStudy> {
	student?: string;
	modules?: [ObjectId];
	grades?: [ObjectId];
	degree?: ObjectId;
	adviser?: ObjectId;
}
