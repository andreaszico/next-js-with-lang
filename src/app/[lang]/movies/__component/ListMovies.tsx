"use client";

import { useMovieStore } from "../__store/movie.store";

function ListMovies() {
  const { movies, addMovie } = useMovieStore();

  const handleAddMovie = () => {
    addMovie({ title: "New Movie", duration: 120, genre: "Drama" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-2xl rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Movie List
        </h1>
        <div className="space-y-4">
          {movies.map((movie, id) => (
            <div
              key={`movie-${id}-${movie.title}`}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {movie.genre} • {movie.duration} min
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddMovie}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Movie
        </button>
      </div>
    </div>
  );
}

export default ListMovies;
