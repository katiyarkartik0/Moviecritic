import ENDPOINT from "@/helpers/constants";

export const createReview = async ({ review }) =>
  await fetch(`${ENDPOINT}/api/review/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

export const editReview = async ({ review }) =>
  await fetch(`${ENDPOINT}/api/review/create`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

export const deleteReview = async ({ reviewId }) =>
  await fetch(`${ENDPOINT}/api/review/delete/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });


export const fetchReview = async ({ reviewId }) =>
  await fetch(`${ENDPOINT}/api/review/get/${reviewId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
