import { PoSService } from "./../pos/pos.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {  JwtModule } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PlanOfStudyResolver } from "../pos/pos.resolver";
import { PrismaService } from "../prisma.service";

@Module({
	imports:[JwtModule.register({ secret: 'hard!to-guess_secret' })],
	providers: [UserService, UserResolver, PrismaService],
})
export class UserModule {}
