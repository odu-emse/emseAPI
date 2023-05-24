import {
	Resolver,
	Query,
	Args,
	Mutation,
	GraphQLExecutionContext,
	Context
} from "@nestjs/graphql";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation("login")
	//@UseGuards(AuthGuard('google'))
	async login(@Args("code") code: string) {
		// Init the users login flow
		const response = await this.authService.fetchToken(code);
		if (!response.ok) {
			throw new Error("Error " + response.status + ": " + response.statusText);
		}

		//Update the user data here
		const data = await response.json();
		const account = await this.authService.updateUserData(data.id_token);

		if (account instanceof Error) {
			throw new Error("Error " + response.status + ": " + response.statusText);
		} else {
			return data.id_token;
		}
	}

	@Query("refresh")
	async refresh(
		@Context() context: GraphQLExecutionContext,
		@Args("token") token: string
	) {
		const response = await this.authService.refreshToken(token);
		if (!response.ok) {
			throw new Error("Error " + response.status + ": " + response.statusText);
		}

		const data = await response.json();
		console.log(data);
		return data.id_token;
	}
}
