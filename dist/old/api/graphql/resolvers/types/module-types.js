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
exports.ModuleInput = void 0;
var type_graphql_1 = require("type-graphql");
var mongodb_1 = require("mongodb");
var ModuleInput = /** @class */ (function () {
    function ModuleInput() {
    }
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ModuleInput.prototype, "moduleNumber", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], ModuleInput.prototype, "moduleName", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], ModuleInput.prototype, "objectives", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ModuleInput.prototype, "duration", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], ModuleInput.prototype, "intro", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ModuleInput.prototype, "numSlides", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", mongodb_1.ObjectId)
    ], ModuleInput.prototype, "instructor", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Array)
    ], ModuleInput.prototype, "rating", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Array)
    ], ModuleInput.prototype, "keywords", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], ModuleInput.prototype, "hasAssignment", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Array)
    ], ModuleInput.prototype, "assignments", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Array)
    ], ModuleInput.prototype, "enrolled", void 0);
    ModuleInput = __decorate([
        type_graphql_1.InputType()
    ], ModuleInput);
    return ModuleInput;
}());
exports.ModuleInput = ModuleInput;
