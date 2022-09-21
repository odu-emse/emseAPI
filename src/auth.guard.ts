import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: GraphQLExecutionContext,
  ): Promise<boolean> {

    //@ts-ignore
    const authToken = context.args[2].req.cookies['auth'];
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
    // Return true if its good, or false if not

    return true;
  }
  

}
