import {Args, Query, Resolver} from '@nestjs/graphql';
import {CommunityService} from "./community.service";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../auth.guard";

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
}
