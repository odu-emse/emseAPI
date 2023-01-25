import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommunityService } from "./community.service";
import { Prisma } from "@prisma/client";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@/auth.guard";
import {
	ICommentCreateInput,
	IThreadCreateInput,
	IThreadByParams
} from "@/types/graphql";

@Resolver()
// @UseGuards(AuthGuard)
export class CommunityResolver {
	constructor(private readonly communityService: CommunityService) {
		this.communityService = communityService;
	}

	@Query("thread")
	async thread(@Args("input") input: IThreadByParams) {
		const thread = await this.communityService.threadsByParam(input);
		if (thread instanceof Error) return new Error(thread.message);
		else return thread;
	}

	@Mutation("createThread")
	async createThread(@Args("data") data: IThreadCreateInput) {
		const newThread = await this.communityService.createThread(data);
		if (newThread instanceof Error) return new Error(newThread.message);
		return newThread;
	}

	@Mutation("deleteThread")
	async deleteThread(@Args("id") id: string) {
		return await this.communityService.deleteThread(id);
	}

	@Mutation("addCommentToThread")
	async addCommentToThread(
		@Args("id") id: string,
		@Args("data") data: ICommentCreateInput
	) {
		const self = await this.thread({ id });
		if (self instanceof Error) return new Error(self.message);
		else {
			//creating new comment document
			const newThread = await this.createThread({
				body: data.body,
				author: data.author,
				parentThread: self[0].id
			});
			if (newThread instanceof Error) return new Error(newThread.message);
			return newThread;
		}
	}

	@Mutation("upvoteThread")
	async upvoteThread(@Args("id") id: string) {
		return await this.communityService.upvoteThread(id);
	}

	@Mutation("updateThread")
	async updateThread(
		@Args("id") id: string,
		@Args("data") data: Prisma.ThreadUpdateInput
	) {
		return await this.communityService.updateThread(id, data);
	}
}
