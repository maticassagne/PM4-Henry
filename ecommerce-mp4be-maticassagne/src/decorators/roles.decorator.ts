import { SetMetadata } from '@nestjs/common';
import { ERoles } from '../auth/roles.enum';

export const Roles = (...roles: ERoles[]) => SetMetadata('rol', roles);
