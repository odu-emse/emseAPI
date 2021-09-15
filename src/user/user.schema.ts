import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, ID, InputType, Int } from "@nestjs/graphql";
import * as mongoose from "mongoose";
import { PlanOfStudy } from "../pos/pos.schema";

export type UserDocument = User & mongoose.Document;

@Schema()
@ObjectType()
export class User {
	@Field(() => ID)
	@Prop()
	id!: string;

	@Field()
	@Prop({ required: true })
	firstName!: string;

	@Field()
	@Prop({ required: true })
	lastName?: string;

	@Field()
	@Prop()
	middleName?: string;

	@Field()
	@Prop()
	prefix?: string;

	@Field()
	@Prop({ required: true })
	email?: string;

	@Prop({ required: true })
	password?: string;

	@Prop({ required: true })
	passwordConf?: string;

	// @Field(() => PlanOfStudy)
	// @Prop({
	// 	required: true,
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "PlanOfStudy",
	// })
	// planOfStudy?: PlanOfStudy;

	// @Field()
	// @Prop()
	// group?: string;

	// @Field()
	// @Prop({ default: false })
	// active?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

@InputType()
export class CreateUserInput {
	@Field()
	firstName!: string;

	@Field()
	lastName!: string;

	@Field()
	middleName!: string;

	@Field()
	prefix!: string;

	// @Field()
	// dob?: Date;

	@Field()
	email!: string;

	@Field()
	password!: string;

	@Field()
	passwordConf!: string;
}
