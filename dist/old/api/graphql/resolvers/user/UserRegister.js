"use strict";
// import { UserModel, User } from "../../../models/User";
// import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
// import { hash } from "bcryptjs";
// import { send, setApiKey } from "@sendgrid/mail";
// @Resolver()
// export class UserRegister {
// 	@Query(returns => [User], { nullable: false })
// 	async getUsers(): Promise<User[]> {
// 		return await UserModel.find();
// 	}
// 	@Mutation(() => Boolean)
// 	async register(
// 		@Arg("firstName", () => String) fName: string,
// 		@Arg("lastName", () => String) lName: string,
// 		@Arg("group", () => String) group: string,
// 		@Arg("email", () => String) email: string,
// 		@Arg("password", () => String) password: string,
// 		@Arg("passwordConf", () => String) passwordConf: string
// 	) {
// 		try {
// 			const existing = await UserModel.findOne({
// 				email,
// 			});
// 			if (existing !== null) {
// 				return false;
// 			} else {
// 				if (password == passwordConf) {
// 					try {
// 						const hashed = await hash(password, 10);
// 						const user = new UserModel({
// 							firstName: fName,
// 							lastName: lName,
// 							email: email,
// 							password: hashed,
// 							passwordConf: hashed,
// 							group: group,
// 						});
// 						try {
// 							const res = await user.save();
// 							const msg = {
// 								to: email,
// 								from: "dpapp@odu.edu",
// 								subject:
// 									"Asynchronous Learning Management Platform Verification",
// 								html: `<strong>Thank you for registering on EMSE LMS</strong><br/>localhost:3000/users/userVerify?token=${user._id}`,
// 							};
// 							const mailAPI = process.env.SENDGRID_API_KEY || "";
// 							setApiKey(mailAPI);
// 							try {
// 								const mail = await send(msg);
// 							} catch (error) {
// 								throw new Error(error);
// 							}
// 							return true;
// 						} catch (error) {
// 							throw new Error(error);
// 						}
// 					} catch (error) {
// 						throw new Error(error);
// 					}
// 				}
// 			}
// 		} catch (error) {
// 			return false;
// 		}
// 	}
// }
