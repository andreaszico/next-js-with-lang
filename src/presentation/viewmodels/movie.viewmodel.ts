import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Movie, MovieFilters } from '@/domain/entities/movie';
import { GetMoviesUseCase } from '@/domain/usecases/movie.usecase';
import { IMovieRepository } from '@/domain/repositories/movie.repository';

export interface IMovieViewModel {
  moviesQuery: ReturnType<typeof useQuery>;
  refetchMovies: () => void;
}

export const useMovieViewModel = (movieRepository: IMovieRepository) => {
  const queryClient = useQueryClient();
  const getMoviesUseCase = new GetMoviesUseCase(movieRepository);

  const moviesQuery = useQuery({
    queryKey: ['movies'],
    queryFn: () => getMoviesUseCase.execute(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const refetchMovies = () => {
    queryClient.invalidateQueries({ queryKey: ['movies'] });
  };

  return {
    moviesQuery,
    refetchMovies,
  };
};