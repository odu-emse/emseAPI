import { User, UserSchema } from "./../user/user.schema";
import { PlanOfStudyResolver } from "./pos.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { PoSService } from "./pos.service";
import { PlanOfStudy, PoSSchema } from "./pos.schema";
import { UserService } from "../user/user.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: PlanOfStudy.name, schema: PoSSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	providers: [PoSService, UserService, PlanOfStudyResolver],
})
export class PoSModule {}
