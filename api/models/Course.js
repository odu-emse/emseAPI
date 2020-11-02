import mongoose from "mongoose";

const Course = new mongoose.Schema({
	courseName: {
		type: String,
		trim: true,
		default: "",
	},
	courseNumber: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
		default: "",
	},
	difficulty: {
		type: Number,
		default: 0,
	},
	containingModules: [
		//contains the _id for each module that's covered by this course
	],
	keywords: [String],
});

export default mongoose.model("Course", Course);
