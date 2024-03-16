"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { fieldValidation } from "@/helpers/validator";
import { createReview, editReview, fetchReview } from "@/api/review";
import { fetchAllMovies } from "@/api/movie";

const ReviewForm = () => {
  const searchParams = useSearchParams();

  const createMode = searchParams.get("createReview");
  const editMode = searchParams.get("editReview");
  const reviewId = searchParams.get("reviewId");

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [movies, setIsMovies] = useState([]);

  useEffect(() => {
    if (editMode && reviewId) {
      try {
        (async () => {
          setIsFetching(true);
          const response = await fetchReview({ reviewId });
          const { review } = await response.json();
          setFormData({ review });
          setIsFetching(false);
        })();
      } catch (error) {
        alert(error);
      }
    } else if (createMode) {
      try {
        (async () => {
          setIsFetching(true);
          const response = await fetchAllMovies();
          const { movies } = await response.json();
          setIsMovies(movies);
          setIsFetching(false);
        })();
      } catch (error) {
        alert(error);
      }
      setFormData({
        movieId: "",
        name: "",
        rating: "",
        comment: "",
      });
    }
  }, []);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { isDataValid, field, msg } = fieldValidation(formData);
      if (!isDataValid) {
        if (field !== undefined) {
          throw new Error(msg);
        }
        return;
      }
      if (createMode) {
        await createReview({ review: formData });
      } else if (editMode) {
        await editReview({ review: formData });
      }
    } catch (error) {
      alert(error);
    }

    setIsLoading(false);
    setFormData({ name: "", date: "" });
    router.refresh();
  };

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderButtonText = () => {
    if (isLoading) {
      return "Loading...";
    } else if (createMode) {
      return "Create Review";
    } else if (editMode) {
      return "Edit Review";
    }
  };

  return (
    <form
      onChange={handleForm}
      onSubmit={handleSubmit}
      className="w-full flex flex-col"
    >
      {!isFetching && (
        <>
          <select
            name="movieId"
            id="cars"
            className="p-2 w-full h-11 rounded border-2 border-gray-400 flex items-center justify-between"
          >
            <option value="">Select a movie</option>
            {movies.map(({ _id, name }) => (
              <option value={_id}>{name}</option>
            ))}
          </select>
          <br />
          <input
            placeholder="Your Name"
            defaultValue={formData.name}
            type="text"
            name="name"
            className="p-2 w-full h-11 rounded border-2 border-gray-400 flex items-center justify-between"
          />
          <br />
          <input
            placeholder="Rating out of 10"
            defaultValue={formData.rating}
            type="number"
            name="rating"
            className="p-2 w-full h-11 rounded border-2 border-gray-400 flex items-center justify-between"
          />
          <br />
          <textarea
            placeholder="Comments"
            defaultValue={formData.comment}
            name="comment"
            className="p-2 w-full rounded border-2 border-gray-400 flex items-center justify-between"
          />
          <br />
        </>
      )}
      {isFetching && <>Fetching data...</>}

      <button
        type="submit"
        className="text-white bg-primary py-2 px-4 rounded-md font-medium self-end"
        disabled={isLoading || isFetching}
      >
        {renderButtonText()}
      </button>
    </form>
  );
};

export default ReviewForm;
