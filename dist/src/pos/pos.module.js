"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoSModule = void 0;
const user_schema_1 = require("./../user/user.schema");
const PlanOfStudyResolver_1 = require("../../old/api/graphql/resolvers/PlanOfStudyResolver");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const pos_service_1 = require("./pos.service");
const pos_schema_1 = require("./pos.schema");
const user_service_1 = require("../user/user.service");
let PoSModule = class PoSModule {
};
PoSModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: pos_schema_1.PlanOfStudy.name, schema: pos_schema_1.PoSSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [pos_service_1.PoSService, user_service_1.UserService, PlanOfStudyResolver_1.PlanOfStudyResolver],
    })
], PoSModule);
exports.PoSModule = PoSModule;
//# sourceMappingURL=pos.module.js.map