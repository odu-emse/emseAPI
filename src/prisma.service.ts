import {
	INestApplication,
	Injectable,
	Logger,
	OnModuleInit
} from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
	extends PrismaClient<
		Prisma.PrismaClientOptions,
		"query" | "error" | "info" | "warn"
	>
	implements OnModuleInit
{
	private readonly logger = new Logger(PrismaService.name);
	constructor() {
		super({
			log: [
				{
					emit: "event",
					level: "query"
				},
				{
					emit: "event",
					level: "error"
				},
				{
					emit: "event",
					level: "info"
				},
				{
					emit: "event",
					level: "warn"
				}
			],
			errorFormat: "pretty"
		});
	}

	async onModuleInit() {
		process.env.NODE_ENV === "development" &&
			this.$on("query", (e) => {
				let cleanedQuery = JSON.stringify(e.query);
				this.logger.log(JSON.parse(cleanedQuery));
			});
		this.$on("error", (e) => {
			this.logger.error(e);
		});
		this.$on("info", (e) => {
			this.logger.log(e);
		});
		this.$on("warn", (e) => {
			this.logger.warn(e);
		});
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on("beforeExit", async () => {
			await app.close();
		});
	}
}
