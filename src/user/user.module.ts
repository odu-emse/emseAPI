import { PoSService } from "./../pos/pos.service";
import { User, UserSchema } from "./user.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlanOfStudy, PoSSchema } from "../pos/pos.schema";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PlanOfStudyResolver } from "../pos/pos.resolver";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: PlanOfStudy.name, schema: PoSSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	providers: [UserService, PoSService, UserResolver, PlanOfStudyResolver],
})
export class UserModule {}
