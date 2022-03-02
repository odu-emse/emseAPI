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
const graphql_2 = require("../../gql/graphql");
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
    async login(args) {
        try {
            const res = await this.userService.loginUser(args);
            return res;
        }
        catch (error) {
            if (error)
                console.log(error);
            throw new Error("An error occured while trying to executre your query");
        }
    }
    async socials() {
        try {
            const res = await this.userService.socials();
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch Socials");
        }
    }
    async social(id) {
        try {
            const res = await this.userService.social(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not fetch social with id: " + id);
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
    async addSocial(user, input) {
        try {
            const res = await this.userService.addSocial(user, input);
            return res;
        }
        catch (error) {
            throw new Error("Could not add Social");
        }
    }
    async updateSocial(id, input) {
        try {
            const res = await this.userService.updateSocial(id, input);
        }
        catch (error) {
            throw new Error("Could not update Social with document id: " + id);
        }
    }
    async updateUserSocial(user, input) {
        try {
            const res = await this.userService.updateUserSocial(user, input);
            return res;
        }
        catch (error) {
            throw new Error("Could not update social with user id: " + user);
        }
    }
    async deleteSocial(id) {
        try {
            const res = await this.userService.deleteSocial(id);
            return res;
        }
        catch (error) {
            throw new Error("Could not delete social with document id: " + id);
        }
    }
    async deleteUserSocial(user) {
        try {
            const res = await this.userService.deleteUserSocial(user);
            return res;
        }
        catch (error) {
            throw new Error("Could not delete Socail with user id: " + user);
        }
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
    (0, graphql_1.Query)("login"),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_2.LoginUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)("socials"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "socials", null);
__decorate([
    (0, graphql_1.Query)("social"),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "social", null);
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
__decorate([
    (0, graphql_1.Mutation)("addSocial"),
    __param(0, (0, graphql_1.Args)("userId")),
    __param(1, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, graphql_2.SocialInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addSocial", null);
__decorate([
    (0, graphql_1.Mutation)("updateSocial"),
    __param(0, (0, graphql_1.Args)("id")),
    __param(1, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, graphql_2.SocialInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateSocial", null);
__decorate([
    (0, graphql_1.Mutation)("updateUserSocial"),
    __param(0, (0, graphql_1.Args)("userId")),
    __param(1, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, graphql_2.SocialInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUserSocial", null);
__decorate([
    (0, graphql_1.Mutation)("deleteSocial"),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteSocial", null);
__decorate([
    (0, graphql_1.Mutation)("deleteUserSocial"),
    __param(0, (0, graphql_1.Args)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUserSocial", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)("User"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map