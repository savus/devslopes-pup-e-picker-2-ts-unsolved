import { Dog } from "./types";

const BASE_URL = "http://localhost:3000";
const endPoint = "dogs";

const getAllDogs = (): Promise<Dog[]> =>
  //pessimistic rendering
  fetch(`${BASE_URL}/${endPoint}`).then((response) => response.json());

const postDog = (body: Omit<Dog, "id">) =>
  fetch(`${BASE_URL}/${endPoint}`, {
    //pessimistic rendering
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());

const deleteDogRequest = (id: number): Promise<unknown> =>
  //optimistic rendering
  fetch(`${BASE_URL}/${endPoint}/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Could not delete dog ${id}`);
    } else {
      return response.json();
    }
  });

const patchFavoriteForDog = (
  id: number,
  body: Partial<Dog>
): Promise<unknown> =>
  //optimistic rendering
  fetch(`${BASE_URL}/${endPoint}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Could not patch dog ${id}`);
    } else {
      return response.json();
    }
  });

export const Requests = {
  getAllDogs,
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
};
