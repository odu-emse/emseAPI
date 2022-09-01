import { PrismaService } from "../prisma.service";
import { Prisma, User } from "@prisma/client";
import { UpdateUser } from "src/gql/graphql";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    users(): Promise<User[]>;
    user(id: string): Promise<User | null>;
    registerUser(data: Prisma.UserCreateInput): Promise<User | Error>;
    updateUser(params: UpdateUser): Promise<User>;
    deleteUser(id: string): Promise<User | Error>;
}
