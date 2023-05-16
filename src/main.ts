import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";
import sourceMapSupport from "source-map-support";
import { PrismaService } from "@/prisma.service";

async function bootstrap() {
	const app = await NestFactory;
	const client = await app.create(AppModule, {
		cors: {
			origin: [
				"http://localhost:3000",
				"http://localhost:4000",
				"http://localhost:6006",
				"https://studio.apollographql.com"
			],
			credentials: true
		},
		logger: ["error", "warn", "debug", "verbose", "log"]
	});

	sourceMapSupport.install();

	client.use(cookieParser());

	await Sentry.init({
		dsn: "https://d7d1b5e63fd145218bf3971031bae0cd@o1009779.ingest.sentry.io/5974128",
		tracesSampleRate: 1.0,
		integrations: [new Sentry.Integrations.Http({ tracing: true })],
		release: "emseAPI@" + process.env.npm_package_version,
		environment: process.env.NODE_ENV
	});

	client.use(Sentry.Handlers.requestHandler());
	client.use(
		Sentry.Handlers.errorHandler({
			shouldHandleError(error) {
				// Capture all 404 and 500 errors
				return error.status === 404 || error.status === 500;
			}
		})
	);

	const prismaService = client.get(PrismaService);
	await prismaService.enableShutdownHooks(client);
	await client.listen(process.env.PORT!, async () => {
		console.log(
			`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
		);
	});
}
bootstrap().catch((err) => console.error(err));
