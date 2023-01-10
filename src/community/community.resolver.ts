import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommunityService } from "./community.service";
import { Prisma } from "@prisma/client";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth.guard";
import { IThreadCreateInput } from "@/types/graphql";

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
		try {
			return await this.communityService.thread(id);
		} catch (e: any) {
			return e;
		}
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
		@Args("data") data: Prisma.ThreadCreateInput
	) {
		return await this.communityService.addCommentToThread(id, data);
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
