import mongoose from "mongoose";

const Instructor = new mongoose.Schema({
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
	title: {
		type: String,
	},
	officeLocation: {
		type: String,
	},
	officeHours: {
		type: Number,
	},
	phone: {
		type: Number,
	},
	contactPolicy: {
		type: String,
	},
	background: {
		type: String,
		trim: true,
	},
	researchInterest: {
		type: String,
		trim: true,
	},
	selectedPapersAndPublications: [
		{
			name: { type: String, trim: true },
			url: { type: String, trim: true },
		},
	],
	personalWebsite: {
		type: String,
		trim: true,
	},
	philosophy: {
		type: String,
		trim: true,
	},
	modules: [
		{
			type: mongoose.SchemaTypes.ObjectId,
		},
	],
	active: {
		type: Boolean,
		default: false,
	},
	group: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Instructor", Instructor);
