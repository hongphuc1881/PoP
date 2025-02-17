import { ReactNode, useEffect, useState } from 'react';
import { ProfileStateContext, defaultProfileState } from './context';
import { ProfileState } from './type';

type Props = {
  children: ReactNode;
  profileState: ProfileState;
};

export const ProfileStateProvider = ({
  children,
  profileState = defaultProfileState,
}: Props) => {
  const [state, setState] = useState(profileState);
  useEffect(() => {
    setState(profileState);
  }, [profileState]);

  return (
    <ProfileStateContext.Provider value={state}>
      {children}
    </ProfileStateContext.Provider>
  );
};
