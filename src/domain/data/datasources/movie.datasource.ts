import { Movie, MovieFilters } from '../../entities/movie';

export interface IMovieRemoteDataSource {
  getAllMovies(filters?: MovieFilters): Promise<Movie[]>;
  getMovieById(id: string): Promise<Movie>;
  createMovie(movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie>;
  updateMovie(id: string, movie: Partial<Movie>): Promise<Movie>;
  deleteMovie(id: string): Promise<boolean>;
}

export class MovieRemoteDataSource implements IMovieRemoteDataSource {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }

  async getAllMovies(filters?: MovieFilters): Promise<Movie[]> {
    const params = new URLSearchParams();
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.searchQuery) params.append('search', filters.searchQuery);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom.toISOString());
    if (filters?.dateTo) params.append('dateTo', filters.dateTo.toISOString());

    const response = await fetch(`${this.baseUrl}/movies?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return await response.json();
  }

  async getMovieById(id: string): Promise<Movie> {
    const response = await fetch(`${this.baseUrl}/movies/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie');
    }
    return await response.json();
  }

  async createMovie(movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> {
    const response = await fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) {
      throw new Error('Failed to create movie');
    }
    return await response.json();
  }

  async updateMovie(id: string, movie: Partial<Movie>): Promise<Movie> {
    const response = await fetch(`${this.baseUrl}/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) {
      throw new Error('Failed to update movie');
    }
    return await response.json();
  }

  async deleteMovie(id: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/movies/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
    return response.ok;
  }
}