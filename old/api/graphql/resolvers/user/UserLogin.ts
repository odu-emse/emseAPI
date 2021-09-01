// import { createRefreshToken, createAccessToken } from "./../../auth";
// import { Context } from "../../Context";
// import { UserModel, User } from "../../../models/User";
// import {
// 	Resolver,
// 	Query,
// 	Mutation,
// 	Arg,
// 	ObjectType,
// 	Field,
// 	Ctx,
// } from "type-graphql";
// import { compare } from "bcryptjs";
// import "dotenv/config";

// @ObjectType()
// class LoginResponse {
// 	@Field()
// 	accessToken?: string;
// }

// @Resolver()
// export class UserLogin {
// 	@Query(returns => [User], { nullable: false })
// 	async getUsers(): Promise<User[]> {
// 		return await UserModel.find();
// 	}

// 	@Mutation(() => LoginResponse)
// 	async login(
// 		@Arg("email", () => String) email: string,
// 		@Arg("password", () => String) password: string,
// 		@Ctx() { res }: Context
// 	): Promise<LoginResponse> {
// 		try {
// 			const account = await UserModel.findOne({ email });

// 			if (!account) {
// 				throw new Error("User not found");
// 			}

// 			const valid = await compare(password, account.password!);

// 			if (!valid) {
// 				throw new Error("Bad password");
// 			}

// 			res.cookie("refreshToken", createRefreshToken(account), {
// 				httpOnly: true,
// 			});

// 			return {
// 				accessToken: createAccessToken(account),
// 			};
// 		} catch (error) {
// 			throw new Error(error);
// 		}
// 	}
// }
