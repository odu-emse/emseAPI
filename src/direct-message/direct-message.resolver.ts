import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub, PubSubEngine } from "graphql-subscriptions";
import { DirectMessageService } from "@/direct-message";
import { Message } from "@/types/graphql";

const pubSub: PubSub = new PubSub();

@Resolver()
export class DirectMessageResolver {
	constructor(private readonly dmService: DirectMessageService) {}

	@Subscription("listenForMessage", {
		resolve: (payload: Message) => payload
	})
	async listenForMessage() {
		return pubSub.asyncIterator("directMessage");
	}

	@Mutation()
	async send(
		@Args("authorID", { type: () => String }) authorID: string,
		@Args("recipientID", { type: () => String }) recipientID: string,
		@Args("message", { type: () => String }) message: string
	) {
		const newMessage = await this.dmService.sendMessage({
			authorID,
			recipientID,
			message
		});
		await pubSub.publish("directMessage", { ...newMessage });
		return newMessage ? true : false;
	}
}
