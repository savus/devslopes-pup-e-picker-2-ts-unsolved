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
import { useLoadingState } from "./LoadingStateProvider";

const serverErrorMessage = "Oops...something went wrong";

type TDogsProvider = {
  allDogs: Dog[];
  filteredDogs: Dog[];
  numOfFavorited: number;
  numOfUnfavorited: number;
  postDog: (body: Omit<Dog, "id">) => Promise<string | void>;
  updateDog: (id: number, body: Partial<Dog>) => Promise<void>;
  deleteDog: (id: number) => Promise<void>;
};

const DogsContext = createContext({} as TDogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const { activeTabState } = useActiveTabState();
  const { setIsLoading } = useLoadingState();
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  let numOfFavorited = 0;
  let numOfUnfavorited = 0;

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
      .then(() => {
        toast.success("Dog Created!");
        return refetchData();
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

    return Requests.patchFavoriteForDog(id, { ...body }).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
      } else return;
    });
  };

  const deleteDog = (id: number) => {
    //optimistic rendering
    setAllDogs(allDogs.filter((dog) => dog.id !== id));

    return Requests.deleteDogRequest(id).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
      } else return;
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
        postDog,
        updateDog,
        deleteDog,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
