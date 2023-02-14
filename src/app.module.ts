import moment, { MomentInput } from "moment";
import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PoSModule } from "@/pos";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ProgramModule } from "./program/program.module";
import { config } from "dotenv";
import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";
import { AuthModule } from "./auth/auth.module";
import type { Moment } from "moment";
import { CommunityModule } from "./community/community.module";
import { DirectMessageModule } from "@/direct-message/direct-message.module";

@Scalar("Date")
export class DateScalar implements CustomScalar<string, Moment> {
	description = "Date custom scalar type";

	parseValue(value: MomentInput | unknown): Moment {
		if (value instanceof Date) return moment(value); // value from the client
		return moment(null);
	}

	//What we are sending to the client
	serialize(value: MomentInput | unknown): string {
		if (value instanceof Date) return moment(value).format("MM/DD/YYYY");
		return "";
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
				origin: ["http://localhost:3000", "http://localhost:6006"]
			},
			playground: true,
			debug: process.env.NODE_ENV !== "production",
			typePaths: ["./**/*.graphql"],
			driver: ApolloDriver,
			introspection: true,
			subscriptions: {
				"graphql-ws": {
					onConnect: (context) => {
						console.log("🚀 Connected to websocket");
						console.log(context);
					}
				},
				"subscriptions-transport-ws": false
			},
			context: ({ req, res }) => ({ req, res })
		}),
		UserModule,
		PoSModule,
		ProgramModule,
		AuthModule,
		CommunityModule,
		DirectMessageModule
	],
	controllers: [],
	providers: [DateScalar]
})
export class AppModule {}
