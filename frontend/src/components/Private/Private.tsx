import { Navigate, Outlet } from 'react-router-dom';
import { UserContext, UserContextType } from '../../Contexts/UserContext';
import { useContext } from 'react';

const Private = () => {
  const { userInfo } = useContext(
    UserContext as React.Context<UserContextType>
  );
  const auth =
    userInfo?.token ||
    JSON.parse(localStorage.getItem('userInfo') ?? '{}')?.token;
  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default Private;
