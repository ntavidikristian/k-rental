import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserCredentials } from "@k-rental/dtos";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { AuthToken, AuthTokenPayload } from "./models/auth-tokens";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){
        
    }


    private async createToken(user: {email: string}): Promise<AuthToken>{

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
    
    async registerUser(userCredentials: UserCredentials): Promise<AuthToken>{
        const { email, password } = userCredentials;
        const salt = await bcrypt.genSalt();

        const hashedPass = await bcrypt.hash(password, salt);


        const user = await this.userRepo.create({
            email,
            password: hashedPass
        });


        await this.userRepo.save(user);

        return await this.createToken(user);
    }


    async login(userCreds: UserCredentials): Promise<AuthToken>{
        const { email, password } = userCreds;

        const user = await this.userRepo.findOne({where: {
            email
        }});

        if(!user){
            throw new UnauthorizedException();
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if(!passwordsMatch){
            throw new UnauthorizedException();
        }

        return await this.createToken(user);
    }



    
}