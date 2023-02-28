import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { CreateMessageInput } from "@/types/graphql";
import Redis from "ioredis";
import { DirectMessage, Group, Prisma, User } from "@prisma/client";

@Injectable()
export class DirectMessageService {
	constructor(
		private readonly prisma: PrismaService,
		@Inject("REDIS_CLIENT") private readonly redisClient: Redis
	) {}

	async getConversation(receiverID) {
		const response = await this.prisma.directMessage.findMany({
			where: {
				recipientID: receiverID
			},
			include: {
				author: true,
				recipient: true
			}
		});
		if (!response) return new Error("Conversation could not be found");
		return response;
	}

	async getGroups(userID) {
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

	async send(senderID, recipientID, message) {
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
}
