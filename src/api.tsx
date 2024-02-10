import { Dog } from "./types";

const BASE_URL = "http://localhost:3000";
const endPoint = "dogs";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${BASE_URL}/${endPoint}`).then((response) => response.json()),

  postDog: () => {
    // fill out method
  },

  deleteDogRequest: (id: number): Promise<Response> =>
    //optimistic rendering
    fetch(`${BASE_URL}/${endPoint}/${id}`, {
      method: "DELETE",
    }),

  patchFavoriteForDog: (id: number, body: Partial<Dog>): Promise<Response> =>
    //optimistic rendering
    fetch(`${BASE_URL}/${endPoint}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }),
};
