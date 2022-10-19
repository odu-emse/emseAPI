import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from 'src/user/user.service';
import { Prisma, User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService
    ){}

    async fetchToken(code: String) {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:3000/auth/redirect',
                code
            })
        });

        return response;
    }

    async updateUserData(id_token: string) {
        const d1 = id_token.indexOf('.');
        const d2 = id_token.indexOf('.', d1+1);
        const JWTpayload = id_token.substring(d1+1, d2);

        const data = JSON.parse(atob(JWTpayload));

        //Check to see if a user exists already
        const count = await this.prisma.user.count({
            where: {
                openID: data.sub
            }
        })
        
        if (count == 0) {
            //Register User here
            console.log("First time user")

            const payload = {
                openID: data.sub,
                email: data.email,
                picURL: data.picture,
                firstName: data.given_name,
                lastName: data.family_name
            }

            return this.registerUser(payload);

        }else {
            //Update an exisiting user
            return this.prisma.user.update({
                where: {
                    openID: data.sub
                },
                data: {
                    openID: data.sub,
                    email: data.email,
                    picURL: data.picture,
                    firstName: data.given_name,
                    lastName: data.family_name
                }
            })
        }
    }

    // Create a user
	async registerUser(data: Prisma.UserCreateInput): Promise<User | Error> {
		const {
			openID,
			email,
			picURL,
			firstName,
			lastName,
		} = data;

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
			lastName,
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
}
