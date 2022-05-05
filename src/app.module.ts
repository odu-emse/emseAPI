import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { PoSModule } from "./pos/pos.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ProgramModule } from "./program/program.module";
require("dotenv").config();

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			playground: true,
			debug: process.env.NODE_ENV !== "production",
			typePaths: ["./**/*.graphql"],
			driver: ApolloDriver,
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
