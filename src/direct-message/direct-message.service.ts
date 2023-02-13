import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { CreateMessageInput } from "@/types/graphql";

@Injectable()
export class DirectMessageService {
	constructor(private readonly prisma: PrismaService) {}
	async sendMessage({ authorID, recipientID, message }: CreateMessageInput) {
		if (authorID === recipientID)
			return new Error("You can't send a message to yourself");

		const dm = await this.prisma.directMessage.create({
			data: {
				body: message,
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

		if (!dm) return new Error("Message could not be sent");

		return dm;
	}
}
