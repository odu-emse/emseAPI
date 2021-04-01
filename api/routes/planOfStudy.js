import express from "express";
const pos = express.Router();
import PlanOfStudy from "../models/PlanOfStudy";
import Module from "../models/Module";

pos.post("/", (req, res, next) => {
	const data = req.body;
	PlanOfStudy.findOne({ student: data.student }).then(student => {
		if (student) {
			res.status(400).json({
				error: "This student already has a plan. Please sign in.",
			});
		} else {
			const newPlan = new PlanOfStudy({
				modules: data.modules,
				student: data.student,
				grades: data.grades,
			});
			newPlan
				.save()
				.then(result => {
					res.status(200).json({
						conf: "success",
					});
				})
				.catch(err => {
					res.status(400).json({
						error:
							"We encountered a problem while processing your request. Please try again.",
					});
				});
		}
	});
});

pos.get("/:id", (req, res, next) => {
	const studentId = req.params.id;
	PlanOfStudy.findOne({ student: studentId }).then(student => {
		if (!student) {
			res.status(400).json({
				error:
					"Cannot find student with this ID. Please check, and try again.",
			});
		} else {
			res.status(200).json({
				data: student,
			});
		}
	});
});

pos.put("/:id", async (req, res, next) => {
	const studentId = req.params.id;
	const data = req.body;
	const addedModules = [];
	try {
		const mod = await Module.findById(data.id);
		const plan = await PlanOfStudy.findOne({ student: studentId });

		if (!plan) {
			res.status(400).json({
				error:
					"Cannot find student with this ID. Please check, and try again.",
			});
		} else if (!mod) {
			res.status(400).json({
				error:
					"Cannot find lesson with this ID. Please check, and try again.",
			});
		} else {
			plan.modules.map(async lesson => {
				let id = lesson.identifier.toString();
				addedModules.push(id);
			});

			if (
				!addedModules.includes(data.id) ||
				!mod.enrolled.includes(studentId)
			) {
				await PlanOfStudy.updateOne(
					{ student: studentId },
					{
						$push: {
							modules: {
								identifier: data.id,
							},
						},
					}
				);
				await mod.updateOne({
					$push: {
						enrolled: studentId,
					},
				});
				const updated = await PlanOfStudy.findOne({
					student: studentId,
				});
				const updatedModule = await Module.findOne({
					student: studentId,
				});
				res.status(200).json({
					data: updated,
					module: updatedModule,
				});
			} else {
				res.status(400).json({
					error:
						"You are trying to add a lesson that is already part of the student's Plan of Study.",
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error:
				"We encountered a problem while processing your request. Please try again.",
		});
	}
});

pos.delete("/:id", (req, res, next) => {
	const studentId = req.params.id;
	const data = req.body;
	PlanOfStudy.findOne({ student: studentId })
		.then(async student => {
			if (!student) {
				res.status(400).json({
					error:
						"Cannot find student with this ID. Please check, and try again.",
				});
			} else {
				const addedModules = [];
				student.modules.map(async lesson => {
					let id = lesson.identifier.toString();
					addedModules.push(id);
				});
				if (addedModules.includes(data.id)) {
					await PlanOfStudy.updateOne(
						{ student: studentId },
						{
							$pull: {
								modules: {
									identifier: data.id,
								},
							},
						}
					);
					const updated = await PlanOfStudy.findOne({
						student: studentId,
					});
					res.status(200).json({
						data: updated,
					});
				} else {
					res.status(400).json({
						error:
							"You are trying to remove a lesson that is not part of the student's Plan of Study.",
					});
				}
			}
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({
				error:
					"We encountered a problem while processing your request. Please try again.",
			});
		});
});

export default pos;
