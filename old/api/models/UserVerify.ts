import { prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

const time = new Date();

@ObjectType({ description: "The User Verify model" })
export class UserVerify {
	@prop()
	token!: String;

	@Field()
	@prop({ default: time.getTime() })
	dateSent!: Number;

	@Field()
	@prop({ default: false })
	used!: Boolean;
}

export const UserVerifyModel = getModelForClass(UserVerify);

// import * as mongoose from "mongoose";
// const now = new Date();

// const UserVerify = new mongoose.Schema({
// 	token: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	dateSent: {
// 		type: Date,
// 		default: Date.now,
// 	},
// 	used: {
// 		type: Boolean,
// 		default: false,
// 	},
// });

// export default mongoose.model("UserVerify", UserVerify);
