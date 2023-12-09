import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { BookingAgent } from "./entities/booking-agent.entity";
import { User } from "./entities/user.entity";
import { JwtStrategy } from "./strategy/jwt-strategy";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('PRIVATE_KEY'),
            })
        }),

        TypeOrmModule.forFeature([ User, BookingAgent]),
        ConfigModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, JwtStrategy]
})
export class AuthModule{

}