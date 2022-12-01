import { PrismaService } from "../prisma.service";
import { Module } from "@nestjs/common";
import { ProgramResolver } from "./program.resolver";
import { ProgramService } from "./program.service";

@Module({
	providers: [ProgramResolver, PrismaService, ProgramService],
})
export class ProgramModule {}
