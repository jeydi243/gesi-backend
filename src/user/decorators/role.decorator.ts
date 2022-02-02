import { SetMetadata } from '@nestjs/common';

//We set this metadata for permissions roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);