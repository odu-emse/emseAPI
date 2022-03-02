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
exports.UserVerifyModel = exports.UserVerify = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var type_graphql_1 = require("type-graphql");
var time = new Date();
var UserVerify = /** @class */ (function () {
    function UserVerify() {
    }
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], UserVerify.prototype, "token", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ default: time.getTime() }),
        __metadata("design:type", Number)
    ], UserVerify.prototype, "dateSent", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ default: false }),
        __metadata("design:type", Boolean)
    ], UserVerify.prototype, "used", void 0);
    UserVerify = __decorate([
        type_graphql_1.ObjectType({ description: "The User Verify model" })
    ], UserVerify);
    return UserVerify;
}());
exports.UserVerify = UserVerify;
exports.UserVerifyModel = typegoose_1.getModelForClass(UserVerify);
// import * as mongoose from "mongoose";
// const now = new Date();
// const UserVerify = new mongoose.Schema({
// 	token: {
// 		type: String,
// 		trim: true,
// 		required: true,
// 	},
// 	dateSent: {
// 		type: Date,
// 		default: Date.now,
// 	},
// 	used: {
// 		type: Boolean,
// 		default: false,
// 	},
// });
// export default mongoose.model("UserVerify", UserVerify);
