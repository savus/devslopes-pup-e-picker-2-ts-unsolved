import { Dog } from "./types";

const BASE_URL = "http://localhost:3000";
const endPoint = "dogs";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> =>
    //pessimistic rendering
    fetch(`${BASE_URL}/${endPoint}`).then((response) => response.json()),

  postDog: (body: Omit<Dog, "id">) =>
    fetch(`${BASE_URL}/${endPoint}`, {
      //pessimistic rendering
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json()),

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
