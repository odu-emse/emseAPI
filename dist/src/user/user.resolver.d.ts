import { NewUser, UpdateUser } from "src/gql/graphql";
import { UserService } from "./user.service";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    users(): Promise<import(".prisma/client").User[]>;
    user(args: string): Promise<import(".prisma/client").User>;
    createUser(args: NewUser): Promise<import(".prisma/client").User>;
    update(args: UpdateUser): Promise<import(".prisma/client").User>;
    delete(args: string): Promise<import(".prisma/client").User>;
}
