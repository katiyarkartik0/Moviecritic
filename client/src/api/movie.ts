import ENDPOINT from "@/helpers/constants";

export const createMovie = async ({ movie }) =>
  await fetch(`${ENDPOINT}/api/movie/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

export const editMovie = async ({ movie }) =>
  await fetch(`${ENDPOINT}/api/movie/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

export const deleteMovie = async ({ movieId }) =>
  await fetch(`${ENDPOINT}/api/movie/delete/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const fetchAllMovies = async () =>
  await fetch(`${ENDPOINT}/api/movie/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

export const fetchMovie = async ({ movieId }) =>
  await fetch(`${ENDPOINT}/api/movie/get/${movieId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
