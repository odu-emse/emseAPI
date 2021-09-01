//package imports
import { compare, hash } from "bcryptjs";
import {
	Resolver,
	Mutation,
	Arg,
	Query,
	ObjectType,
	Field,
	Ctx,
} from "type-graphql";
import { send, setApiKey } from "@sendgrid/mail";

// custom imports
import { UserVerifyModel } from "../../models/UserVerify";
import { User, UserModel } from "../../models/User";
import { createAccessToken, createRefreshToken } from "../auth";
import { Context } from "../Context";
import { UserInput } from "./types/user-types";
import { UserVerifyInput } from "./types/userVerify-types";

@ObjectType()
class LoginResponse {
	@Field()
	accessToken?: string;
}

@Resolver()
export class UserResolver {
	@Query(_returns => User, { nullable: false })
	async getUser(@Arg("id") id: string) {
		return await UserModel.findById({ _id: id });
	}

	@Query(_returns => [User], { nullable: false })
	async getUsers(): Promise<User[]> {
		return await UserModel.find();
	}

	@Mutation(() => LoginResponse)
	async login(
		@Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string,
		@Ctx() { res }: Context
	): Promise<LoginResponse> {
		try {
			const account = await UserModel.findOne({ email });

			if (!account) {
				throw new Error("User not found");
			}

			const valid = await compare(password, account.password!);

			if (!valid) {
				throw new Error("Bad password");
			}

			res.cookie("refreshToken", createRefreshToken(account), {
				httpOnly: true,
			});

			return {
				accessToken: createAccessToken(account),
			};
		} catch (error) {
			throw new Error(error);
		}
	}

	@Mutation(() => Boolean)
	async register(
		@Arg("firstName", () => String) fName: string,
		@Arg("lastName", () => String) lName: string,
		@Arg("group", () => String) group: string,
		@Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string,
		@Arg("passwordConf", () => String) passwordConf: string
	) {
		try {
			const existing = await UserModel.findOne({
				email,
			});
			if (existing !== null) {
				return false;
			} else {
				if (password == passwordConf) {
					try {
						const hashed = await hash(password, 10);

						const user = new UserModel({
							firstName: fName,
							lastName: lName,
							email: email,
							password: hashed,
							passwordConf: hashed,
							group: group,
							active: false,
						});

						const res = await user.save();

						const token = res._id;

						const verify = new UserVerifyModel({
							token,
						});

						const create = await verify.save();

						const msg = {
							to: email,
							from: "dpapp@odu.edu",
							subject:
								"Asynchronous Learning Management Platform Verification",
							html: `<strong>Thank you for registering on EMSE LMS</strong><br/>localhost:3000/users/userVerify?token=${token}`,
						};

						const mailAPI = process.env.SENDGRID_API_KEY || "";

						setApiKey(mailAPI);

						const mail = await send(msg);

						return true;
					} catch (error) {
						throw new Error(error);
					}
				}
			}
		} catch (error) {
			return false;
		}
	}

	@Mutation(() => Boolean)
	async verify(@Arg("token") token: string) {
		try {
			const account = await UserModel.findById(token);
			if (account === null) {
				return false;
			}

			const verify = await UserVerifyModel.findOne({ token });

			if (verify === null) {
				return false;
			}

			let d = new Date();

			const sent: Number = verify.dateSent;
			const now: number = d.getTime();
			const expires = now + 30 * 60 * 60 * 15;

			if (now < expires) {
				console.log(verify);

				const active = await account.updateOne({
					active: true,
				});
				const used = await verify.updateOne({
					used: true,
				});
			}

			return true;
		} catch (error) {
			throw new Error(error);
		}
	}
}
