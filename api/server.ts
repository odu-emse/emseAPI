import Express from "express";
import "reflect-metadata";
import { database } from "./config/db";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import cors from "cors";
import { PlanOfStudyResolver } from "./graphql/resolvers/PlanOfStudyResolver";

(async () => {
	const app = Express();

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	try {
		await database();

		const apolloServer = new ApolloServer({
			schema: await buildSchema({
				resolvers: [UserResolver, PlanOfStudyResolver],
				emitSchemaFile: true,
			}),
			context: ({ req, res }) => ({ req, res }),
		});
		apolloServer.applyMiddleware({ app, cors: false });
	} catch (error) {
		throw new Error(error);
	}

	app.listen(process.env.PORT, () =>
		console.log(`🕵️‍♂️ Listening on port ${process.env.PORT}...`)
	);
})();
