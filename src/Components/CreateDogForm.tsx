import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useActiveTabState } from "./Providers/ActiveTabProvider";
import { useDogs } from "./Providers/DogsProvider";
import { useLoadingState } from "./Providers/LoadingStateProvider";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(defaultSelectedImage);
    const { activeTabState } = useActiveTabState();
    const [dogNameInput, setDogNameInput] = useState("");
    const [dogDescriptionInput, setDogDescriptionInput] = useState("");
    const { postDog } = useDogs();
    const { isLoading } = useLoadingState();

    const resetValues = () => {
      setDogNameInput("");
      setDogDescriptionInput("");
      setSelectedImage(defaultSelectedImage);
    };

    return activeTabState === "create-dog" ? (
      <form
        action="#"
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          postDog({
            name: dogNameInput,
            description: dogDescriptionInput,
            image: selectedImage,
            isFavorite: false,
          }).then(() => {
            resetValues();
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          id="name"
          value={dogNameInput}
          onChange={(e) => setDogNameInput(e.target.value)}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id="description"
          cols={80}
          rows={10}
          value={dogDescriptionInput}
          onChange={(e) => setDogDescriptionInput(e.target.value)}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          value={selectedImage}
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    ) : (
      <></>
    );
  };
