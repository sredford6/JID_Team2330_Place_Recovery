import React from "react";

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
}

export const AuthContext = React.createContext({});

export const HomeContext = React.createContext<UserInfo>({
  email: "",
  firstName: "",
  lastName: "",
});