import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { NewUser } from "@/types/graphql";
import { PlanOfStudyResolver } from "@/pos/pos.resolver";

type TokenType = {
	sub: string;
	email: string;
	iat: number;
	exp: number;
	picture: string;
	given_name: string;
	family_name: string;
};

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private pos: PlanOfStudyResolver) {
		this.prisma = prisma;
		this.pos = pos;
	}

	async fetchToken(code: string) {
		return await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({
				client_id: process.env.GOOGLE_ID,
				client_secret: process.env.GOOGLE_SECRET,
				grant_type: "authorization_code",
				redirect_uri: "http://localhost:3000/auth/redirect",
				access_type: "offline",
				code
			})
		});
	}

	async updateUserData(id_token: string) {
		const d1 = id_token.indexOf(".");
		const d2 = id_token.indexOf(".", d1 + 1);
		const JWTpayload = id_token.substring(d1 + 1, d2);

		const decoded: string = Buffer.from(JWTpayload, "base64").toString("ascii");

		const {
			sub,
			exp,
			iat,
			email,
			picture,
			given_name,
			family_name
		}: TokenType = JSON.parse(decoded);

		if (!sub) {
			throw new Error("Invalid token");
		}

		//Check to see if a user exists already
		const count = await this.prisma.user.count({
			where: {
				openID: sub
			}
		});

		if (count == 0) {
			//Register User here
			console.log("First time user");

			const payload = {
				openID: sub,
				email: email,
				picURL: picture,
				firstName: given_name,
				lastName: family_name,
				middleName: ""
			};
			const account = await this.registerUser(payload);

			if (account instanceof Error) {
				throw "Error adding plan to user.";
			} else {
				await this.pos.addPlan({
					student: account.id
				});
			}
		} else {
			//Update an existing user
			return this.prisma.user.update({
				where: {
					openID: sub
				},
				data: {
					...(sub && { openID: sub }),
					...(email && { email }),
					...(picture && { picURL: picture }),
					...(given_name && { firstName: given_name }),
					...(family_name && { lastName: family_name })
				}
			});
		}
	}

	// Create a user
	async registerUser(data: NewUser) {
		const { openID, email, picURL, firstName, lastName } = data;

		const safeEmail = email.toLowerCase();
		//find out if there is a duplicate user
		const count = await this.prisma.user.count({
			where: {
				email: safeEmail
			}
		});

		const payload = {
			openID,
			email: safeEmail,
			picURL,
			firstName,
			lastName
		};

		///Avoids duplicate value(email) if the exist already
		if (count === 0) {
			return await this.prisma.user.create({
				data: payload
			});
		} else {
			return new Error("User has an account already.");
		}
	}

	async refreshToken(token: string) {
		return await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({
				client_id: process.env.GOOGLE_ID,
				client_secret: process.env.GOOGLE_SECRET,
				grant_type: "refresh_token",
				refresh_token: token
			})
		});
	}
}
