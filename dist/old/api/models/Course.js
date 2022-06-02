"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = exports.Course = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var type_graphql_1 = require("type-graphql");
var Module_1 = require("./Module");
var Course = /** @class */ (function () {
    function Course() {
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        __metadata("design:type", String)
    ], Course.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Number)
    ], Course.prototype, "courseNumber", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Course.prototype, "courseName", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return String; }),
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Course.prototype, "description", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; }),
        typegoose_1.prop({ default: 0 }),
        __metadata("design:type", Number)
    ], Course.prototype, "numberOfModules", void 0);
    __decorate([
        type_graphql_1.Field(function () { return [Module_1.Module]; }),
        typegoose_1.prop(),
        __metadata("design:type", Array)
    ], Course.prototype, "containingModules", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return [type_graphql_1.Float]; }),
        typegoose_1.prop(),
        __metadata("design:type", Array)
    ], Course.prototype, "difficulty", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return [String]; }),
        typegoose_1.prop(),
        __metadata("design:type", Array)
    ], Course.prototype, "keywords", void 0);
    Course = __decorate([
        type_graphql_1.ObjectType({ description: "The Course model" })
    ], Course);
    return Course;
}());
exports.Course = Course;
exports.CourseModel = typegoose_1.getModelForClass(Course);
// import mongoose from "mongoose";
// const Course = new mongoose.Schema({
// 	courseName: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	courseNumber: {
// 		type: Number,
// 		required: true,
// 	},
// 	description: {
// 		type: String,
// 		default: "",
// 	},
// 	modules: [
// 		//contains the _id for each module that's covered by this course
// 		{
// 			type: mongoose.SchemaTypes.ObjectId,
// 		},
// 	],
// 	keywords: [String],
// });
// export default mongoose.model("Course", Course);
