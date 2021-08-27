import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../graphql/types";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Module } from "./Module";
import { Degree } from "./Degree";
import { Grade } from "./Grade";

@ObjectType()
export class PlanOfStudy {
	@Field(() => ID)
	id?: string;

	@Field(() => User)
	student!: string;

	@Field(() => Module)
	@prop({ required: true })
	modules?: Ref<Module>[];

	@Field(() => Grade)
	@prop({ required: true })
	grades?: Ref<Grade>[];

	@Field(() => Degree)
	@prop({ required: true })
	degree?: Ref<Degree>;

	@Field(() => User)
	@prop({ required: true })
	adviser?: Ref<User>;
}

export const PlanOfStudyModel = getModelForClass(PlanOfStudy);

// let ObjectId = mongoose.Schema.ObjectId;

// const PlanOfStudy = new mongoose.Schema({
// 	student: {
// 		required: true,
// 		type: ObjectId,
// 	},
// 	modules: [
// 		{
// 			identifier: {
// 				type: ObjectId,
// 				required: true,
// 			},
// 			progress: {
// 				type: Number,
// 				default: 0,
// 			},
// 		},
// 	],
// 	grades: [
// 		{
// 			assignment: {
// 				trim: true,
// 				type: ObjectId,
// 			},
// 			grade: {
// 				trim: true,
// 				type: Number,
// 			},
// 		},
// 	],
// 	degree: {
// 		type: ObjectId,
// 	},
// 	adviser: {
// 		type: ObjectId,
// 	},
// });

// export default mongoose.model("PlanOfStudy", PlanOfStudy);
