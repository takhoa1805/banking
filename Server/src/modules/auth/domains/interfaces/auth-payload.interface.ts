import { Role } from '../../../../constants/role.constant';

export interface AuthPayload {
  id: string;
  name: string;
  username: string;
  role: Role;
}
