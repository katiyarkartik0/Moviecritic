"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createMovie, editMovie, fetchMovie } from "@/api/movie";

import { fieldValidation } from "@/helpers/validator";

const MovieForm = () => {
  const searchParams = useSearchParams();

  const createMode = searchParams.get("createMovie");
  const editMode = searchParams.get("editMovie");
  const movieId = searchParams.get("movieId");

  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (editMode && movieId) {
      try {
        (async () => {
          setIsFetching(true);
          const response = await fetchMovie({ movieId });
          const {
            movie: { _id, name, date },
          } = await response.json();
          setFormData({
            _id,
            name,
            date: new Date(date).toISOString().split("T")[0],
          });
          setIsFetching(false);
        })();
      } catch (error) {
        alert(error);
      }
    } else if (createMode) {
      setFormData({
        name: "",
        date: "",
      });
    }
  }, []);

  const router = useRouter();

  const handleSubmit = async (e:any) => {
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
        await createMovie({ movie: formData });
      } else if (editMode) {
        await editMovie({ movie: formData });
      }
    } catch (error) {
      alert(error);
    }

    setIsLoading(false);
    setFormData({ name: "", date: "" });
    router.refresh();
  };

  const handleForm = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderButtonText = () => {
    if (isLoading) {
      return "Loading...";
    } else if (createMode) {
      return "Create Movie";
    } else if (editMode) {
      return "Edit Movie";
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
          <input
            defaultValue={formData.name}
            type="text"
            className="p-2 w-full h-11 rounded border-2 border-gray-400 flex items-center justify-between"
            placeholder="Name"
            name="name"
          />
          <br />
          <input
            defaultValue={formData.date}
            type="date"
            name="date"
            className="p-2 w-full h-11 rounded border-2 border-gray-400 flex items-center justify-between"
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

export default MovieForm;
