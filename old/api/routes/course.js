import express from "express";
const course = express.Router();
import Course from "../models/Course";

course.get("/", (req, res, next) => {
	Course.find()
		.then(data => {
			if (!data) {
				return res.status(404).end;
			} else {
				res.status(200).json({
					conf: "success",
					data: data,
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
});

course.get("/:id", (req, res, next) => {
	const { id } = req.params;
	Course.findById(id)
		.then(data => {
			if (!data) {
				return res.status(404).end;
			} else {
				res.status(200).json({
					conf: "success",
					data: data,
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
});

course.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	const { module } = req.query;
	const course = await Course.findById(id);
	course.updateOne(
		{
			$push: {
				containingModules: module,
			},
		},
		(err, data) => {
			if (err) {
				res.status(400).json({ error: err });
			} else {
				res.status(200).end();
			}
		}
	);
});

export default course;
