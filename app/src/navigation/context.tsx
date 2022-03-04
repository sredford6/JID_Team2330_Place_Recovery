import React from "react";

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthFunctions {
  signIn(token: string): any;
  signUp(token: string): any;
  signOut(): any;
}

interface AuthContextType {
  authFunctions: AuthFunctions;
  userInfo: UserInfo;
}

export const AuthContext = React.createContext<AuthContextType>({
  authFunctions: {
    signIn: (token: string) => {},
    signUp: (token: string) => {},
    signOut: () => {},
  },
  userInfo: { email: "", firstName: "", lastName: "" },
});

export const HomeContext = React.createContext<UserInfo>({
  email: "",
  firstName: "",
  lastName: "",
});