"use strict";
// import { UserModel, User } from "../../../models/User";
// import { Resolver, Query, Mutation, Arg, Args, ID } from "type-graphql";
// import { Schema, Types } from "mongoose";
// @Resolver(of => UserModel)
// export class UserVerify {
// @Query(returns => [UserModel], { nullable: false })
// async getUsers(): Promise<User[]> {
// 	return await UserModel.find();
// }
// @Query(() => Boolean)
// async verify(@Arg("token", () => ID) token: string): Promise<Boolean> {
// 	try {
// 		const account = await UserModel.findById(token);
// 		console.log(account);
// 		if (account === null) {
// 			return false;
// 		}
// 		return true;
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// }
// 	@Query(_returns => User, { nullable: false })
// 	async returnSingleUser(@Arg("id") id: string) {
// 		return await UserModel.findById({ _id: id });
// 	}
// }
