import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import { createContext, useContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser | null) => void;
  isAppLoading: boolean;
  setIsAppLoading: (v: boolean) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await authService.fetchAccountAPI();
      if (res.data) {
        const user = await userService.getUserAPI(res.data.user_id);
        setUser(user.data ?? null);
        setIsAuthenticated(true);
      }
      setIsAppLoading(false);
    };
    fetchAccount();
  }, []);

  return (
    <>
      {isAppLoading === false ? (
        <CurrentAppContext.Provider
          value={{
            isAuthenticated,
            user,
            setIsAuthenticated,
            setUser,
            isAppLoading,
            setIsAppLoading,
          }}
        >
          {props.children}
        </CurrentAppContext.Provider>
      ) : (
        <div className="fixed left-1/2 top-1/2 transform translate-x-1/2 translate-y-1/2">
          <ScaleLoader />
        </div>
      )}
    </>
  );
};

export const UseCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error(
      "useCurrentApp has to be used within <CurrentUserContext.Provider>"
    );
  }
  return currentAppContext;
};
