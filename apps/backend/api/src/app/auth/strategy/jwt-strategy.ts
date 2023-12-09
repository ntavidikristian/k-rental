import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthTokenPayload } from "../models/auth-tokens";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private confiService: ConfigService,
        private authService: AuthService,
    ){
        super({
            secretOrKey: confiService.get('PRIVATE_KEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: AuthTokenPayload){
        const { email } = payload;
        const user =  await this.authService.getUserByEmail(email, { withAgent: true });
        return user;
    }
}