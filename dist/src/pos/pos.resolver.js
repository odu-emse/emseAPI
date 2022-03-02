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
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("../user/user.service");
const pos_schema_1 = require("./pos.schema");
const pos_service_1 = require("./pos.service");
let PlanOfStudyResolver = class PlanOfStudyResolver {
    constructor(planService, userService) {
        this.planService = planService;
        this.userService = userService;
    }
    async plan({ student }) {
        const res = await this.planService.findByStudentID(student);
        return res;
    }
};
__decorate([
    graphql_1.Query(() => pos_schema_1.PlanOfStudy),
    __param(0, graphql_1.Args("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_schema_1.PlanOfStudyInput]),
    __metadata("design:returntype", Promise)
], PlanOfStudyResolver.prototype, "plan", null);
PlanOfStudyResolver = __decorate([
    graphql_1.Resolver(() => pos_schema_1.PlanOfStudy),
    __metadata("design:paramtypes", [pos_service_1.PoSService,
        user_service_1.UserService])
], PlanOfStudyResolver);
exports.PlanOfStudyResolver = PlanOfStudyResolver;
//# sourceMappingURL=pos.resolver.js.map