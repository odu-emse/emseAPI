import mongoose from 'mongoose'

let ObjectId = mongoose.Schema.ObjectId

const PlanOfStudy = new mongoose.Schema({
	courses:[{
		trim: true,
		type: ObjectId,
		required: true
	}],
	certificates: [{
		default: "",
		type: ObjectId,
	}],
	degrees: [{
		default: "",
		type: ObjectId,
	}],
	student: {
		trim: true,
		type: ObjectId,
		required: true
	}
})

export default mongoose.model("PlanOfStudy", PlanOfStudy)