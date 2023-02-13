import { Module } from "@nestjs/common";
import { DirectMessageService } from "./direct-message.service";
import { DirectMessageResolver } from "./direct-message.resolver";
import { PrismaService } from "@/prisma.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "DM_SERVICE",
				transport: Transport.REDIS
			}
		])
	],
	providers: [DirectMessageService, DirectMessageResolver, PrismaService]
})
export class DirectMessageModule {}
