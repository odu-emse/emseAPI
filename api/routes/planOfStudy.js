import express from 'express'
const pos = express.Router()
import PlanOfStudy from "../models/PlanOfStudy";
import User from "../models/User";

pos.post('/', (req, res, next) => {
	const data = req.body
	console.log(data);
	PlanOfStudy.findOne({student : data.student})
		.then(student=> {
			if(student){
				res.status(400).json({
					error: "This student already has a plan. Please sign in."
				})
			}
			else{
				const newPlan = new PlanOfStudy({
					courses: data.courses,
					certificates: data.certificates,
					degrees: data.degrees,
					student: data.student
				})
				newPlan.save()
				res.status(400).json({
					conf: 'success',
				})
			}
		})
})

pos.get('/:id', (req, res, next) => {
	const studentId = req.params.id
	PlanOfStudy.findOne({student: studentId})
		.then(student=> {
			if(!student){
				res.status(400).json({
					error: "Cannot find student with this ID. Please check, and try again."
				})
			}
			else{
				res.status(200).json({
					data: student
				})
			}
		})
})

export default pos