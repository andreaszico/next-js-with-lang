import { IMovieRepository } from '../repositories/movie.repository';
import { Movie, MovieFilters } from '../entities/movie';

export interface IGetMoviesUseCase {
  execute(filters?: MovieFilters): Promise<Movie[]>;
}

export class GetMoviesUseCase implements IGetMoviesUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(filters?: MovieFilters): Promise<Movie[]> {
    return await this.movieRepository.getAllMovies(filters);
  }
}