import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.use(cookieParser());

	await app.listen(process.env.PORT || "", () =>
		console.log(`🕵️‍♂️ Listening on port ${process.env.PORT}...`)
	);
}
bootstrap();
