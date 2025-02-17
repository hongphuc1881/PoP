import useRouteElements from './hooks/useRouteElements';
import { LoginStateProvider } from './providers/LoginStateProvider';
import { ProfileStateProvider } from './providers/ProfileProvider';
import { getTokenFromLS } from './utils/auth';

function App() {
  const routeElements = useRouteElements();
  return (
    <>
      <LoginStateProvider loginState={{ isLogin: Boolean(getTokenFromLS()) }}>
        <ProfileStateProvider
          profileState={{
            role: 'user',
          }}
        >
          {routeElements}
        </ProfileStateProvider>
      </LoginStateProvider>
    </>
  );
}

export default App;
