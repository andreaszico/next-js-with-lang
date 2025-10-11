import { IMovieRepository } from '../../repositories/movie.repository';
import { Movie, MovieFilters } from '../../entities/movie';
import { IMovieRemoteDataSource } from '../datasources/movie.datasource';

export class MovieRepository implements IMovieRepository {
  constructor(private remoteDataSource: IMovieRemoteDataSource) {}

  async getAllMovies(filters?: MovieFilters): Promise<Movie[]> {
    return await this.remoteDataSource.getAllMovies(filters);
  }

  async getMovieById(id: string): Promise<Movie | null> {
    try {
      return await this.remoteDataSource.getMovieById(id);
    } catch (error) {
      return null;
    }
  }

  async createMovie(movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> {
    return await this.remoteDataSource.createMovie(movie);
  }

  async updateMovie(id: string, movie: Partial<Movie>): Promise<Movie> {
    return await this.remoteDataSource.updateMovie(id, movie);
  }

  async deleteMovie(id: string): Promise<boolean> {
    return await this.remoteDataSource.deleteMovie(id);
  }
}