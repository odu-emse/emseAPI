import mongoose from "mongoose";

const Module = new mongoose.Schema({
	moduleNumber: {
		type: Number,
		required: true,
	},
	moduleName: {
		type: String,
		trim: true,
		required: true,
	},
	objective: {
		type: String,
		trim: true,
		required: true,
	},
	duration: {
		type: Number,
		default: 0,
	},
	intro: {
		type: String,
		trim: true,
	},
	numSlides: {
		type: Number,
		trim: true,
		default: 0,
	},
	instructor: {
		type: String,
		trim: true,
		default: "",
	},
	rating: [Number],
	keywords: [String],
	hasAssignment: {
		type: Boolean,
		default: false,
	},
	assignments: [
		{
			type: mongoose.SchemaTypes.ObjectId,
		},
	],
	enrolled: [
		{
			type: mongoose.SchemaTypes.ObjectId,
		},
	],
});

export default mongoose.model("Module", Module);
