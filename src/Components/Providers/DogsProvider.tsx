import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, TActiveTabState } from "../../types";
import { Requests } from "../../api";
import toast from "react-hot-toast";

const serverErrorMessage = "Oops...something went wrong";

type TDogsProvider = {
  allDogs: Dog[];
  filteredDogs: Dog[];
  numOfFavorited: number;
  numOfUnfavorited: number;
  postDog: (body: Omit<Dog, "id">) => Promise<string | void>;
  updateDog: (id: number, body: Partial<Dog>) => Promise<unknown>;
  deleteDog: (id: number) => Promise<unknown>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  activeTabState: TActiveTabState;
  setActiveTabState: (activeTabState: TActiveTabState) => void;
};

const DogsContext = createContext({} as TDogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [activeTabState, setActiveTabState] =
    useState<TActiveTabState>("all-dogs");
  const [isLoading, setIsLoading] = useState(false);

  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  const refetchData = () => {
    //pessimistic rendering
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .catch(() => toast.error(serverErrorMessage))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postDog = (body: Omit<Dog, "id">) => {
    //pessimistic rendering
    setIsLoading(true);
    return Requests.postDog(body)
      .then(refetchData)
      .then(() => {
        toast.success("Dog Created!");
      })
      .catch(() => {
        toast.error(serverErrorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateDog = (id: number, body: Partial<Dog>) => {
    //optimistic rendering
    setAllDogs(
      allDogs.map((dog) => (dog.id === id ? { ...dog, ...body } : dog))
    );

    return Requests.patchFavoriteForDog(id, { ...body }).catch(() => {
      toast.error(serverErrorMessage);
      setAllDogs(allDogs);
    });
  };

  const deleteDog = (id: number) => {
    //optimistic rendering
    setAllDogs(allDogs.filter((dog) => dog.id !== id));

    return Requests.deleteDogRequest(id).catch(() => {
      toast.error(serverErrorMessage);
      setAllDogs(allDogs);
    });
  };

  const buildDogData = (activeTabState: TActiveTabState, allDogs: Dog[]) => {
    let numOfFavorited = 0;
    let numOfUnfavorited = 0;

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

    return {
      filteredDogs,
      numOfFavorited,
      numOfUnfavorited,
    };
  };

  useEffect(() => {
    refetchData();
  }, []);

  const { filteredDogs, numOfFavorited, numOfUnfavorited } = buildDogData(
    activeTabState,
    allDogs
  );

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        filteredDogs,
        numOfFavorited,
        numOfUnfavorited,
        postDog,
        updateDog,
        deleteDog,
        isLoading,
        setIsLoading,
        activeTabState,
        setActiveTabState,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
