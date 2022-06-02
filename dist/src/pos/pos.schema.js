"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanOfStudyInput = exports.PoSSchema = exports.PlanOfStudy = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
const mongoose = __importStar(require("mongoose"));
const user_schema_1 = require("../user/user.schema");
let PlanOfStudy = class PlanOfStudy {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], PlanOfStudy.prototype, "_id", void 0);
__decorate([
    mongoose_1.Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }),
    graphql_1.Field(() => user_schema_1.User),
    __metadata("design:type", Object)
], PlanOfStudy.prototype, "student", void 0);
PlanOfStudy = __decorate([
    mongoose_1.Schema(),
    graphql_1.ObjectType()
], PlanOfStudy);
exports.PlanOfStudy = PlanOfStudy;
exports.PoSSchema = mongoose_1.SchemaFactory.createForClass(PlanOfStudy);
exports.PoSSchema.index({ author: 1 });
let PlanOfStudyInput = class PlanOfStudyInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], PlanOfStudyInput.prototype, "student", void 0);
PlanOfStudyInput = __decorate([
    graphql_1.InputType()
], PlanOfStudyInput);
exports.PlanOfStudyInput = PlanOfStudyInput;
//# sourceMappingURL=pos.schema.js.map