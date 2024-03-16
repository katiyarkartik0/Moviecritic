import { fetchAllMovies } from "@/api/movie";
import MovieCard from "@/components/Card/MovieCard";
import Image from "next/image";

export default async function Home() {
  const { movies } = await (async () => {
    const response = await fetchAllMovies();
    return await response.json();
  })();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="max-w-5xl w-full items-center justify-between">
        <p className="">The best movie review site!</p>
        <div className="w-1/2 h-11 rounded border-2 border-primary flex items-center justify-between">
          <div className="flex space-x-3 pl-6 w-full">
            <button>
              <Image
                width={20}
                height={20}
                alt="glass"
                src="/assets/magnifying_glass.png"
              />
            </button>
            <input
              type="text"
              className="p-2 w-full focus:outline-none"
              placeholder="Search for your favorite movie"
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          {movies.map((movie: any) => (
            <MovieCard movie={movie} key={movie._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
