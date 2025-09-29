'use client';

import React from 'react';
import { useMovieViewModel } from '../viewmodels/movie.viewmodel';
import container from '@/container/container';

interface MovieListProps {
  genre?: string;
  searchQuery?: string;
}

const MovieList: React.FC<MovieListProps> = ({ genre, searchQuery }) => {
  const { moviesQuery } = useMovieViewModel(container.getMovieRepository());
  
  // Note: For more specific filtering, we might need to implement a separate query
  // For now, we'll use the basic movies query and filter client-side if needed
  const { data: movies = [], isLoading, error } = moviesQuery;

  if (isLoading) return <div className="p-4">Loading movies...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {(error as Error).message}</div>;

  // Optional: Filter movies client-side based on props if needed
  const filteredMovies = movies.filter(movie => {
    const matchesGenre = !genre || movie.genre.includes(genre);
    const matchesSearch = !searchQuery || 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredMovies.map((movie) => (
        <div key={movie.id} className="border rounded-lg overflow-hidden shadow-lg">
          {movie.posterUrl && (
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="font-bold text-lg">{movie.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{movie.genre.join(', ')}</p>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{movie.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-gray-700">{movie.duration} min</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {movie.rating}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;