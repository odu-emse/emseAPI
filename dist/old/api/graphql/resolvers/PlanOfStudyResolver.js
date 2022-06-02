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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanOfStudyResolver = void 0;
const type_graphql_1 = require("type-graphql");
const PlanOfStudy_1 = require("../../models/PlanOfStudy");
let PlanOfStudyResolver = class PlanOfStudyResolver {
    async getPlan(id) {
        return await PlanOfStudy_1.PlanOfStudyModel.findOne({ student: id });
    }
    async getPlans() {
        const plans = await PlanOfStudy_1.PlanOfStudyModel.find();
        return plans;
    }
};
__decorate([
    type_graphql_1.Query(_returns => PlanOfStudy_1.PlanOfStudy, { nullable: true }),
    __param(0, type_graphql_1.Arg("studentID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanOfStudyResolver.prototype, "getPlan", null);
__decorate([
    type_graphql_1.Query(_returns => [PlanOfStudy_1.PlanOfStudy], { nullable: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanOfStudyResolver.prototype, "getPlans", null);
PlanOfStudyResolver = __decorate([
    type_graphql_1.Resolver()
], PlanOfStudyResolver);
exports.PlanOfStudyResolver = PlanOfStudyResolver;
//# sourceMappingURL=PlanOfStudyResolver.js.map