import React from "react";

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthFunctions {
  signIn(token: string): any;
  signOut(): any;
}

interface AuthContextType {
  authFunctions: AuthFunctions;
  userInfo: UserInfo;
}

interface HomeFunctions {
  storeSubmitTime(time: number): any;
}

export interface HomeContextType {
  homeFunctions: HomeFunctions;
  homeVariables: string;
}

export const AuthContext = React.createContext<AuthContextType>({
  authFunctions: {
    signIn: (token: string) => {},
    signOut: () => {},
  },
  userInfo: { email: "", firstName: "", lastName: "" },
});

export const HomeContext = React.createContext<HomeContextType>({
  homeFunctions: {
    storeSubmitTime: (time: number) => {},
  },
  homeVariables: "abc",
});