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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchToken(code) {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:3000/auth/redirect',
                access_type: 'offline',
                code
            })
        });
        return response;
    }
    async updateUserData(id_token) {
        const d1 = id_token.indexOf('.');
        const d2 = id_token.indexOf('.', d1 + 1);
        const JWTpayload = id_token.substring(d1 + 1, d2);
        const data = JSON.parse(atob(JWTpayload));
        const count = await this.prisma.user.count({
            where: {
                openID: data.sub
            }
        });
        if (count == 0) {
            console.log("First time user");
            const payload = {
                openID: data.sub,
                email: data.email,
                picURL: data.picture,
                firstName: data.given_name,
                lastName: data.family_name
            };
            return this.registerUser(payload);
        }
        else {
            return this.prisma.user.update({
                where: {
                    openID: data.sub
                },
                data: {
                    openID: data.sub,
                    email: data.email,
                    picURL: data.picture,
                    firstName: data.given_name,
                    lastName: data.family_name
                }
            });
        }
    }
    async registerUser(data) {
        const { openID, email, picURL, firstName, lastName, } = data;
        const safeEmail = email.toLowerCase();
        const count = await this.prisma.user.count({
            where: {
                email: safeEmail
            }
        });
        const payload = {
            openID,
            email: safeEmail,
            picURL,
            firstName,
            lastName,
        };
        if (count === 0) {
            return await this.prisma.user.create({
                data: payload
            });
        }
        else {
            return new Error("User has an account already.");
        }
    }
    async refreshToken(token) {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token
            })
        });
        return response;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map