import { UserCredentials } from "@k-rental/dtos";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthToken } from "./models/auth-tokens";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        private authService:AuthService
    ){

    }

    @Post('/signup')
    async signUp(@Body() userCreds: UserCredentials): Promise<AuthToken>{
        return this.authService.registerUser(userCreds);
    }


    @Post('/login')
    async login(@Body() userCreds: UserCredentials): Promise<AuthToken>{
        return this.authService.login(userCreds);
    }
}