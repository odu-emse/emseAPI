import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";
import sourceMapSupport from "source-map-support";

async function bootstrap() {
	const app = await NestFactory.create(
		AppModule, 
		{ 
			cors: {
				origin: "http://localhost:3000",
				credentials: true
			},
			logger: ["error", "warn"]
		}
	);

	sourceMapSupport.install();

	//app.enableCors();
	app.use(cookieParser());
	await app.listen(process.env.PORT!, () =>
		console.log(`🕵️‍ Listening on port ${process.env.PORT || 3000}...`)
	);

	Sentry.init({
		dsn:
			"https://d7d1b5e63fd145218bf3971031bae0cd@o1009779.ingest.sentry.io/5974128",

		tracesSampleRate: 1.0
	});
}
bootstrap();
