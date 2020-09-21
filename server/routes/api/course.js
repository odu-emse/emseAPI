import express from "express";
const course = express.Router();
import Course from "../../models/Course";

course.get("/", (req, res, next) => {
  Course.find()
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

course.get("/:courseNumber", (req, res, next) => {
  if (req.params.courseNumber.length > 3) {
    next();
  }
  const courseNum = req.params.courseNumber;
  Course.find({
     courseNumber: courseNum
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

course.get("/:id", (req, res, next) => {
  const identifier = req.params.id;
  Course.findById(identifier)
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

export default course;
