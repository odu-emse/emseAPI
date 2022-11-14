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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async login(code) {
        const response = await this.authService.fetchToken(code);
        if (!response.ok) {
            throw new Error("Error " + response.status + ": " + response.statusText);
        }
        const data = await response.json();
        const result = await this.authService.updateUserData(data.id_token);
        return data.id_token;
    }
    async refresh(context, token) {
        const response = await this.authService.refreshToken(token);
        if (!response.ok) {
            throw new Error("Error " + response.status + ": " + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        return data.id_token;
    }
};
__decorate([
    (0, graphql_1.Mutation)("login"),
    __param(0, (0, graphql_1.Args)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)("refresh"),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refresh", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)("Auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map