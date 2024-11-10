import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/role-key.constant';
import { Role } from 'src/constants/role.constant';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
