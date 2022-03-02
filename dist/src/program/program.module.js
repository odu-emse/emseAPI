"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramModule = void 0;
const prisma_service_1 = require("./../prisma.service");
const common_1 = require("@nestjs/common");
const program_resolver_1 = require("./program.resolver");
const program_service_1 = require("./program.service");
let ProgramModule = class ProgramModule {
};
ProgramModule = __decorate([
    (0, common_1.Module)({
        providers: [program_resolver_1.ProgramResolver, prisma_service_1.PrismaService, program_service_1.ProgramService],
    })
], ProgramModule);
exports.ProgramModule = ProgramModule;
//# sourceMappingURL=program.module.js.map