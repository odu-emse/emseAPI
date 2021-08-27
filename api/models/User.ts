import { prop, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "../graphql/types";
import { Field, ID, ObjectType } from "type-graphql";
import { PlanOfStudy } from "./PlanOfStudy";

@ObjectType({ description: "The User model" })
export class User {
	@Field(() => ID)
	id?: string;

	@Field()
	@prop({ required: true })
	firstName!: string;

	@Field()
	@prop({ required: true })
	lastName?: string;

	@Field()
	@prop()
	middleName?: string;

	@Field()
	@prop()
	prefix?: string;

	@Field()
	@prop()
	dob?: string;

	@Field()
	@prop({ required: true })
	email?: string;

	@prop({ required: true })
	password?: string;

	@prop({ required: true })
	passwordConf?: string;

	@Field(() => PlanOfStudy)
	@prop()
	planOfStudy?: Ref<PlanOfStudy>;

	@Field()
	@prop()
	group?: string;

	@Field()
	@prop()
	active?: boolean;
}

export const UserModel = getModelForClass(User);

// const User = new mongoose.Schema({
// 	firstName: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	lastName: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	middleName: {
// 		type: String,
// 		trim: true,
// 	},
// 	prefix: {
// 		type: String,
// 		trim: true,
// 	},
// 	dob: {
// 		type: Date,
// 		default: Date.now(),
// 	},
// 	email: {
// 		type: String,
// 		trim: true,
// 		require: true,
// 		match: [
// 			/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
// 			"Please use valid email address...",
// 		],
// 	},
// 	password: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	passwordConf: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	planOfStudy: {
// 		type: SchemaTypes.ObjectId,
// 	},
// 	active: {
// 		type: Boolean,
// 		default: false,
// 	},
// 	group: {
// 		type: String,
// 		required: true,
// 	},
// });

// export default mongoose.model("User", User);
