import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context, GraphQLExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Resolver("Auth")
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}
    @Query("login")
    //@UseGuards(AuthGuard('google'))
    async login(@Context() context: GraphQLExecutionContext, @Args("code") code: String) {
        // Init the users login flow
        const response = await this.authService.fetchToken(code)
        if (!response.ok) {
            throw new Error("Error " + response.status + ": " + response.statusText);
        }

        /*Check here for an existing user.
            if one exists let the client know so it can update the user,
            if not then let the 
        */
        const data = await response.json();
        return data.id_token
    }
}
