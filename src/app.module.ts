import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { PoSModule } from "./pos/pos.module";
import { GraphQLModule } from "@nestjs/graphql";
import { UserService } from "./user/user.service";
import { UserResolver } from "./user/user.resolver";
import { PoSService } from "./pos/pos.service";
import { PlanOfStudyResolver } from "./pos/pos.resolver";
import { ProgramService } from "./program/program.service";
import { ProgramModule } from "./program/program.module";
require("dotenv").config();

@Module({
	imports: [
		GraphQLModule.forRoot({
			debug: true,
			//playground: true,
			typePaths: ["./**/*.graphql"],
		}),
		MongooseModule.forRoot(process.env.DATABASE_URL || "", {
			useNewUrlParser: true,
		}),
		UserModule,
		PoSModule,
		ProgramModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
