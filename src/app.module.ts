import moment, { MomentInput } from "moment";
import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PoSModule } from "@/pos";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ProgramModule } from "@/program";
import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";
import { AuthModule } from "./auth/auth.module";
import type { Moment } from "moment";
import { CommunityModule } from "./community/community.module";
import { DirectMessageModule } from "@/direct-message/direct-message.module";
import { ProgressModule } from "@/progress";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { QuizModule } from "@/quiz/quiz.module";
import { AppResolver } from "@/app.resolver";

@Scalar("Date")
export class DateScalar implements CustomScalar<string, Moment> {
	description = "Date custom scalar type";

	parseValue(value: MomentInput | unknown): Moment {
		if (value instanceof Date) return moment(value); // value from the client
		return moment(null);
	}

	//What we are sending to the client
	serialize(value: MomentInput | unknown): string {
		if (value instanceof Date)
			return moment(value).format("MM/DD/YYYY HH:mm:ss");
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

const playgroundConfig =
	process.env.USE_APOLLO === "TRUE"
		? {
				playground: false,
				plugins: [ApolloServerPluginLandingPageLocalDefault()]
		  }
		: {
				playground: true
		  };

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			cors: {
				credentials: true,
				origin: [
					"https://studio.apollographql.com",
					"http://localhost:3000",
					"http://localhost:6006"
				]
			},
			...playgroundConfig,
			typePaths: ["./**/*.graphql"],
			driver: ApolloDriver,
			introspection: true,
			subscriptions: {
				"graphql-ws": true,
				"subscriptions-transport-ws": false
			},
			context: ({ req, res }) => ({ req, res })
		}),
		UserModule,
		PoSModule,
		ProgramModule,
		AuthModule,
		CommunityModule,
		ProgressModule,
		DirectMessageModule,
		QuizModule
	],
	controllers: [],
	providers: [DateScalar, AppResolver]
})
export class AppModule {}
