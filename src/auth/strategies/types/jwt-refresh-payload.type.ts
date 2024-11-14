import { User } from '../../../users/domain/user';

export type JwtRefreshPayloadType = {
  userId: User['id'];
  hash: string;
  iat: number;
  exp: number;
};
