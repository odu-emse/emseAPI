import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../graphql/types";
import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Module } from "./Module";

@ObjectType({ description: "The Course model" })
export class Course {
	@Field(() => ID)
	id?: string;

	@Field()
	@prop({ required: true })
	courseNumber!: number;

	@Field()
	@prop({ required: true })
	courseName!: string;

	@Field(type => String)
	@prop()
	description!: string;

	@Field(type => Int)
	@prop({ default: 0 })
	numberOfModules!: number;

	@Field(() => [Module])
	@prop()
	containingModules?: Ref<Module>[];

	@Field(type => [Float])
	@prop()
	difficulty!: [number];

	@Field(type => [String])
	@prop()
	keywords!: [string];
}

export const CourseModel = getModelForClass(Course);

// import mongoose from "mongoose";

// const Course = new mongoose.Schema({
// 	courseName: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	courseNumber: {
// 		type: Number,
// 		required: true,
// 	},
// 	description: {
// 		type: String,
// 		default: "",
// 	},
// 	modules: [
// 		//contains the _id for each module that's covered by this course
// 		{
// 			type: mongoose.SchemaTypes.ObjectId,
// 		},
// 	],
// 	keywords: [String],
// });

// export default mongoose.model("Course", Course);
