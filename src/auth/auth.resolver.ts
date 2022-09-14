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
        const data = await response.json();
        //@ts-ignore
        context.res.cookie('test', 'value');
        console.log(data)
        return "Done"
    }
}
