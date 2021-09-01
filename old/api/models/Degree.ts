import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Degree {
	@Field()
	@prop()
	name!: string;
}

export const DegreeModel = getModelForClass(Degree);
