import { Module } from "@nestjs/common";
import { UserModule } from "../user.module";
import { PassportModule } from "@nextjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register([
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '60s'
            },
        ]),

    ],
    providers: [],
    exports: [],
})
export class AuthModule{}