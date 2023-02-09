import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";
import sourceMapSupport from "source-map-support";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: ["http://localhost:3000", "http://localhost:6006"],
			credentials: true
		},
		logger: ["error", "warn", "debug", "verbose", "log"]
	});

	sourceMapSupport.install();

	//app.enableCors();
	app.use(cookieParser());

	await Sentry.init({
		dsn: "https://d7d1b5e63fd145218bf3971031bae0cd@o1009779.ingest.sentry.io/5974128",
		tracesSampleRate: 1.0,
		integrations: [new Sentry.Integrations.Http({ tracing: true })],
		release: "emseAPI@" + process.env.npm_package_version,
		environment: process.env.NODE_ENV
	});

	app.use(Sentry.Handlers.requestHandler());
	app.use(
		Sentry.Handlers.errorHandler({
			shouldHandleError(error) {
				// Capture all 404 and 500 errors
				return error.status === 404 || error.status === 500;
			}
		})
	);

	await app.listen(process.env.PORT!, async () => {
		console.log(
			`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
		);
		console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}`);
	});
}
bootstrap();
