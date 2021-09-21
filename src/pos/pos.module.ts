import { PlanOfStudyResolver } from "./pos.resolver";
import { Module } from "@nestjs/common";
import { PoSService } from "./pos.service";

@Module({
	providers: [PoSService, PlanOfStudyResolver],
})
export class PoSModule {}
