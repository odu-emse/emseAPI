import moment from "moment";
import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PoSModule } from "./pos/pos.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ProgramModule } from "./program/program.module";
require("dotenv").config();
import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import type { Moment } from "moment";
import { CommunityModule } from './community/community.module';

@Scalar("Date")
export class DateScalar implements CustomScalar<string, Moment> {
	description = "Date custom scalar type";

	parseValue(value: Moment | unknown): Moment {
		//@ts-ignore
		return moment(value).format("MM/DD/YYYY"); // value from the client
	}

	//What we are sending to the client
	serialize(value: Moment | unknown): string {
		return moment(value!).format("MM/DD/YYYY"); // value sent to the client
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
		UserModule,
		PoSModule,
		ProgramModule,
		AuthModule,
		CommunityModule,
	],
	controllers: [],
	providers: [DateScalar]
})
export class AppModule {}
