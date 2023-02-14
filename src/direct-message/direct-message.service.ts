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
		let response: Array<DirectMessage>;
		const cachedConversation = await this.redisClient.get(`get-${receiverID}`);
		if (cachedConversation) {
			response = JSON.parse(cachedConversation);
		} else {
			response = await this.prisma.directMessage.findMany({
				where: {
					recipientID: receiverID
				},
				include: {
					author: true,
					recipient: true
				}
			});
			await this.redisClient.set(`get-${receiverID}`, JSON.stringify(response));
		}
		if (!response) return new Error("Conversation could not be found");
		return response;
	}

	async getGroups(userID) {
		let response: Array<Group>;
		const cachedGroups = await this.redisClient.get(`groups-${userID}`);
		if (cachedGroups) {
			response = JSON.parse(cachedGroups);
		} else {
			response = await this.prisma.group.findMany({
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
			// await this.redisClient.set(`groups-${userID}`, JSON.stringify(response));
		}
		if (!response) return new Error("Groups could not be found");
		return response;
	}

	async sendMessage({ authorID, recipientID, message }: CreateMessageInput) {
		const payload = Prisma.validator<Prisma.DirectMessageCreateInput>()({
			body: message,
			author: {},
			recipient: {}
		});
		let response: DirectMessage & {
			author: User | undefined;
			recipient: User | null;
		} = {
			id: "",
			body: message,
			authorID: "",
			recipientID: "",
			createdAt: new Date(),
			updatedAt: new Date(),
			author: undefined,
			recipient: null,
			groupID: null
		};
		//check if author and recipient are the same
		if (authorID === recipientID)
			return new Error("You can't send a message to yourself");

		//check if author and recipient are cached
		//if they are, use the cached data
		//if they aren't, use the data from the database
		//set the data in the cache

		const cachedAuthor = await this.redisClient.get(authorID);
		const cachedRecipient = await this.redisClient.get(recipientID);

		if (cachedAuthor) {
			const author: User = JSON.parse(cachedAuthor);
			response["authorID"] = author.id;
			response["author"] = author;
		}

		if (cachedRecipient) {
			const recipient: User = JSON.parse(cachedRecipient);
			response["recipientID"] = recipient.id;
			response["recipient"] = recipient;
		}

		if (!cachedRecipient || !cachedAuthor) {
			response = await this.prisma.directMessage.create({
				data: {
					...payload,
					author: {
						connect: {
							id: authorID
						}
					},
					recipient: {
						connect: {
							id: recipientID
						}
					}
				},
				include: {
					author: true,
					recipient: true
				}
			});
			await this.redisClient.set(authorID, JSON.stringify(response.author));
			await this.redisClient.set(
				recipientID,
				JSON.stringify(response.recipient)
			);
		}

		if (!response) return new Error("Message could not be sent");
		return response;
	}

	async sendMessageToGroup(senderID, groupID, message) {
		const response = await this.prisma.directMessage.create({
			data: {
				body: message,
				author: {
					connect: {
						id: senderID
					}
				},
				group: {
					connect: {
						id: groupID
					}
				}
			},
			include: {
				author: true
			}
		});
		if (!response) return new Error("Message could not be sent");
		return response;
	}
}
