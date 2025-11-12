"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface GlobalContextType {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true" || false);

  const setDarkmodeFunc : Dispatch<SetStateAction<boolean>> = (value) => {
    setIsDarkMode(value);
    // localStorage.setItem("darkMode", value ? "true" : "false");
  };

  const value = { isDarkMode, setIsDarkMode: setDarkmodeFunc };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
