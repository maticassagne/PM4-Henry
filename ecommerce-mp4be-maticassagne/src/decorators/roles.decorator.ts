import { SetMetadata } from '@nestjs/common';
import { ERoles } from 'src/auth/roles.enum';

export const Roles = (...roles: ERoles[]) => SetMetadata('rol', roles);
