"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assignment_1 = require("./Assignment");
var Course_1 = __importDefault(require("./Course"));
var Degree_1 = require("./Degree");
var Instructor_1 = __importDefault(require("./Instructor"));
var Module_1 = require("./Module");
var PlanOfStudy_1 = require("./PlanOfStudy");
var User_1 = require("./User");
var UserVerify_1 = require("./UserVerify");
exports.default = {
    Assignment: Assignment_1.Assignment,
    Course: Course_1.default,
    Degree: Degree_1.Degree,
    Instructor: Instructor_1.default,
    Module: Module_1.Module,
    PlanOfStudy: PlanOfStudy_1.PlanOfStudy,
    User: User_1.User,
    UserVerify: UserVerify_1.UserVerify,
};
