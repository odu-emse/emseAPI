import { PrismaService } from "../prisma.service";
import { Prisma, User, Social } from "@prisma/client";
import { UpdateUser, LoginUser, Token, SocialInput } from "gql/graphql";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    users(): Promise<User[]>;
    user(id: string): Promise<User | null>;
    socials(): Promise<Social[]>;
    social(id: string): Promise<Social | null>;
    registerUser(data: Prisma.UserCreateInput): Promise<User | Error>;
    updateUser(params: UpdateUser): Promise<User>;
    deleteUser(id: string): Promise<User | Error>;
    loginUser(params: LoginUser): Promise<Token | null | Error>;
    addSocial(userId: string, input: SocialInput): Promise<Social>;
    updateSocial(id: string, input: SocialInput): Promise<Social & {
        account: User | null;
    }>;
    updateUserSocial(userId: string, input: SocialInput): Promise<Prisma.BatchPayload>;
    deleteSocial(id: string): Promise<Social>;
    deleteUserSocial(userId: string): Promise<Prisma.BatchPayload>;
}
