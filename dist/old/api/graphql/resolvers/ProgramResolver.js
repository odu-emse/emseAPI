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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramResolver = exports.SearchResultUnion = void 0;
//package imports
var type_graphql_1 = require("type-graphql");
var Course_1 = require("../../models/Course");
// custom imports
var Module_1 = require("../../models/Module");
exports.SearchResultUnion = type_graphql_1.createUnionType({
    name: "ProgramSearchResult",
    types: function () { return [Module_1.Module, Course_1.Course]; },
    // resolveType: async value => {
    // 	console.log(value);
    // 	if ("moduleName" in value) {
    // 		const modules = await ModuleModel.find({
    // 			moduleName: { $regex: `/${value.moduleName}/i` },
    // 		});
    // 		return Module; // we can return object type class (the one with `@ObjectType()`)
    // 	}
    // 	if ("courseName" in value) {
    // 		return "Course"; // or the schema name of the type as a string
    // 	}
    // 	return undefined;
    // },
});
var ProgramResolver = /** @class */ (function () {
    function ProgramResolver() {
    }
    ProgramResolver.prototype.getModules = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Module_1.ModuleModel.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProgramResolver.prototype.getCourses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Course_1.CourseModel.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProgramResolver.prototype.getModuleByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Module_1.ModuleModel.findById({ _id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProgramResolver.prototype.getModuleByTitle = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Module_1.ModuleModel.find({ moduleName: title })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProgramResolver.prototype.searchProgram = function (title, number, instructor, rating) {
        return __awaiter(this, void 0, void 0, function () {
            var modules, courses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Module_1.Module.find()];
                    case 1:
                        modules = _a.sent();
                        return [4 /*yield*/, Course_1.CourseModel.find()];
                    case 2:
                        courses = _a.sent();
                        return [2 /*return*/, __spreadArray(__spreadArray([], modules), courses)];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Query(function (_returns) { return [Module_1.Module]; }, { nullable: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ProgramResolver.prototype, "getModules", null);
    __decorate([
        type_graphql_1.Query(function (_returns) { return [Course_1.Course]; }, { nullable: false }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ProgramResolver.prototype, "getCourses", null);
    __decorate([
        type_graphql_1.Query(function (_returns) { return Module_1.Module; }, { nullable: true }),
        __param(0, type_graphql_1.Arg("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], ProgramResolver.prototype, "getModuleByID", null);
    __decorate([
        type_graphql_1.Query(function (_returns) { return Module_1.Module; }, { nullable: true }),
        __param(0, type_graphql_1.Arg("title")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], ProgramResolver.prototype, "getModuleByTitle", null);
    __decorate([
        type_graphql_1.Query(function (_returns) { return [exports.SearchResultUnion]; }, { nullable: true }),
        __param(0, type_graphql_1.Arg("title")),
        __param(1, type_graphql_1.Arg("number", { nullable: true })),
        __param(2, type_graphql_1.Arg("instructor", { nullable: true })),
        __param(3, type_graphql_1.Arg("rating", { nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number, String, Number]),
        __metadata("design:returntype", Promise)
    ], ProgramResolver.prototype, "searchProgram", null);
    ProgramResolver = __decorate([
        type_graphql_1.Resolver()
    ], ProgramResolver);
    return ProgramResolver;
}());
exports.ProgramResolver = ProgramResolver;
