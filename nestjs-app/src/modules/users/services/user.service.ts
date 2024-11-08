import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { UserLoginDto } from "../domains/dtos/requests/user-login.dto";
import { UserInfoDto } from "../domains/dtos/responses/user-info.dto";
import { IUserRepository } from "../repositories/user.repository";

export interface IUserService {
    getUserForAuth(userLoginDto: UserLoginDto): Promise<UserInfoDto | null>;
}

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async getUserForAuth(userLoginDto: UserLoginDto): Promise<UserInfoDto | null> {
        try {
            const userEntity = await this.userRepository.findUserForAuth(userLoginDto);

            if (!userEntity) {
                return null;
            } else {
                return new UserInfoDto(userEntity);
            }
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }
}