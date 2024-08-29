import React, { createContext, useState } from 'react';

import { type UserLogin, loginService } from '../auth';

export interface AuthContextValue {
  userData: UserLogin | undefined;
  login: (email: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserLogin>();

  const login = async (email: string) => {
    const res = await loginService(email);
    if (res === null) {
      return false;
    }

    setUserData(res.data.user);
    return true;
  };

  return (
    <AuthContext.Provider value={{ userData, login }}>
      {children}
    </AuthContext.Provider>
  );
};
