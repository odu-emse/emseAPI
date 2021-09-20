import { PoSService } from "./../pos/pos.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PlanOfStudyResolver } from "../pos/pos.resolver";
import { PrismaService } from "../prisma.service";

@Module({
	providers: [UserService, UserResolver, PrismaService],
})
export class UserModule {}
