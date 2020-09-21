import mongoose from "mongoose";

const Module = new mongoose.Schema({
  parentCourseID: {
    type: String,
    trim: true,
    default: ""
  },
  moduleNumber: {
    type: Number,
    default: 0
  },
  moduleName: {
    type: String,
    trim: true,
    default: ""
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  duration: {
    type: Number,
    default: 0
  },
  remaining: {
    type: Number,
    default: 0
  },
  cdLink: {
    type: String,
    trim: true,
    default: "./"
  },
  numSlides: {
    type: Number,
    trim: true,
    default: 0
  },
  instructor: {
    type: String,
    trim: true,
    default: ""
  },
  done: {
    type: Boolean,
    default: false
  },
  continue: {
    type: Boolean,
    default: false
  },
  rating: [Number],
  keywords: [String],
  hasAssignment: {
    type: Boolean,
    default: false
  },
  assignments: [String],
  hasPreTest: {
    type: Boolean,
    default: false
  },
  preTest: { type: String },
  hasPostTest: {
    type: Boolean,
    default: false
  },
  postTest: { type: String },
  enrolled: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Module", Module);
