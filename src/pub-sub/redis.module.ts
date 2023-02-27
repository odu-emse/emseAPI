import { Module } from "@nestjs/common";
import { createClient } from "@redis/client";

@Module({
	providers: [
		{
			provide: "REDIS_OPTIONS",
			useValue: {
				url: "redis://back_end_redis:6379"
			}
		},
		{
			inject: ["REDIS_OPTIONS"],
			provide: "REDIS_CLIENT",
			useFactory: async (options) => {
				console.log(options);
				const client = createClient(options);
				await client.connect();
				console.log("🚀 Connected to Redis");
				return client;
			}
		}
	],
	exports: ["REDIS_CLIENT"]
})
export class RedisModule {}
