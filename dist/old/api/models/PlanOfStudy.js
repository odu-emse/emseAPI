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
exports.PlanOfStudyModel = exports.PlanOfStudy = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Module_1 = require("./Module");
const Degree_1 = require("./Degree");
const Grade_1 = require("./Grade");
let PlanOfStudy = class PlanOfStudy {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], PlanOfStudy.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Object)
], PlanOfStudy.prototype, "student", void 0);
__decorate([
    type_graphql_1.Field(() => Module_1.Module),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Array)
], PlanOfStudy.prototype, "modules", void 0);
__decorate([
    type_graphql_1.Field(() => Grade_1.Grade),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Array)
], PlanOfStudy.prototype, "grades", void 0);
__decorate([
    type_graphql_1.Field(() => Degree_1.Degree),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Object)
], PlanOfStudy.prototype, "degree", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Object)
], PlanOfStudy.prototype, "adviser", void 0);
PlanOfStudy = __decorate([
    type_graphql_1.ObjectType()
], PlanOfStudy);
exports.PlanOfStudy = PlanOfStudy;
exports.PlanOfStudyModel = typegoose_1.getModelForClass(PlanOfStudy);
//# sourceMappingURL=PlanOfStudy.js.map