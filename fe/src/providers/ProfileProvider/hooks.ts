import { useContext } from 'react';
import { ProfileStateContext } from './context';

export function useProfileState() {
  return useContext(ProfileStateContext);
}
