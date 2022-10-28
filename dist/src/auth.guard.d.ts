import { CanActivate } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';
export declare class AuthGuard implements CanActivate {
    canActivate(context: GraphQLExecutionContext): Promise<boolean>;
}
