import { Showtime } from '../../entities/showtime';

export interface IShowtimeRemoteDataSource {
  getAllShowtimes(movieId?: string, date?: Date): Promise<Showtime[]>;
  getShowtimeById(id: string): Promise<Showtime>;
  createShowtime(showtime: Omit<Showtime, 'id' | 'createdAt' | 'updatedAt'>): Promise<Showtime>;
  updateShowtime(id: string, showtime: Partial<Showtime>): Promise<Showtime>;
  deleteShowtime(id: string): Promise<boolean>;
}

export class ShowtimeRemoteDataSource implements IShowtimeRemoteDataSource {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  }

  async getAllShowtimes(movieId?: string, date?: Date): Promise<Showtime[]> {
    const params = new URLSearchParams();
    if (movieId) params.append('movieId', movieId);
    if (date) params.append('date', date.toISOString());

    const response = await fetch(`${this.baseUrl}/showtimes?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch showtimes');
    }
    return await response.json();
  }

  async getShowtimeById(id: string): Promise<Showtime> {
    const response = await fetch(`${this.baseUrl}/showtimes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch showtime');
    }
    return await response.json();
  }

  async createShowtime(showtime: Omit<Showtime, 'id' | 'createdAt' | 'updatedAt'>): Promise<Showtime> {
    const response = await fetch(`${this.baseUrl}/showtimes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(showtime),
    });
    if (!response.ok) {
      throw new Error('Failed to create showtime');
    }
    return await response.json();
  }

  async updateShowtime(id: string, showtime: Partial<Showtime>): Promise<Showtime> {
    const response = await fetch(`${this.baseUrl}/showtimes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(showtime),
    });
    if (!response.ok) {
      throw new Error('Failed to update showtime');
    }
    return await response.json();
  }

  async deleteShowtime(id: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/showtimes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete showtime');
    }
    return response.ok;
  }
}