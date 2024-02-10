const BASE_URL = "http://localhost:3000";
const endPoint = "dogs";

export const Requests = {
  getAllDogs: () =>
    fetch(`${BASE_URL}/${endPoint}`).then((response) => response.json()),

  postDog: () => {
    // fill out method
  },

  deleteDogRequest: () => {
    // fill out method
  },

  patchFavoriteForDog: () => {
    // fill out method
  },
};
