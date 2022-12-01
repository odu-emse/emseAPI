import moment, {MomentInput} from "moment";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { PoSModule } from "./pos/pos.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ProgramModule } from "./program/program.module";
require("dotenv").config();
import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";
import { AuthModule } from './auth/auth.module';
import type { Moment } from "moment";

@Scalar("Date")
export class DateScalar implements CustomScalar<string, Moment> {
	description = "Date custom scalar type";

	parseValue(value: MomentInput | unknown): Moment {
		if(value instanceof Date) return moment(value); // value from the client
		return moment(null);
	}

	//What we are sending to the client
	serialize(value: MomentInput | unknown): string {
		if(value instanceof Date) return moment(value).format("MM/DD/YYYY");
		return ""
	}

	//What we are receiving from the client
	parseLiteral(ast: ValueNode): Moment {
		if (ast.kind === Kind.STRING) {
			if (moment(ast.value).isValid()) return moment(ast.value);
		}
		return moment(null);
	}
}

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			cors: {
				credentials: true,
				origin: ["http://localhost:3000", "http://localhost:4000"]
			},
			playground: true,
			debug: process.env.NODE_ENV !== "production",
			typePaths: ["./**/*.graphql"],
			driver: ApolloDriver,
			introspection: true,
			context: ({req, res}) => ({req, res})
		}),
		MongooseModule.forRoot(process.env.DATABASE_URL!, {
			useNewUrlParser: true
		}),
		UserModule,
		PoSModule,
		ProgramModule,
		AuthModule,
	],
	controllers: [],
	providers: [DateScalar]
})
export class AppModule {}
