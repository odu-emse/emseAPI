import { NewUser, UpdateUser, LoginUser, SocialInput } from "gql/graphql";
import { UserService } from "./user.service";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    users(): Promise<import(".prisma/client").User[] | undefined>;
    user(args: string): Promise<import(".prisma/client").User | null | undefined>;
    login(args: LoginUser): Promise<Error | import("gql/graphql").Token>;
    socials(): Promise<import(".prisma/client").Social[]>;
    social(id: string): Promise<import(".prisma/client").Social | null>;
    instructorProfile(id: string): Promise<import("gql/graphql").InstructorProfile | null>;
    createUser(args: NewUser): Promise<import(".prisma/client").User | Error>;
    update(args: UpdateUser): Promise<import(".prisma/client").User | Error>;
    delete(args: string): Promise<import(".prisma/client").User | Error>;
    addSocial(user: string, input: SocialInput): Promise<import(".prisma/client").Social>;
    updateSocial(id: string, input: SocialInput): Promise<void>;
    updateUserSocial(user: string, input: SocialInput): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteSocial(id: string): Promise<import(".prisma/client").Social>;
    deleteUserSocial(user: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
