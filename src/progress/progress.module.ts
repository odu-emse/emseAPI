import { Module } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { PrismaService } from "@/prisma.service";
import { PoSModule } from "@/pos";
import { ProgramModule } from "@/program/program.module";
import { ProgressResolver } from "@/progress/progress.resolver";

@Module({
	imports: [PoSModule, ProgramModule],
	providers: [ProgressService, PrismaService, ProgressResolver]
})
export class ProgressModule {}
