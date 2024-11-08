import { Body, Controller, Post, Inject } from "@nestjs/common";
import { IUserService } from "../services/user.service";
import { UserLoginDto } from "../domains/dtos/requests/user-login.dto";
import { UserInfoDto } from "../domains/dtos/responses/user-info.dto";

@Controller('users')
export class UserController {
    constructor(
        @Inject('IUserService')
        private readonly userService: IUserService,
    ) {}
    
    @Post('')
    async getUserForAuth(@Body() userLoginDto: UserLoginDto): Promise<UserInfoDto | null> {
        return this.userService.getUserForAuth(userLoginDto);
    }
}