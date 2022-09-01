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
exports.CreateUserInput = exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
let User = class User {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    graphql_1.Field(),
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    graphql_1.Field(),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    graphql_1.Field(),
    mongoose_1.Prop(),
    __metadata("design:type", String)
], User.prototype, "prefix", void 0);
__decorate([
    graphql_1.Field(),
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "passwordConf", void 0);
User = __decorate([
    mongoose_1.Schema(),
    graphql_1.ObjectType()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
let CreateUserInput = class CreateUserInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "firstName", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "lastName", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "middleName", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "prefix", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "passwordConf", void 0);
CreateUserInput = __decorate([
    graphql_1.InputType()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
//# sourceMappingURL=user.schema.js.map