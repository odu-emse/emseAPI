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
exports.ModuleModel = exports.Module = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const Assignment_1 = require("./Assignment");
const Instructor_1 = require("./Instructor");
let Module = class Module {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Module.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], Module.prototype, "moduleNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Module.prototype, "moduleName", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Module.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    typegoose_1.prop({ default: 0 }),
    __metadata("design:type", Number)
], Module.prototype, "duration", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ default: 0 }),
    __metadata("design:type", Number)
], Module.prototype, "numSlides", void 0);
__decorate([
    type_graphql_1.Field(() => Instructor_1.Instructor),
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Module.prototype, "instructor", void 0);
__decorate([
    type_graphql_1.Field(type => [type_graphql_1.Float]),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Module.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Module.prototype, "keywords", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Module.prototype, "hasAssignment", void 0);
__decorate([
    type_graphql_1.Field(() => Assignment_1.Assignment),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Module.prototype, "assignments", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Module.prototype, "enrolled", void 0);
Module = __decorate([
    type_graphql_1.ObjectType({ description: "The Module model" })
], Module);
exports.Module = Module;
exports.ModuleModel = typegoose_1.getModelForClass(Module);
//# sourceMappingURL=Module.js.map