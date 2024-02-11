import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TLoadingStateProvider = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const LoadingStateContext = createContext({} as TLoadingStateProvider);

export const LoadingStateProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingStateContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingStateContext.Provider>
  );
};

export const useLoadingState = () => useContext(LoadingStateContext);
