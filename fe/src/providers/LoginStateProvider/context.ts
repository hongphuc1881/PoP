import { createContext } from 'react';
import { LoginState } from './type';

export const defaultLoginState: LoginState = {
  isLogin: false,
};

export const LoginStateContext = createContext<LoginState>(defaultLoginState);
