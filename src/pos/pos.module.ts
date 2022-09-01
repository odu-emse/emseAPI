import { PrismaService } from "../prisma.service";
import { PlanOfStudyResolver } from "./pos.resolver";
import { Module } from "@nestjs/common";
import { PoSService } from "./pos.service";

@Module({
	providers: [PoSService, PlanOfStudyResolver, PrismaService],

})
export class PoSModule {}
