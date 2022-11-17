import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {NewUser, User} from "../../gql/graphql";

type TokenType = {
    sub: string
    email: string
    iat: number
    exp: number
    picture: string
    given_name: string
    family_name: string
}

interface UserOpenID {
    openID: string
}

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService
    ) {
    }

    async fetchToken(code: String) {
        return await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:3000/auth/redirect',
                access_type: 'offline',
                code
            })
        });
    }

    async updateUserData(id_token: string) {
        const d1 = id_token.indexOf('.');
        const d2 = id_token.indexOf('.', d1 + 1);
        const JWTpayload = id_token.substring(d1 + 1, d2);

        const decoded: string = Buffer.from(JWTpayload, 'base64').toString('ascii')

        const {sub, exp, iat, email, picture, given_name, family_name}: TokenType = JSON.parse(decoded);

        if (!sub) {
            return new Error("Invalid token");
        }

        //Check to see if a user exists already
        const count = await this.prisma.user.count({
            where: {
                //TODO: Fix this
                //@ts-ignore
                openID: sub
            }
        })

        if (count == 0) {
            //Register User here
            console.log("First time user")

            const payload = {
                openID: sub,
                email: email,
                picURL: picture,
                firstName: given_name,
                lastName: family_name,
                middleName: ''
            }

            return this.registerUser(payload);

        } else {
            //Update an existing user
            return this.prisma.user.update({
                where: {
                    //TODO: Fix this
                    //@ts-ignore
                    openID: sub
                },
                data: {
                    //TODO: Fix this
                    //@ts-ignore
                    openID: sub,
                    email: email,
                    picURL: picture,
                    firstName: given_name,
                    lastName: family_name
                }
            })
        }
    }

    // Create a user
    async registerUser(data: NewUser): Promise<User | Error> {
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
            //TODO: Fix this
            //@ts-ignore
            return await this.prisma.user.create({
                //TODO: Fix this
                //@ts-ignore
                data: payload
            });
        } else {
            return new Error("User has an account already.");
        }
    }

    async refreshToken(token: String) {
        return await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                client_id: process.env.GOOGLE_ID,
                client_secret: process.env.GOOGLE_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token
            })
        });
    }
}
