import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { DirectMessageService } from "@/direct-message";
import { PubSubService } from "@/pub-sub/pub-sub.service";
import { DirectMessage } from "@prisma/client";

@Resolver("DirectMessage")
export class DirectMessageResolver {
	constructor(
		private readonly dmService: DirectMessageService,
		private readonly pubSub: PubSubService
	) {}

	@Query("directMessages")
	async directMessages(
		@Args("receiverID") receiverID: string,
		@Args("senderID") senderID: string
	) {
		return await this.dmService.getConversation(receiverID, senderID);
	}

	@Query("groups")
	async groups(@Args("userID") userID: string) {
		return await this.dmService.getGroups(userID);
	}

	@Query("sentMessages")
	async sentMessages(@Args("senderID") senderID: string) {
		return await this.dmService.getSentMessages(senderID);
	}

	@Subscription("newDirectMessage", {
		resolve: (payload) => payload,
		filter: (payload: DirectMessage, args: { receiverID: string }) => {
			return payload.recipientID === args.receiverID;
		}
	})
	async newDirectMessage() {
		return this.pubSub.subscribe("newDirectMessage");
	}
	@Subscription("newGroupMessage", {
		resolve: (payload) => payload,
		filter: (payload, args) => {
			return payload.groupID === args.groupID;
		}
	})
	async newGroupMessage() {
		return this.pubSub.subscribe("newGroupMessage");
	}

	@Mutation("newGroupMessage")
	async sendMessageToGroup(
		@Args("groupID") groupID: string,
		@Args("message") message: string,
		@Args("senderID") senderID: string
	) {
		const newMessage = await this.dmService.send(senderID, groupID, message);
		if (newMessage instanceof Error) return new Error(newMessage.message);
		else {
			try {
				await this.pubSub.publish("newGroupMessage", newMessage);
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		}
	}

	@Mutation()
	async createDirectMessage(
		@Args("receiverID") receiverID: string,
		@Args("message") message: string,
		@Args("senderID") senderID: string
	) {
		const newMessage = await this.dmService.send(senderID, receiverID, message);
		if (newMessage instanceof Error) return new Error(newMessage.message);
		else {
			try {
				await this.pubSub.publish("newDirectMessage", newMessage);
				return true;
			} catch (e) {
				return false;
			}
		}
	}

	@Mutation("createGroup")
	async createGroup(
		@Args("name") name: string,
		@Args("members") members: string[],
		@Args("publicGroup") publicGroup: boolean = false
	) {
		const newGroup = await this.dmService.createGroup(
			name,
			members,
			publicGroup
		);
		if (newGroup instanceof Error) return new Error(newGroup.message);
		else {
			return newGroup;
		}
	}
}
