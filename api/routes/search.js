import express from "express";
const search = express.Router();
import Module from "../models/Module";
import Course from "../models/Course";
import stringSimilarity from "string-similarity";

search.post("/", async (req, res, next) => {
	const query = req.body.query;
	const { selection } = req.query;

	let courses;
	let modules;

	//creating a regex to check if string contains any numbers
	let numberCheck = new RegExp(/^\d+$/);

	//checks if query sting includes a number or not
	if (numberCheck.test(query)) {
		//find all the course documents and module documents
		const rawCourses = await Course.find();
		const rawModules = await Module.find();

		//init empty array to hold all of our stringified course numbers and module numbers
		let stringCourseNumbers = [];
		let stringModuleNumbers = [];

		rawCourses.map(course => {
			//stringify course numbers
			let stringNum = course.courseNumber.toString();
			//add string course numbers into array
			stringCourseNumbers.push(stringNum);
		});
		//console.log(stringCourseNumbers);

		rawModules.map(module => {
			//stringify course numbers
			let stringNum = module.moduleNumber.toString();
			//add string course numbers into array
			stringModuleNumbers.push(stringNum);
		});

		let combinedArray = stringCourseNumbers.concat(stringModuleNumbers);

		const compare = stringSimilarity.findBestMatch(
			query.toString(),
			combinedArray
		);

		console.log({ query, compare });

		courses = await Course.find({ courseNumber: compare.bestMatch.target });
		modules = await Module.find({ moduleNumber: compare.bestMatch.target });
	}
	//run query for courses and modules based on the string that the user passed in
	else {
		if (selection === "instructor") {
			modules = await Module.find({
				instructor: {
					$regex: new RegExp(query, "i"),
				},
			});
		} else if (selection === "key") {
			courses = await Course.find({
				keywords: {
					$regex: new RegExp(query, "i"),
				},
			});
			modules = await Module.find({
				keywords: {
					$regex: new RegExp(query, "i"),
				},
			});
		} else {
			courses = await Course.find({
				courseName: {
					$regex: new RegExp(query, "i"),
				},
			});
			modules = await Module.find({
				moduleName: {
					$regex: new RegExp(query, "i"),
				},
			});
		}
	}

	//check if either courses or modules returned any values from db
	if (courses || modules) {
		let data;
		//see if both courses and modules returned values from db
		if (modules && courses) {
			let combined = modules.concat(courses);
			data = combined;
		} else if (courses) {
			data = courses;
		} else if (modules) {
			data = modules;
		}
		return res.json({ data });
	} else {
		//adding empty array to prevent front end from breaking due to array mapping
		return res.status(400).json({
			error: "No results found with the provided parameters",
			data: [],
		});
	}
});

export default search;
