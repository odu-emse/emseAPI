import { GraphQLExecutionContext } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(code: String): Promise<any>;
    refresh(context: GraphQLExecutionContext, token: String): Promise<any>;
}
