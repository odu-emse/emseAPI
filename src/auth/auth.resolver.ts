import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { PlanInput } from "gql/graphql";
import { AuthGuard } from "../auth.guard";
import { AuthService } from "./auth.service";
import { GraphQLExecutionContext } from "@nestjs/graphql";

@Resolver("Auth")
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}
    @Mutation("login")
    //@UseGuards(AuthGuard('google'))
    async login(@Args("code") code: String) {
        // Init the users login flow
        const response = await this.authService.fetchToken(code)
        if (!response.ok) {
            throw new Error("Error " + response.status + ": " + response.statusText);
        }

        //Update the user data here
        const data = await response.json();
        return await this.authService.updateUserData(data.id_token);
    }
}
