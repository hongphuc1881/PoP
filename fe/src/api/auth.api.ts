import { AuthResponse } from '../types/auth.type';
import http from '../utils/http';

export const registerAccount = (body: {
  email: string;
  password: string;
  gender: string;
  username: string;
  fullName: string;
}) => http.post<AuthResponse>('/api/auth/register', body);

export const loginAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse>('/api/auth/login', body);

export const logout = () => http.post('/api/auth/logout');
