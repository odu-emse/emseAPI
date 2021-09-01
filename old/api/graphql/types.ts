import { ObjectId } from "mongodb";
export type Ref<T> = T | ObjectId;

// import User from "../models/User";
// import {
// 	GraphQLObjectType,
// 	GraphQLID,
// 	GraphQLString,
// 	GraphQLInt,
// 	GraphQLBoolean,
// } from "graphql";
// import { GraphQLDateTime } from "graphql-iso-date";

// export const UserType = new GraphQLObjectType({
// 	name: "User",
// 	description: "User Type",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		email: { type: GraphQLString },
// 	}),
// });

// export const UserVerifyType = new GraphQLObjectType({
// 	name: "User Verify",
// 	description: "",
// 	fields: () => ({
// 		token: { type: GraphQLString },
// 		dateSent: { type: GraphQLDateTime },
// 		expires: { type: GraphQLDateTime },
// 		user: { type: GraphQLBoolean },
// 	}),
// });

// export const ModuleType = new GraphQLObjectType({
// 	name: "Module",
// 	description: "Module Type",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		number: { type: GraphQLInt },
// 		name: { type: GraphQLString },
// 		instructor: {
// 			type: GraphQLID,
// 			resolve(parent, arg) {
// 				console.log(arg);
// 				return User.findById(parent.instructor);
// 			},
// 		},
// 	}),
// });
