import mongoose from "mongoose";

let ObjectId = mongoose.Schema.ObjectId;

const PlanOfStudy = new mongoose.Schema({
	student: {
		required: true,
		type: ObjectId,
	},
	modules: [
		{
			identifier: {
				type: ObjectId,
				required: true,
			},
			progress: {
				type: Number,
				default: 0,
			},
		},
	],
	grades: [
		{
			assignment: {
				trim: true,
				type: ObjectId,
			},
			grade: {
				trim: true,
				type: Number,
			},
		},
	],
	degree: {
		type: ObjectId,
	},
	adviser: {
		type: ObjectId,
	},
});

export default mongoose.model("PlanOfStudy", PlanOfStudy);
