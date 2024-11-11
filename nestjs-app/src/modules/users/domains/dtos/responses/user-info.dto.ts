import { Role } from '../../../../../constants/role.constant';
import { UserEntity } from '../../entities/user.entity';

export class UserInfoDto {
  id: number;
  name: string;
  username: string;
  role: Role;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.username = userEntity.name;
    this.role = userEntity.role;
  }
}
