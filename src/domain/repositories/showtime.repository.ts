import { Showtime } from '../entities/showtime';

export interface IShowtimeRepository {
  getAllShowtimes(movieId?: string, date?: Date): Promise<Showtime[]>;
  getShowtimeById(id: string): Promise<Showtime | null>;
  createShowtime(showtime: Omit<Showtime, 'id' | 'createdAt' | 'updatedAt'>): Promise<Showtime>;
  updateShowtime(id: string, showtime: Partial<Showtime>): Promise<Showtime>;
  deleteShowtime(id: string): Promise<boolean>;
}