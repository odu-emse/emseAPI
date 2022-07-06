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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("../gql/graphql");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async users() {
        try {
            const res = await this.userService.users();
            return res;
        }
        catch (error) {
            if (error)
                throw new Error("An error occurred while trying to execute your query");
        }
    }
    async user(args) {
        try {
            const res = await this.userService.user(args);
            return res;
        }
        catch (error) {
            if (error)
                throw new Error("An error occurred while trying to execute your query");
        }
    }
    async createUser(args) {
        const res = await this.userService.registerUser(args);
        return res;
    }
    async update(args) {
        return this.userService.updateUser(args);
    }
    async delete(args) {
        return this.userService.deleteUser(args);
    }
};
__decorate([
    (0, graphql_1.Query)("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.Query)("user"),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Mutation)("createUser"),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_2.NewUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)("updateUser"),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_2.UpdateUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)("deleteUser"),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "delete", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)("User"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map