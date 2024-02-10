import { ReactNode, createContext, useContext, useState } from "react";
import { TActiveTabState } from "../../types";

type TActiveTabProvider = {
  activeTabState: TActiveTabState;
  setActiveTabState: (input: TActiveTabState) => void;
};

const ActiveTabContext = createContext({} as TActiveTabProvider);

export const ActiveTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTabState, setActiveTabState] =
    useState<TActiveTabState>("all-dogs");
  return (
    <ActiveTabContext.Provider value={{ activeTabState, setActiveTabState }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTabState = () => useContext(ActiveTabContext);
