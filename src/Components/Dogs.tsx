// Right now these dogs are constant, but in reality we should be getting these from our server

import { DogCard } from "./DogCard";
import { useDogs } from "./Providers/DogsProvider";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed
  {
    const { filteredDogs, isLoading } = useDogs();
    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {filteredDogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isLoading={isLoading}
            onEmptyHeartClick={() => console.log("clicked")}
            onHeartClick={() => console.log("clicked")}
            onTrashIconClick={() => console.log("clicked")}
          />
        ))}
      </>
    );
  };
