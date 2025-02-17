import { User } from './user.type.ts';
import { SuccessResponseApi } from './utils.type';

export type AuthResponse = SuccessResponseApi<{
  token: string;
  user: User;
}>;
