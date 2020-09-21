import express from "express";
const modules = express.Router();
import Module from "../../models/Module";
import aws from "aws-sdk";
import passport from "passport";

let awsFetch = () => {
  try {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.awsAccessKeyID,
      secretAccessKey: process.env.awsSecretAccessKey,
      region: "us-east-1"
    });

    const s3 = new aws.S3();
    const response = s3.listObjectsV2({
      Bucket: process.env.awsBucket
    });

    //console.log(response);
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

//Dev debug removed auth middleware
modules.get("/", (req, res, next) => {
  Module.find()
    .then(data => {
      if (!data) {
        return res.status(404).end;
      } else {
        res.status(200).json({
          conf: "success",
          data: data
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

modules.get("/:moduleId", (req, res, next) => {
  if (req.params.moduleId.length < 3) {
    next();
  }
  const id = req.params.moduleId;
  Module.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).end;
      } else {
        awsFetch();
        res.status(200).json({
          conf: "success",
          data: data
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
    moduleNumber: moduleNum
  })
    .then(data => {
      if (!data) {
        return res.status(404).end;
      } else {
        res.status(200).json({
          conf: "success",
          data: data
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

export default modules;
