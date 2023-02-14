import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { DirectMessageService } from "@/direct-message";
import { PubSubService } from "@/pub-sub/pub-sub.service";

@Resolver("DirectMessage")
export class DirectMessageResolver {
	constructor(
		private readonly dmService: DirectMessageService,
		private readonly pubSub: PubSubService
	) {}

	@Subscription("newDirectMessage", {
		resolve: (payload) => payload,
		filter: (payload, args) => {
			return payload.recipientID === args.receiverID;
		}
	})
	async function() {
		return this.pubSub.subscribe("newDirectMessage");
	}

	@Mutation()
	async createDirectMessage(
		@Args("receiverID") receiverID: string,
		@Args("message") message: string,
		@Args("senderID") senderID: string
	) {
		const newMessage = await this.dmService.sendMessage({
			authorID: senderID,
			recipientID: receiverID,
			message
		});
		if (newMessage instanceof Error) return new Error(newMessage.message);
		else {
			try {
				await this.pubSub.publish("newDirectMessage", newMessage);
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		}
	}
}
