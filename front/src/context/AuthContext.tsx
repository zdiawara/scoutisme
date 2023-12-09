import { FC, ReactNode, createContext, useContext, useState } from "react";
import { UserResource } from "types/auth.type";

type AuthContextProps = {
  user: UserResource | null;
  setUser: (user: UserResource) => void;
};

export const AuthContent = createContext<AuthContextProps>(
  {} as AuthContextProps
);

type AuthProviderProps = {
  children: ReactNode;
  //initial: Filter;
};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, _setUser] = useState<UserResource | null>(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // set user to local storage
  const setUser = (user: UserResource) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    _setUser(user);
  };

  return (
    <AuthContent.Provider value={{ user, setUser }}>
      {children}
    </AuthContent.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContent);
};
