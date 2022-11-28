import {Query, Resolver} from '@nestjs/graphql';
import {PoSService} from "../pos/pos.service";
import {CommunityService} from "./community.service";

@Resolver()
export class CommunityResolver {
    constructor(private readonly communityService: CommunityService) {
    }

    @Query("threads")
    async threads() {
        return await this.communityService.threads();
    }

    @Query("thread")
    async thread(id: string) {
        return await this.communityService.thread(id);
    }
}
