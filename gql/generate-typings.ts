import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";
const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
	typePaths: ["./src/*/schema.graphql"],
	path: join(process.cwd(), "gql/graphql.ts"),
	watch: process.env.WATCH === "true",
});
