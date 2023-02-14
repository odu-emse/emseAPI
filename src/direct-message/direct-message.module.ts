import { Module } from "@nestjs/common";
import { DirectMessageService } from "./direct-message.service";
import { DirectMessageResolver } from "./direct-message.resolver";
import { PrismaService } from "@/prisma.service";
import { PubSubService } from "@/pub-sub/pub-sub.service";
import { RedisModule } from "@/pub-sub/redis.module";

@Module({
	imports: [RedisModule],
	providers: [
		DirectMessageService,
		DirectMessageResolver,
		PrismaService,
		PubSubService
	]
})
export class DirectMessageModule {}
