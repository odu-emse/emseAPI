import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { DirectMessageService } from "@/direct-message";
import { Inject } from "@nestjs/common";
import { ClientProxy, EventPattern } from "@nestjs/microservices";

const pubSub: PubSub = new PubSub();

@Resolver()
export class DirectMessageResolver {
	constructor(
		private readonly dmService: DirectMessageService,
		@Inject("DM_SERVICE") private client: ClientProxy
	) {}

	@Subscription("newDirectMessage", {
		resolve: (payload) => payload,
		filter: (payload, args) => {
			console.log(payload, args);
			return payload.recipientID === args.receiverID;
		}
	})
	async newDirectMessage() {
		return pubSub.asyncIterator("newDirectMessage");
	}

	@Mutation()
	async createDirectMessage(
		@Args("receiverID") receiverID: string,
		@Args("message") message: string,
		@Args("senderID") senderID: string
	) {
		try {
			const newMessage = await this.dmService.sendMessage({
				authorID: senderID,
				recipientID: receiverID,
				message
			});
			if (newMessage instanceof Error) return new Error(newMessage.message);
			await pubSub.publish("newDirectMessage", { ...newMessage });
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
}
