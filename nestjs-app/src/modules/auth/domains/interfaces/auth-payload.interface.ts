import { Role } from '../../../../constants/role.constant';

export interface AuthPayload {
  id: number;
  name: string;
  username: string;
  role: Role;
}
