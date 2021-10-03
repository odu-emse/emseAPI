import { Injectable, UnauthorizedException  } from "@nestjs/common";
import { PassportStrategy } from "@nesjs/passsport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";
import { Token } from "gql/graphql";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    async validate(payload:string){
        const user = await this.service.validateUser(payload)

        if(!user){
            throw new UnanthorizedException()

        }
        return user
    }
}