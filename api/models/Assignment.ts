import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Assignment {
	@Field()
	@prop()
	name!: string;
}

export const AssignmentModel = getModelForClass(Assignment);
