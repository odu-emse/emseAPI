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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const graphql_1 = require("../gql/graphql");
const bcryptjs_1 = require("bcryptjs");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async users() {
        return this.prisma.user.findMany({});
    }
    async user(id) {
        const user = this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async registerUser(data) {
        const { id, email, firstName, lastName, middleName, prefix, password, passwordConf, } = data;
        const safeEmail = email.toLowerCase();
        const get = await this.prisma.user.findUnique({
            where: {
                email: safeEmail,
            },
        });
        if (password !== passwordConf) {
            throw new Error("Passwords provided are not matching...");
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
        const hashedPasswordConf = hashedPassword;
        const payload = {
            id,
            email: safeEmail,
            firstName,
            lastName,
            middleName,
            prefix,
            password: hashedPassword,
            passwordConf: hashedPasswordConf,
        };
        if (get === null) {
            const res = await this.prisma.user.create({
                data: payload,
            });
            return res;
        }
        return new Error("User has an account already.");
    }
    async updateUser(params) {
        const { id, email, firstName, lastName, middleName, prefix, password, passwordConf, } = params;
        return this.prisma.user.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (email && { email })), (firstName && { firstName })), (lastName && { lastName })), (middleName && { middleName })), (prefix && { prefix })), (password && { password })), (passwordConf && { passwordConf })),
        });
    }
    async deleteUser(id) {
        const res = await this.user(id).then((data) => {
            return data;
        });
        if (res === null) {
            return new Error(`The user with ${id}, does not exist`);
        }
        return this.prisma.user.delete({
            where: {
                id,
            }
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map