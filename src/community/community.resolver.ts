import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CommunityService} from "./community.service";
import {Prisma} from '@prisma/client';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@/auth.guard";
import {IThreadCreateInput} from "@/types/graphql";

@Resolver()
// @UseGuards(AuthGuard)
export class CommunityResolver {
    constructor(private readonly communityService: CommunityService) {
    }

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


    @Mutation("addCommentToThread")
    async addCommentToThread(@Args("parentThreadID") parentThreadID: string, @Args("data") data: IThreadCreateInput) {
        const comment = await this.communityService.createThread(data);
        return await this.communityService.addCommentToThread(parentThreadID, {
            id: comment.id,
            body: comment.body,
            author: comment.author.id
        });
    }

    @Mutation("upvoteThread")
    async upvoteThread(@Args("id") id: string) {
        return await this.communityService.upvoteThread(id);
    }

    @Mutation("updateThread")
    async updateThread(@Args("id") id: string, @Args("data") data: Prisma.ThreadUpdateInput) {
        return await this.communityService.updateThread(id, data);
    }
}
