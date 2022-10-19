import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation, GraphQLExecutionContext, Context } from "@nestjs/graphql";
import { PlanInput } from "gql/graphql";
import { AuthGuard } from "../auth.guard";
import { AuthService } from "./auth.service";

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

        // This refresh token needs to come back but im not sure how we would return that, included in the results from update user data.

        // const data = await response.json();
        // console.log(data)
        // return {
        //     id_token: data.id_token,
        //     refresh_token: data.refresh_token
        // }
    }

    @Query("refresh")
    async refresh(@Context() context: GraphQLExecutionContext, @Args("token") token: String) {
        const response = await this.authService.refreshToken(token)
        if (!response.ok) {
            throw new Error("Error " + response.status + ": " + response.statusText);
        }
        
        const data = await response.json();
        console.log(data)
        return data.id_token
    }
}
