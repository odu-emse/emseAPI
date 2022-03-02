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
exports.PoSService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PoSService = class PoSService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMany() {
        const plans = await this.prisma.planOfStudy.findMany();
        return plans;
    }
    async findByPlanId(id) {
        const res = await this.prisma.planOfStudy.findUnique({
            where: {
                id,
            },
        });
        return res;
    }
    async findByStudentID(studentID) {
        const res = await this.prisma.planOfStudy.findFirst({
            where: {
                studentID,
            },
        });
        return res;
    }
};
PoSService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PoSService);
exports.PoSService = PoSService;
//# sourceMappingURL=pos.service.js.map