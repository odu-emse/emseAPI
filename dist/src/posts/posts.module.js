"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const posts_resolver_1 = require("./posts.resolver");
const posts_service_1 = require("./posts.service");
const prisma_service_1 = require("../prisma.service");
let PostModule = class PostModule {
};
PostModule = __decorate([
    common_1.Module({
        providers: [posts_resolver_1.PostResolvers, posts_service_1.PostService, prisma_service_1.PrismaService],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=posts.module.js.map