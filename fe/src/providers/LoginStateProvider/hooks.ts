import { useContext } from 'react';
import { LoginStateContext } from './context';

export function useLoginState() {
  return useContext(LoginStateContext);
}
