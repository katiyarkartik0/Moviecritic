"use client";
import { deleteMovie } from "@/api/movie";
import formatDate from "@/helpers/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Movie {
  _id: string;
  name: string;
  date: string;
  ratings?: number;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await deleteMovie({ movieId: movie._id });
      const { msg } = await response.json();
      alert(msg)
      router.refresh();
    } catch (error) {
      alert(error)
    }
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-secondary m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.name}</div>
        <p className="text-gray-700 text-base">
          Release Date: {formatDate(new Date(movie.date))}
        </p>
        {movie.ratings && (
          <p className="text-gray-700 text-base">Ratings: {movie.ratings}/10</p>
        )}
      </div>
      <div className="px-6 py-4">
        <Link
          href={`?editMovie=true&movieId=${movie._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Edit
        </Link>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
