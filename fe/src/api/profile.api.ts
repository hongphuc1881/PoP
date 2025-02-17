import { User } from '../types/user.type.ts';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

interface BodyUpdateProfile
  extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string;
  newPassword?: string;
}

export const getProfile = () =>
  http.get<SuccessResponseApi<BodyUpdateProfile>>('/api/profile');
