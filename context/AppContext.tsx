import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserUsername {
  username: string;
}

interface UserPassword {
  password: string;
}

interface AppContextProps {
  userUsername: UserUsername | null;
  setUserUsername: Dispatch<SetStateAction<UserUsername | null>>;
  userPassword: UserPassword | null;
  setUserPassword: Dispatch<SetStateAction<UserPassword | null>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [userUsername, setUserUsername] = useState<UserUsername | null>(null);
  const [userPassword, setUserPassword] = useState<UserPassword | null>(null);

  return (
    <AppContext.Provider
      value={{userUsername, setUserUsername, userPassword, setUserPassword}}>
      {children}
    </AppContext.Provider>
  );
};
