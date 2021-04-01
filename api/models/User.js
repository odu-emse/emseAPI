import mongoose from "mongoose";

const User = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		required: true,
	},
	lastName: {
		type: String,
		trim: true,
		required: true,
	},
	middleName: {
		type: String,
		trim: true,
		default: "",
	},
	dob: {
		type: Date,
		default: Date.now(),
	},
	email: {
		type: String,
		trim: true,
		require: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	passwordConf: {
		type: String,
		trim: true,
		required: true,
	},
	planOfStudy: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	active: {
		type: Boolean,
		default: false,
	},
	group: {
		type: String,
		required: true,
	},
});

export default mongoose.model("User", User);
