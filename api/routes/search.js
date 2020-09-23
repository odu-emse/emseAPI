import express from "express";
const search = express.Router();
import Module from "../models/Module";
import Course from "../models/Course";

search.post("/", (req, res, next) => {
	const query = req.body.query;

	Course.find({ courseNumber: query })
		.then(data => {
			if (!data || data.length === 0) {
				return res.status(400).json({
					conf: "failed",
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
