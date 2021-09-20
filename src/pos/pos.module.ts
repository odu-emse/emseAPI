import { PlanOfStudyResolver } from "./pos.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { PoSService } from "./pos.service";
import { UserService } from "../user/user.service";

@Module({
	providers: [PoSService, UserService, PlanOfStudyResolver],
})
export class PoSModule {}
