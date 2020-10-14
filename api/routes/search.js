import express from "express";
const search = express.Router();
import Module from "../models/Module";
import Course from "../models/Course";

search.post("/", (req, res, next) => {
	const query = req.body.query;

	Course.find({ courseNumber: query })
		.then(data => {
			if (!data) {
				return res.status(400).json({
					conf: "failed",
				});
			} else if (data.length === 0) {
				return res.status(200).json({
					error: "No results found",
					data: [],
				});
			} else {
				res.json({
					data,
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
});

export default search;
