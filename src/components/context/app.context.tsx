import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import { createContext, useContext, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser | null) => void;
  isAppLoading: boolean;
  setIsAppLoading: (v: boolean) => void;
  isDoingTest: boolean;
  setIsDoingTest: (v: boolean) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isDoingTest, setIsDoingTest] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await authService.fetchAccountAPI();
        if (res.data) {
          const userRes = await userService.getUserAPI(res.data.user_id);
          setUser(userRes.data ?? null);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsAppLoading(false);
      }
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
            isDoingTest,
            setIsDoingTest,
          }}
        >
          {props.children}
        </CurrentAppContext.Provider>
      ) : (
        <div className="fixed left-1/2 top-1/2 transform translate-x-1/2 translate-y-1/2">
          <HashLoader cssOverride={{}} loading size={100} speedMultiplier={1} />
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
