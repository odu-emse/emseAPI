// import {
// 	GraphQLSchema,
// 	GraphQLObjectType,
// 	GraphQLString,
// 	GraphQLNonNull,
// 	GraphQLInt,
// 	GraphQLID,
// } from "graphql";
// import { UserType, UserVerifyType } from "./types";
// import User from "../models/User";
// import UserVerify from "../models/UserVerify";
// import * as bcrypt from "bcryptjs";
// import { allUsers, user, allModules } from "./queries";
// import * as sgMail from "@sendgrid/mail";

// const query = new GraphQLObjectType({
// 	name: "QueryType",
// 	description: "queries",
// 	fields: { allUsers, user, allModules },
// });

// const mutation = new GraphQLObjectType({
// 	name: "MutationType",
// 	description: "Holds all of our mutations",
// 	fields: {
// 		addUser: {
// 			type: UserType,
// 			args: {
// 				firstName: { type: GraphQLString! },
// 				lastName: { type: GraphQLString! },
// 				email: { type: GraphQLString! },
// 				password: { type: GraphQLString! },
// 				passwordConf: { type: GraphQLString! },
// 				group: { type: GraphQLString! },
// 			},
// 			async resolve(parent, arg) {
// 				try {
// 					const existing = await User.findOne({
// 						email: arg.email,
// 					});
// 					if (existing != null) {
// 						return null;
// 					} else {
// 						const {
// 							firstName,
// 							lastName,
// 							email,
// 							password,
// 							passwordConf,
// 							group,
// 						} = arg;

// 						if (password == passwordConf) {
// 							const hashed = await bcrypt.hash(password, 10);

// 							const user = new User({
// 								firstName: firstName,
// 								lastName: lastName,
// 								email: email,
// 								password: hashed,
// 								passwordConf: hashed,
// 								group: group,
// 							});

// 							const res = await user.save();

// 							const msg = {
// 								to: email,
// 								from: "dpapp@odu.edu",
// 								subject:
// 									"Asynchronous Learning Management Platform Verification",
// 								html: `<strong>Thank you for registering on EMSE LMS</strong><br/>localhost:3000/users/userVerify?token=${user._id}`,
// 							};

// 							const mailAPI = process.env.SENDGRID_API_KEY || "";

// 							sgMail.setApiKey(mailAPI);
// 							const mail = await sgMail.send(msg);

// 							const verifyUser = new UserVerify({
// 								token: res.id,
// 							});

// 							const verify = await verifyUser.save();

// 							return res;
// 						}
// 					}
// 				} catch (error) {
// 					console.error(error);
// 				}
// 			},
// 		},
// 		userVerify: {
// 			type: UserVerifyType,
// 			args: {
// 				userId: { type: GraphQLID! },
// 			},
// 			async resolve(parent, arg) {
// 				try {
// 					const existing = await User.findOne({
// 						_id: arg.userId,
// 					});
// 					if (existing != null) {
// 						return null;
// 					} else {
// 						console.log(existing);
// 					}
// 				} catch (error) {
// 					throw new Error(error);
// 				}
// 			},
// 		},
// 	},
// });

// export default new GraphQLSchema({
// 	query,
// 	mutation,
// });
