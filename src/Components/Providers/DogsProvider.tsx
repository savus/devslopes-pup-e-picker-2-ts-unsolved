import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog } from "../../types";
import { Requests } from "../../api";
import toast from "react-hot-toast";
import { useActiveTabState } from "./ActiveTabProvider";

const serverErrorMessage = "Oops...something went wrong";

type TDogsProvider = {
  allDogs: Dog[];
  filteredDogs: Dog[];
  numOfFavorited: number;
  numOfUnfavorited: number;
  isLoading: boolean;
};

const DogsContext = createContext({} as TDogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const { activeTabState } = useActiveTabState();
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  let numOfFavorited = 0;
  let numOfUnfavorited = 0;

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .catch(() => toast.error(serverErrorMessage))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refetchData();
  }, []);

  const filteredDogs = allDogs.filter((dog) => {
    dog.isFavorite ? numOfFavorited++ : numOfUnfavorited++;
    switch (activeTabState) {
      case "all-dogs":
        return true;
      case "create-dog":
        return false;
      case "favorited":
        return dog.isFavorite;
      case "unfavorited":
        return !dog.isFavorite;
    }
  });

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        filteredDogs,
        numOfFavorited,
        numOfUnfavorited,
        isLoading,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
