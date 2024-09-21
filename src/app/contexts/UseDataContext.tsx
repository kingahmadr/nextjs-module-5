"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// import { hasCookie } from "cookies-next";
import { Authorization } from "../lib/Authorization";
interface userLoginProps {
  access_token: string;
  token: string;
}

interface DataContextType {
  isAuthenticated?: boolean;
  triggerInContext: boolean;
  userToken?: userLoginProps;
  total: number;
  isLoading: boolean;
  addCartTotalContext: () => void;
  handleTrigger: () => void;
  login: () => void;
  handleToken: (token: userLoginProps) => void;
  setLoadingState: (value: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //   const [isAuthenticated, setIsAuthenticated] = useState(() => {
  //     const result = hasCookie("token");
  //     return !!result;
  //   });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // useEffect( () => {
  //   const result = hasCookie("token");
  //   if (result) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);
  useEffect(() => {
    // async function getAuthorizedValue() {
    //   const authorized = await Authorization();
    //   return authorized;
    // }
    const fetchAuthorizedValue = async () => {
      const authorized = await Authorization();
      if (authorized !== null && authorized !== undefined) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    // const result = hasCookie("token");
    // if (result) {
    //   setIsAuthenticated(true);
    // }
    fetchAuthorizedValue();
    // const hasil = await fetchAuthorizedValue()
    // console.log("authorized value from context", getAuthorizedValue());
  }, []);
  console.log("isAuthenticated in context", isAuthenticated);
  const [total, setTotal] = useState(0);
  const [triggerInContext, setTriggerInContext] = useState(false);
  const [userToken, setUserToken] = useState<userLoginProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoadingState = (value: boolean) => {
    setIsLoading(value);
  };
  const login = () => {
    setIsAuthenticated(true);
  };
  const handleToken = (token: userLoginProps) => {
    setUserToken(token);
  };
  const handleTrigger = () => {
    setTriggerInContext(!triggerInContext);
  };
  const addCartTotalContext = () => {
    const existingCartItems = JSON.parse(
      localStorage.getItem("Carted") || "[]"
    );
    const itemTotal = existingCartItems.length;
    setTotal(itemTotal);
  };
  useEffect(() => addCartTotalContext(), [triggerInContext]);

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        triggerInContext,
        total,
        userToken,
        isLoading,
        handleToken,
        login,
        addCartTotalContext,
        handleTrigger,
        setLoadingState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const UseDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within an AuthProvider");
  }
  return context;
};
