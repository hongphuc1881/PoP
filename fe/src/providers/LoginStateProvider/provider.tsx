import { ReactNode, useEffect, useState } from 'react';
import { defaultLoginState, LoginStateContext } from './context';
import { LoginState } from './type';

type Props = {
  children: ReactNode;
  loginState: LoginState;
};

export const LoginStateProvider = ({
  children,
  loginState = defaultLoginState,
}: Props) => {
  const [state, setState] = useState(loginState);
  useEffect(() => {
    setState(loginState);
  }, [loginState]);

  return (
    <LoginStateContext.Provider value={state}>
      {children}
    </LoginStateContext.Provider>
  );
};
