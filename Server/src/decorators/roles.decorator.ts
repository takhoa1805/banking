import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/role-key.constant';
import { Role } from '../constants/role.constant';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
