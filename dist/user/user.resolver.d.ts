import { NewUser, UpdateUser } from "src/gql/graphql";
import { UserService } from "./user.service";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    users(): Promise<import(".prisma/client").User[] | undefined>;
    user(args: string): Promise<import(".prisma/client").User | null | undefined>;
    createUser(args: NewUser): Promise<Error | import(".prisma/client").User>;
    update(args: UpdateUser): Promise<import(".prisma/client").User>;
    delete(args: string): Promise<Error | import(".prisma/client").User>;
}
