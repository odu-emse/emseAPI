import { PoSService } from "./../pos/pos.service";
import { User, UserSchema } from "./user.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlanOfStudy, PoSSchema } from "../pos/pos.schema";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PlanOfStudyResolver } from "../pos/pos.resolver";
import { PrismaService } from "../prisma.service";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	providers: [UserService, UserResolver, PrismaService],
})
export class UserModule {}
