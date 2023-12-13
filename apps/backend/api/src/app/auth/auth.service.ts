import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthToken, UserCredentials } from "@k-rental/dtos";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { AuthTokenPayload } from "./models/auth-tokens";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { BookingAgent } from "./entities/booking-agent.entity";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(BookingAgent)
        private agentRepo: Repository<BookingAgent>,

        private jwtService: JwtService,
        private configService: ConfigService,
    ) {

    }


    public async getUserByEmail(email: string, params?:{ withAgent: boolean }): Promise<User> {

        const { withAgent } = params ?? {};
        return await this.userRepo.findOne({
            where: {
                email
            },
            relations: {
                agent: !!withAgent
            }
        });
    }

    private async createToken(user: { email: string }): Promise<AuthToken> {

        const token: AuthTokenPayload = {
            email: user.email
        }


        const authToken = await this.jwtService.sign(token, {
            secret: this.configService.get('PRIVATE_KEY'),
            expiresIn: '1h'
        })

        return {
            authToken
        }
    }

    async registerUser(userCredentials: UserCredentials): Promise<AuthToken> {
        const { email, password } = userCredentials;
        const salt = await bcrypt.genSalt();

        const hashedPass = await bcrypt.hash(password, salt);

        const agent = await this.agentRepo.create();
        await this.agentRepo.save(agent);
        const user = await this.userRepo.create({
            email,
            password: hashedPass,
            agent
        });

        this.userRepo.save(user);

        return await this.createToken(user);
    }


    async login(userCreds: UserCredentials): Promise<AuthToken> {
        const { email, password } = userCreds;

        const user = await this.userRepo.findOneBy({
            email
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            throw new UnauthorizedException();
        }

        return await this.createToken(user);
    }




}