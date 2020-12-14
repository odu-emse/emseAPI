import express from "express";
const modules = express.Router();
import Module from "../models/Module";
import aws from "aws-sdk";
import passport from "passport";

let awsFetch = moduleID => {
	try {
		const spacesEndpoint = new aws.Endpoint(
			`https://emseportal.nyc3.digitaloceanspaces.com/${moduleID}`
		);
		const s3 = new aws.S3({
			endpoint: spacesEndpoint,
			accessKeyId: process.env.SPACES_KEY,
			secretAccessKey: process.env.SPACES_SECRET,
		});
		return s3.endpoint;
	} catch (e) {
		console.error(e);
	}
};

modules.post("/", (req, res, next) => {
	let newModule = new Module(req.body);
	newModule
		.save()
		.then(module => {
			console.log(`${module} saved to DB`);
			res.status(200).send(`${module} saved to DB`);
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
			console.error(err);
		});
});

modules.get("/", (req, res, next) => {
	Module.find()
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

modules.get("/:moduleId", (req, res, next) => {
	if (req.params.moduleId.length <= 3) {
		next();
	}
	const id = req.params.moduleId;
	Module.findById(id)
		.then(data => {
			if (!data) {
				return res.status(404).end;
			} else {
				res.status(200).json({
					conf: "success",
					data: data,
					cd: awsFetch(data._id),
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
});

modules.get("/:moduleNumber", (req, res, next) => {
	const moduleNum = req.params.moduleNumber;
	Module.find({
		moduleNumber: moduleNum,
	})
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

export default modules;
