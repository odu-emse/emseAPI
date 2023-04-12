import { Resolver, Query } from "@nestjs/graphql";
import * as dotenv from "dotenv";

@Resolver("App")
export class AppResolver {
	constructor() {
		dotenv.config();
	}
	@Query("appVersion")
	async appVersion() {
		return process.env.npm_package_version;
	}

	@Query("appInstance")
	async appInstance() {
		return process.env.NODE_ENV;
	}
}
