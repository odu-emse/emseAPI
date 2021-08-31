import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, ID, InputType, Int } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { User } from "../user/user.schema";

export type PoSDocument = PlanOfStudy & mongoose.Document;

@Schema()
@ObjectType()
export class PlanOfStudy {
	@Field(() => ID)
	_id!: string;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	})
	@Field(() => User)
	student!: User;

	// @Field(() => Module)
	// @Prop({ required: true })
	// modules?: Module

	// @Field(() => Grade)
	// @Prop({ required: true })
	// grades?: Grade

	// @Field(() => Degree)
	// @Prop({ required: true })
	// degree?: Degree

	// @Field(() => User)
	// @Prop({ required: true })
	// adviser?: User
}

export const PoSSchema = SchemaFactory.createForClass(PlanOfStudy);

PoSSchema.index({ author: 1 });

@InputType()
export class CreatePlanOfStudyInput {
	@Field(() => ID)
	student!: string;
}

@InputType()
export class FindPlanOfStudyInput {
	@Field(() => ID)
	student!: string;
}
