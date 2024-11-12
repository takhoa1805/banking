import { Role } from '../../../../../constants/role.constant';

export class UserCreationDto {
  name: string;
  username: string;
  password: string;
  role: Role;
  email?: string;

  constructor(
    name: string,
    username: string,
    password: string,
    role: Role,
    email?: string,
  ) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }
}
