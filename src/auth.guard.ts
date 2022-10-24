import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GraphQLExecutionContext, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: GraphQLExecutionContext,
  ): Promise<boolean> {

	const ctx = GqlExecutionContext.create(context);
    //@ts-ignore
    const authToken = ctx.getContext().req.headers.authorization;
	const client = new OAuth2Client(process.env.GOOGLE_ID);
	var ticket;
	try{
			ticket = await client.verifyIdToken({
			idToken: authToken,
			audience: process.env.GOOGLE_ID
		})
	} catch(error) {
	//@ts-ignore
		context.args[2].res.status(401);
		return false;
	}

    return true;
  }
  

}
