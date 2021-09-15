import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";
const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
	typePaths: ["./src/*/schema.graphql"],
	path: join(process.cwd(), "src/gql/graphql.ts"),
	outputAs: "class",
});
