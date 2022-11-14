import { PrismaService } from '../prisma.service';
import { Prisma, User } from "@prisma/client";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    fetchToken(code: String): Promise<Response>;
    updateUserData(id_token: string): Promise<Error | User>;
    registerUser(data: Prisma.UserCreateInput): Promise<User | Error>;
    refreshToken(token: String): Promise<Response>;
}
