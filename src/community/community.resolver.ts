import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommunityService } from "./community.service";
import { Prisma } from "@prisma/client";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth.guard";
import {
	ICommentCreateInput,
	IThreadCreateInput,
	Lesson,
	Thread,
	User
} from "@/types/graphql";

@Resolver()
// @UseGuards(AuthGuard)
export class CommunityResolver {
	constructor(private readonly communityService: CommunityService) {}

	@Query("threads")
	async threads() {
		return await this.communityService.threads();
	}

	@Query("thread")
	async thread(@Args("id") id: string) {
		return await this.communityService.thread(id);
	}

	@Mutation("createThread")
	async createThread(@Args("data") data: IThreadCreateInput) {
		return await this.communityService.createThread(data);
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
		const self = await this.communityService.thread(id);
		if (!self) throw new Error("Thread not found");

		//creating new comment document
		const newComment = await this.communityService.createThread({
			body: data.body,
			author: data.author,
			parentThread: self.id
		});

		return newComment;
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
