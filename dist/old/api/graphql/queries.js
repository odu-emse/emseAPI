"use strict";
// import { GraphQLList, GraphQLID } from "graphql";
// import { UserType, ModuleType } from "./types";
// import User from "../models/User";
// import Module from "../models/Module";
// export const me = {
// 	type: UserType,
// 	description: "Gets the current user based on cookies",
// 	resolve(parent, args) {
// 		return User.findById(args.id);
// 	},
// };
// export const allUsers = {
// 	type: new GraphQLList(UserType),
// 	description: "Retrieves list of users",
// 	resolve(parent, args) {
// 		return User.find();
// 	},
// };
// export const user = {
// 	type: UserType,
// 	description: "Retrieves one user",
// 	args: { id: { type: GraphQLID } },
// 	resolve(parent, args) {
// 		return User.findById(args.id);
// 	},
// };
// export const allModules = {
// 	type: new GraphQLList(ModuleType),
// 	description: "Retrieves list of users",
// 	resolve(parent, args) {
// 		return Module.find();
// 	},
// };
