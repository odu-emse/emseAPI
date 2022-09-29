import { Resolver, Query, Args, Context, GraphQLExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver("Auth")
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}
    @Query("login")
    async login(@Context() context: GraphQLExecutionContext, @Args("code") code: String) {
        const response = await this.authService.fetchToken(code)
        if (!response.ok) {
            throw new Error("Error " + response.status + ": " + response.statusText);
        }
        
        const data = await response.json();
        console.log(data)
        return data.id_token
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
