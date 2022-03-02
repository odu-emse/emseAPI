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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
//package imports
var bcryptjs_1 = require("bcryptjs");
var type_graphql_1 = require("type-graphql");
var mail_1 = require("@sendgrid/mail");
// custom imports
var UserVerify_1 = require("../../models/UserVerify");
var User_1 = require("../../models/User");
var auth_1 = require("../auth");
var LoginResponse = /** @class */ (function () {
    function LoginResponse() {
    }
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LoginResponse.prototype, "accessToken", void 0);
    LoginResponse = __decorate([
        type_graphql_1.ObjectType()
    ], LoginResponse);
    return LoginResponse;
}());
var UserResolver = /** @class */ (function () {
    function UserResolver() {
    }
    UserResolver.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.UserModel.findById({ _id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.UserModel.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.login = function (email, password, _a) {
        var res = _a.res;
        return __awaiter(this, void 0, void 0, function () {
            var account, valid, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, User_1.UserModel.findOne({ email: email })];
                    case 1:
                        account = _b.sent();
                        if (!account) {
                            throw new Error("User not found");
                        }
                        return [4 /*yield*/, bcryptjs_1.compare(password, account.password)];
                    case 2:
                        valid = _b.sent();
                        if (!valid) {
                            throw new Error("Bad password");
                        }
                        res.cookie("refreshToken", auth_1.createRefreshToken(account), {
                            httpOnly: true,
                        });
                        return [2 /*return*/, {
                                accessToken: auth_1.createAccessToken(account),
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new Error(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserResolver.prototype.register = function (fName, lName, group, email, password, passwordConf) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, hashed, user, res, token, verify, create, msg, mailAPI, mail, error_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, User_1.UserModel.findOne({
                                email: email,
                            })];
                    case 1:
                        existing = _a.sent();
                        if (!(existing !== null)) return [3 /*break*/, 2];
                        return [2 /*return*/, false];
                    case 2:
                        if (!(password == passwordConf)) return [3 /*break*/, 9];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 8, , 9]);
                        return [4 /*yield*/, bcryptjs_1.hash(password, 10)];
                    case 4:
                        hashed = _a.sent();
                        user = new User_1.UserModel({
                            firstName: fName,
                            lastName: lName,
                            email: email,
                            password: hashed,
                            passwordConf: hashed,
                            group: group,
                            active: false,
                        });
                        return [4 /*yield*/, user.save()];
                    case 5:
                        res = _a.sent();
                        token = res._id;
                        verify = new UserVerify_1.UserVerifyModel({
                            token: token,
                        });
                        return [4 /*yield*/, verify.save()];
                    case 6:
                        create = _a.sent();
                        msg = {
                            to: email,
                            from: "dpapp@odu.edu",
                            subject: "Asynchronous Learning Management Platform Verification",
                            html: "<strong>Thank you for registering on EMSE LMS</strong><br/>localhost:3000/users/userVerify?token=" + token,
                        };
                        mailAPI = process.env.SENDGRID_API_KEY || "";
                        mail_1.setApiKey(mailAPI);
                        return [4 /*yield*/, mail_1.send(msg)];
                    case 7:
                        mail = _a.sent();
                        return [2 /*return*/, true];
                    case 8:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    UserResolver.prototype.verify = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var account, verify, d, sent, now, expires, active, used, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, User_1.UserModel.findById(token)];
                    case 1:
                        account = _a.sent();
                        if (account === null) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, UserVerify_1.UserVerifyModel.findOne({ token: token })];
                    case 2:
                        verify = _a.sent();
                        if (verify === null) {
                            return [2 /*return*/, false];
                        }
                        d = new Date();
                        sent = verify.dateSent;
                        now = d.getTime();
                        expires = now + 30 * 60 * 60 * 15;
                        if (!(now < expires)) return [3 /*break*/, 5];
                        console.log(verify);
                        return [4 /*yield*/, account.updateOne({
                                active: true,
                            })];
                    case 3:
                        active = _a.sent();
                        return [4 /*yield*/, verify.updateOne({
                                used: true,
                            })];
                    case 4:
                        used = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, true];
                    case 6:
                        error_4 = _a.sent();
                        throw new Error(error_4);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Query(function (_returns) { return User_1.User; }, { nullable: false }),
        __param(0, type_graphql_1.Arg("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "getUser", null);
    __decorate([
        type_graphql_1.Query(function (_returns) { return [User_1.User]; }, { nullable: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "getUsers", null);
    __decorate([
        type_graphql_1.Mutation(function () { return LoginResponse; }),
        __param(0, type_graphql_1.Arg("email", function () { return String; })),
        __param(1, type_graphql_1.Arg("password", function () { return String; })),
        __param(2, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Object]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "login", null);
    __decorate([
        type_graphql_1.Mutation(function () { return Boolean; }),
        __param(0, type_graphql_1.Arg("firstName", function () { return String; })),
        __param(1, type_graphql_1.Arg("lastName", function () { return String; })),
        __param(2, type_graphql_1.Arg("group", function () { return String; })),
        __param(3, type_graphql_1.Arg("email", function () { return String; })),
        __param(4, type_graphql_1.Arg("password", function () { return String; })),
        __param(5, type_graphql_1.Arg("passwordConf", function () { return String; })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, String, String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "register", null);
    __decorate([
        type_graphql_1.Mutation(function () { return Boolean; }),
        __param(0, type_graphql_1.Arg("token")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "verify", null);
    UserResolver = __decorate([
        type_graphql_1.Resolver()
    ], UserResolver);
    return UserResolver;
}());
exports.UserResolver = UserResolver;
