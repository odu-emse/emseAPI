import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {PrismaService} from "../prisma.service";
import {AuthGuard} from "../auth.guard";

const JWT = ""

describe('AuthService', () => {
    let service: AuthService;
    let resolver: AuthResolver;
    let prisma: PrismaService;
    prisma = new PrismaService();

    beforeEach(async () => {
        service = new AuthService(prisma);
        resolver = new AuthResolver(service);
    });

    it('should be defined and have accessible methods', () => {
        expect(service).toBeDefined();
        expect(service.fetchToken("")).toBeDefined();
        expect(service.refreshToken("")).toBeDefined();
        expect(service.updateUserData(JWT)).toBeDefined();
        expect(service.registerUser({
            email: "",
            firstName: "Testin",
            lastName: "Account",
            openID: "",
            middleName: "",
            picURL: ""
        })).toBeDefined();
    });
    it('should have resolvers', () => {
        expect(resolver).toBeDefined();
        expect(resolver.login("")).toBeDefined();
    });
});

describe('AuthGuard', () => {
    const guard = new AuthGuard()
    it('should be defined', () => {
        expect(guard).toBeDefined();
    });
});