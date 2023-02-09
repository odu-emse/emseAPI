import { Injectable } from "@nestjs/common";
import { Message } from "@/types/graphql";
import { PrismaService } from "@/prisma.service";

@Injectable()
export class DirectMessageService {
	constructor(private readonly prisma: PrismaService) {}
	async sendMessage({
		authorID,
		recipientID,
		message
	}: {
		authorID: string;
		recipientID: string;
		message: string;
	}): Promise<Message> {
		if (authorID === recipientID)
			throw new Error("You can't send a message to yourself");

		const author = await this.prisma.user.findFirst({
			where: {
				id: authorID
			}
		});
		if (!author) throw new Error("User not found");

		const recipient = await this.prisma.user.findFirst({
			where: { id: recipientID }
		});
		if (!recipient) throw new Error("Recipient not found");

		return {
			message,
			author,
			sentAt: new Date(),
			recipient
		};
	}
}
