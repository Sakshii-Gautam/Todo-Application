import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

export interface User {
  username: string;
  password: string;
  token?: string;
}

export interface UserContextType {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<User>({
    username: '',
    password: '',
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
