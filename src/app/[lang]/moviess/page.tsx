import React from 'react';
import MovieList from '@/presentation/components/MovieList';

const MoviesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movie List</h1>
      <MovieList />
    </div>
  );
};

export default MoviesPage;