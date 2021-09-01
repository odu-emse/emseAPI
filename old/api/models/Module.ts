import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../graphql/types";
import { Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Assignment } from "./Assignment";
import { Instructor } from "./Instructor";

@ObjectType({ description: "The Module model" })
export class Module {
	@Field(() => ID)
	id?: string;

	@Field(() => Int)
	@prop({ required: true })
	moduleNumber!: number;

	@Field()
	@prop({ required: true })
	moduleName!: string;

	@Field(type => String)
	@prop()
	// objective!: string;
	description!: string;

	@Field(type => Int)
	@prop({ default: 0 })
	duration!: number;

	// Not present in DB document so throws error when fetching
	// TODO: Need to insert this new field in all DB documents
	// @Field()
	// @prop({ required: true })
	// intro!: string;

	@Field()
	@prop({ default: 0 })
	numSlides!: number;

	@Field(() => Instructor)
	@prop()
	instructor?: Ref<Instructor>;

	@Field(type => [Float])
	@prop()
	rating!: [number];

	@Field(type => [String])
	@prop()
	keywords!: [string];

	@Field()
	@prop()
	hasAssignment!: boolean;

	@Field(() => Assignment)
	@prop()
	assignments?: Ref<Assignment>[];

	// holds a list of user IDs who are enrolled
	@Field(type => [String])
	@prop()
	enrolled!: [string];
}

export const ModuleModel = getModelForClass(Module);

// const Module = new mongoose.Schema({
// 	moduleNumber: {
// 		type: Number,
// 		required: true,
// 	},
// 	moduleName: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	objective: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	duration: {
// 		type: Number,
// 		default: 0,
// 	},
// 	intro: {
// 		type: String,
// 		trim: true,
// 	},
// 	numSlides: {
// 		type: Number,
// 		trim: true,
// 		default: 0,
// 	},
// 	instructor: {
// 		type: mongoose.SchemaTypes.ObjectId,
// 		required: true,
// 	},
// 	rating: [Number],
// 	keywords: [String],
// 	hasAssignment: {
// 		type: Boolean,
// 		default: false,
// 	},
// 	assignments: [
// 		{
// 			type: mongoose.SchemaTypes.ObjectId,
// 		},
// 	],
// 	enrolled: [
// 		{
// 			type: mongoose.SchemaTypes.ObjectId,
// 		},
// 	],
// });

// export default mongoose.model("Module", Module);
