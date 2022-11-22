import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {PrismaService} from "../prisma.service";
import {AuthGuard} from "../auth.guard";

let JWT = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMTA2ODY4MzQwMjc3MDEyNDQ5MTEiLCJlbWFpbCI6ImV4YW1wbGVfdGVzdGluZ19lbWFpbEBvZHUuZWR1IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTBZTUdjb2c4a0JWVWtxcUIzOVJnZU9ZOG9pRzBRZ0lKenFkZFBmWUE9czk2LWMiLCJnaXZlbl9uYW1lIjoiREFOSUVMIEIuIiwiZmFtaWx5X25hbWUiOiJQQVBQIiwiaWF0IjoxNjY5MTMzNjc1LCJleHAiOjE2NjkxMzcyNzV9.M81DGuJbYE86WK8q3aiCHvLUennpIdtViHwMrFXNEqZKisK5VvYN1IqbY7MKtKCFEKopxpXL2PeEuX4VZkYO0j1h4CjThgbl8LITNsVzXLMj-Jco0xcdCyXeVKu3m-e1MAqsHjEB0sA8c8XMWn_VZq5efTwV8sItt0h4RNKJKfUuH5l7kr8Gm1CfbUPTTbD8Sf4K5_WSu5dYVxWC4cvkF7opRUshOSVn1_-TJV2kNZCEChQ76DDDHPhFO5DkUseqhHK2GPjWfTHH7KjrrnCnlSdZ2MC_9ODU3eMz5L7rz9VapUSEAJH9-lHUQzCvwq9nUer0zSI7OQVKK7Hsmexw7A"

describe('AuthService', () => {
    let service: AuthService;
    let resolver: AuthResolver;
    let prisma: PrismaService;
    prisma = new PrismaService();

    beforeEach(async () => {
        service = new AuthService(prisma);
        resolver = new AuthResolver(service);
    });
    afterEach(async () => {
        await prisma.$disconnect();
    })

    it('should be defined and have accessible methods', () => {
        expect(service).toBeDefined();
        expect(service.fetchToken("")).toBeDefined();
        expect(service.refreshToken("")).toBeDefined();
        expect(service.updateUserData(JWT)).toBeDefined()
        expect(service.registerUser({
            email: "",
            firstName: "Testin",
            lastName: "Account",
            openID: "",
            middleName: "",
            picURL: ""
        })).toBeDefined()
    });
    it('should have resolvers', () => {
        expect(resolver).toBeDefined();
        //TODO: figure out how to pass a login code to the resolver
        //expect(resolver.login("")).toBeDefined();
    });
});

describe('AuthGuard', () => {
    const guard = new AuthGuard()
    it('should be defined', () => {
        expect(guard).toBeDefined();
    });
});