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
exports.UserInput = void 0;
var type_graphql_1 = require("type-graphql");
var class_validator_1 = require("class-validator");
var mongodb_1 = require("mongodb");
var UserInput = /** @class */ (function () {
    function UserInput() {
    }
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.Length(1, 255),
        __metadata("design:type", String)
    ], UserInput.prototype, "firstName", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], UserInput.prototype, "lastName", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], UserInput.prototype, "middleName", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], UserInput.prototype, "prefix", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], UserInput.prototype, "dob", void 0);
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], UserInput.prototype, "email", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", mongodb_1.ObjectId)
    ], UserInput.prototype, "planOfStudy", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], UserInput.prototype, "group", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], UserInput.prototype, "active", void 0);
    UserInput = __decorate([
        type_graphql_1.InputType()
    ], UserInput);
    return UserInput;
}());
exports.UserInput = UserInput;
