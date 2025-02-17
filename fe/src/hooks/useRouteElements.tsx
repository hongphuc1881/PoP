import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import MainLayout from '../components/layouts';
import internalPath from '../constants/path';
import Admin from '../pages/admin';
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Register from '../pages/register';
import { useLoginState } from '../providers/LoginStateProvider';
import { useProfileState } from '../providers/ProfileProvider';

const AdminRoute = () => {
  const { role } = useProfileState();
  return role == 'admin' ? <Outlet /> : <Navigate to={internalPath.home} />;
};

const RequireLoginRoute = () => {
  const { isLogin } = useLoginState();
  return isLogin ? <Outlet /> : <Navigate to={internalPath.login} />;
};

const RejectedRoute = () => {
  const { isLogin } = useLoginState();
  return !isLogin ? <Outlet /> : <Navigate to={internalPath.home} />;
};

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: internalPath.home,
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
    {
      path: '',
      element: (
        <MainLayout>
          <RejectedRoute />
        </MainLayout>
      ),
      children: [
        {
          path: internalPath.register,
          element: <Register />,
        },
        {
          path: internalPath.login,
          element: <Login />,
        },
      ],
    },
    {
      path: '',
      element: (
        <MainLayout>
          <RequireLoginRoute />
        </MainLayout>
      ),
      children: [
        {
          path: internalPath.profile,
          element: <Profile />,
        },
      ],
    },
    {
      path: '',
      element: <AdminRoute />,
      children: [
        {
          path: '/admin',
          element: <Admin />,
        },
      ],
    },
  ]);
  return routeElements;
}
