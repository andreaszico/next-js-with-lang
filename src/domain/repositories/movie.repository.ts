import { Movie, MovieFilters } from '../entities/movie';

export interface IMovieRepository {
  getAllMovies(filters?: MovieFilters): Promise<Movie[]>;
  getMovieById(id: string): Promise<Movie | null>;
  createMovie(movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie>;
  updateMovie(id: string, movie: Partial<Movie>): Promise<Movie>;
  deleteMovie(id: string): Promise<boolean>;
}