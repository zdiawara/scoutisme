import { FC, ReactNode, createContext, useContext, useState } from "react";
import { UserResource } from "types/auth.type";
import { UserDroit } from "utils/droits";

type AuthContextProps = {
  user: UserResource | null | undefined;
  userDroit: UserDroit | undefined;
  setUser: (user?: UserResource) => void;
};

export const AuthContent = createContext<AuthContextProps>(
  {} as AuthContextProps
);

type AuthProviderProps = {
  children: ReactNode;
  //initial: Filter;
};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, _setUser] = useState<UserResource | undefined>(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  const [userDroit, setDroits] = useState<UserDroit | undefined>();

  // set user to local storage
  const setUser = (user?: UserResource) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    _setUser(user);
    setDroits(user ? new UserDroit(user) : undefined);
  };

  return (
    <AuthContent.Provider value={{ user, setUser, userDroit }}>
      {children}
    </AuthContent.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContent);
};
