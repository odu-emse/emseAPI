"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var db_1 = require("./config/db");
var apollo_server_express_1 = require("apollo-server-express");
var type_graphql_1 = require("type-graphql");
var UserResolver_1 = require("./graphql/resolvers/UserResolver");
var cors_1 = __importDefault(require("cors"));
var PlanOfStudyResolver_1 = require("./graphql/resolvers/PlanOfStudyResolver");
var ProgramResolver_1 = require("./graphql/resolvers/ProgramResolver");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, apolloServer, _a, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                app = express_1.default();
                app.use(cors_1.default({
                    origin: "http://localhost:3000",
                    credentials: true,
                }));
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.database()];
            case 2:
                _c.sent();
                _a = apollo_server_express_1.ApolloServer.bind;
                _b = {};
                return [4 /*yield*/, type_graphql_1.buildSchema({
                        resolvers: [UserResolver_1.UserResolver, PlanOfStudyResolver_1.PlanOfStudyResolver, ProgramResolver_1.ProgramResolver],
                        emitSchemaFile: true,
                    })];
            case 3:
                apolloServer = new (_a.apply(apollo_server_express_1.ApolloServer, [void 0, (_b.schema = _c.sent(),
                        _b.context = function (_a) {
                            var req = _a.req, res = _a.res;
                            return ({ req: req, res: res });
                        },
                        _b)]))();
                apolloServer.applyMiddleware({ app: app, cors: false });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                throw new Error(error_1);
            case 5:
                app.listen(process.env.PORT, function () {
                    return console.log("\uD83D\uDD75\uFE0F\u200D\u2642\uFE0F Listening on port " + process.env.PORT + "...");
                });
                return [2 /*return*/];
        }
    });
}); })();
