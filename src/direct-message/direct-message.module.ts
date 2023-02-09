import { Module } from "@nestjs/common";
import { DirectMessageService } from "./direct-message.service";
import { DirectMessageResolver } from "./direct-message.resolver";
import { PrismaService } from "@/prisma.service";

@Module({
	providers: [DirectMessageService, DirectMessageResolver, PrismaService]
})
export class DirectMessageModule {}
