import { createContext } from 'react';
import { ProfileState } from './type';

export const defaultProfileState: ProfileState = {
  role: '',
};

export const ProfileStateContext =
  createContext<ProfileState>(defaultProfileState);
