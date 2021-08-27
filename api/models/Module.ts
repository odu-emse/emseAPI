import { getModelForClass, prop } from "@typegoose/typegoose";
import { Ref } from "../graphql/types";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Assignment } from "./Assignment";
import { Instructor } from "./Instructor";

@ObjectType({ description: "The Module model" })
export class Module {
	@Field(() => ID)
	id?: string;

	@Field()
	@prop({ required: true })
	moduleNumber!: number;

	@Field()
	@prop({ required: true })
	moduleName!: string;

	@Field()
	@prop()
	objective?: string;

	@Field()
	@prop({ default: 0 })
	duration?: number;

	@Field()
	@prop({ required: true })
	intro?: string;

	@Field()
	@prop({ default: 0 })
	numSlides?: number;

	@Field(() => Instructor)
	@prop()
	instructor?: Ref<Instructor>;

	@Field(type => [Int])
	@prop()
	rating!: [number];

	@Field(type => [String])
	@prop()
	keywords?: [string];

	@Field()
	@prop()
	hasAssignment?: boolean;

	@Field(() => Assignment)
	@prop()
	assignments?: Ref<Assignment>[];

	@Field()
	@prop()
	enrolled?: number;
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
