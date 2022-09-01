import { PostService } from "./posts.service";
export declare class PostResolvers {
    private readonly postService;
    constructor(postService: PostService);
    sayHello(): string;
}
