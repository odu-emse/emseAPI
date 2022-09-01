import { PrismaService } from "../prisma.service";
import { User } from "@prisma/client";
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    users(): Promise<User[]>;
}
