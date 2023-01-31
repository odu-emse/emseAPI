import { CanActivate, Injectable } from "@nestjs/common";
import { GraphQLExecutionContext, GqlExecutionContext } from "@nestjs/graphql";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: GraphQLExecutionContext): Promise<boolean> {
		const ctx = GqlExecutionContext.create(context);
		const authToken = ctx.getContext().req.headers.authorization;
		const client = new OAuth2Client(process.env.GOOGLE_ID);
		try {
			await client.verifyIdToken({
				idToken: authToken,
				audience: process.env.GOOGLE_ID
			});
		} catch (error) {
			console.error(error);
			return false;
		}

		return true;
	}
}
