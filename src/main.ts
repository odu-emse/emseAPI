import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";
import sourceMapSupport from "source-map-support";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: "http://localhost:3000",
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
		integrations: [new Sentry.Integrations.Http({ tracing: true })]
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

	await app.listen(process.env.PORT!, () =>
		console.log(`🕵️‍ Listening on port ${process.env.PORT || 3000}...`)
	);
}
bootstrap();
