import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { DirectMessage, Group, Prisma, User } from "@prisma/client";
import { DirectMessageResponse } from "@/types/graphql";

@Injectable()
export class DirectMessageService {
	constructor(private readonly prisma: PrismaService) {}

	async getConversation(receiverID: string, senderID: string) {
		const group = await this.prisma.group.findFirst({
			where: {
				id: receiverID
			},
			include: {
				members: true
			}
		});
		// if the recipient is a group
		if (group) {
			// check if the sender is a member of the group
			const isMember = group.members.find((member) => member.id === senderID);
			if (!isMember) return new Error("You are not a member of this group");
			// if the sender is a member of the group, return the group's messages
			else {
				const response = await this.prisma.directMessage.findMany({
					where: {
						groupID: receiverID
					},
					include: {
						author: true,
						recipient: true,
						group: true
					}
				});

				if (response.length === 0)
					return new Error("Conversation could not be found");

				return response.map((message) => {
					message.recipientID = message.groupID;
					//@ts-ignore
					message.recipient = {
						...message.group,
						__typename: "Group"
					} as Group;
					return message as DirectMessageResponse;
				});
			}
		} else {
			const response = await this.prisma.directMessage.findMany({
				where: {
					OR: [
						{
							authorID: senderID,
							recipientID: receiverID
						},
						{
							recipientID: senderID,
							authorID: receiverID
						}
					]
				},
				include: {
					author: true,
					recipient: true
				}
			});
			if (response.length === 0)
				return new Error("Conversation could not be found");

			const typedResponse = response.map((message) => {
				message.recipient = {
					...message.recipient,
					__typename: "User"
				} as User;
				return message as DirectMessageResponse;
			});

			return typedResponse;
		}
	}

	async getGroups(userID: string) {
		const response = await this.prisma.group.findMany({
			where: {
				members: {
					some: {
						id: userID
					}
				}
			},
			include: {
				members: true,
				messages: {
					include: {
						author: true,
						recipient: true
					}
				}
			}
		});
		if (!response) return new Error("Groups could not be found");
		return response;
	}

	async send(senderID: string, recipientID: string, message: string) {
		let response: DirectMessage & {
			author: User;
			recipient: (User | null) | (Group | null);
			group: Group | null;
		};
		const include = Prisma.validator<Prisma.DirectMessageInclude>()({
			author: true,
			recipient: true,
			group: {
				include: {
					messages: true,
					members: true
				}
			}
		});
		const group = await this.prisma.group.findFirst({
			where: {
				id: recipientID
			}
		});
		if (!group) {
			//send direct message
			const recipient = await this.prisma.user.findFirst({
				where: {
					id: recipientID
				}
			});
			if (!recipient) return new Error("Recipient could not be found");
			const author = await this.prisma.user.findFirst({
				where: {
					id: senderID
				}
			});
			if (!author) return new Error("Author could not be found");

			try {
				const res = await this.prisma.directMessage.create({
					data: {
						body: message,
						author: {
							connect: {
								id: senderID
							}
						},
						recipient: {
							connect: {
								id: recipientID
							}
						}
					},
					include
				});
				if (res.recipient) {
					res.recipient["__typename"] = "User";
				}
				return res;
			} catch (e: any) {
				return new Error(e);
			}
		} else {
			//send group message
			const author = await this.prisma.user.findFirst({
				where: {
					id: senderID
				}
			});
			if (!author) return new Error("Author could not be found");

			try {
				response = await this.prisma.directMessage.create({
					data: {
						body: message,
						author: {
							connect: {
								id: senderID
							}
						},
						group: {
							connect: {
								id: recipientID
							}
						}
					},
					include
				});
				if (response.recipient === null) {
					response.recipient = {
						...response.group,
						__typename: "Group"
					} as Group;
				}
				return response;
			} catch (e: any) {
				return new Error(e);
			}
		}
	}

	async getSentMessages(
		senderID: string
	): Promise<Array<DirectMessageResponse> | Error> {
		const response = await this.prisma.directMessage.findMany({
			where: {
				OR: [
					{
						authorID: senderID
					},
					{
						recipientID: senderID
					},
					{
						group: {
							members: {
								some: {
									id: senderID
								}
							}
						}
					}
				]
			},
			include: {
				author: true,
				recipient: true,
				group: {
					include: {
						messages: true,
						members: true
					}
				}
			}
		});
		if (!response) return new Error("Messages could not be found");

		const typedResponse = response.map((message) => {
			if (!message.recipient && message.group) {
				//@ts-ignore
				message.recipient = {
					...message.group,
					__typename: "Group"
				} as Group;
				message.recipientID = message.group.id;
			} else {
				message.recipient = {
					...message.recipient,
					__typename: "User"
				} as User;
			}
			return message;
		});

		// sort by most recent message
		const sortedResponses = typedResponse.sort((a, b) => {
			return b.createdAt.getTime() - a.createdAt.getTime();
		});

		const recipientIDs = new Set<string | null>();

		// filter out duplicate recipients and keep the most recent one
		const payload = sortedResponses.filter((response) => {
			if (response.group) {
				if (recipientIDs.has(response.group.id)) {
					return false;
				} else {
					recipientIDs.add(response.group.id);
					return true;
				}
			}
			if (response.recipientID === senderID) return false;
			if (recipientIDs.has(response.recipientID)) {
				return false;
			} else {
				recipientIDs.add(response.recipientID);
				return true;
			}
		});

		if (!payload) return new Error("Messages could not be found");
		//@ts-ignore
		return payload;
	}

	async createGroup(name: string, members: string[], publicGroup: boolean) {
		const response = await this.prisma.group.create({
			data: {
				name,
				members: {
					connect: members.map((member) => {
						return {
							id: member
						};
					})
				},
				public: publicGroup
			},
			include: {
				members: true,
				messages: {
					include: {
						author: true,
						group: true,
						recipient: true
					}
				}
			}
		});

		if (!response) return new Error("Group could not be created");
		return response;
	}
}
