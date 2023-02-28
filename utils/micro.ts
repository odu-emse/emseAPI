import { MicroserviceOptions } from "@nestjs/microservices";
import { NestFactoryStatic } from "@nestjs/core/nest-factory";

export const startMicroservice = async (
	app: NestFactoryStatic,
	module,
	options?: MicroserviceOptions
) => {
	const service = await app.createMicroservice(module, options);
	await service.listen();
};
