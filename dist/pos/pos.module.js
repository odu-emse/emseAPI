"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoSModule = void 0;
const prisma_service_1 = require("../prisma.service");
const pos_resolver_1 = require("./pos.resolver");
const common_1 = require("@nestjs/common");
const pos_service_1 = require("./pos.service");
let PoSModule = class PoSModule {
};
PoSModule = __decorate([
    (0, common_1.Module)({
        providers: [pos_service_1.PoSService, pos_resolver_1.PlanOfStudyResolver, prisma_service_1.PrismaService],
    })
], PoSModule);
exports.PoSModule = PoSModule;
//# sourceMappingURL=pos.module.js.map