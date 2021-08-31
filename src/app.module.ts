import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { PoSModule } from "./pos/pos.module";
import { GraphQLModule } from "@nestjs/graphql";
import { FooResolver } from "./app.resolver";
import { UserService } from "./user/user.service";
import { UserResolver } from "./user/user.resolver";
import { PoSService } from "./pos/pos.service";
import { PlanOfStudyResolver } from "./pos/pos.resolver";
require("dotenv").config();

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: "schema.gql",
			debug: true,
			playground: true,
		}),
		MongooseModule.forRoot(process.env.MongoURI || "", {
			useNewUrlParser: true,
		}),
		UserModule,
		PoSModule,
	],
	controllers: [AppController],
	providers: [AppService, FooResolver],
})
export class AppModule {}
