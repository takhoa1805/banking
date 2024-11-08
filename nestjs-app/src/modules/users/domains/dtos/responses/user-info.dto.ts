import { UserEntity } from '../../entities/user.entity';

export class UserInfoDto {
  id: number;
  name: string;
  username: string;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.username = userEntity.name;
  }
}
