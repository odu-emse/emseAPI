import mongoose from "mongoose";

const Course = new mongoose.Schema({
	courseName: {
		type: String,
		trim: true,
		required: true,
	},
	courseNumber: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	modules: [
		//contains the _id for each module that's covered by this course
		{
			type: mongoose.SchemaTypes.ObjectId,
		},
	],
	keywords: [String],
});

export default mongoose.model("Course", Course);
