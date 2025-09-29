import { IShowtimeRepository } from '../../repositories/showtime.repository';
import { Showtime } from '../../entities/showtime';
import { IShowtimeRemoteDataSource } from '../datasources/showtime.datasource';

export class ShowtimeRepository implements IShowtimeRepository {
  constructor(private remoteDataSource: IShowtimeRemoteDataSource) {}

  async getAllShowtimes(movieId?: string, date?: Date): Promise<Showtime[]> {
    return await this.remoteDataSource.getAllShowtimes(movieId, date);
  }

  async getShowtimeById(id: string): Promise<Showtime | null> {
    try {
      return await this.remoteDataSource.getShowtimeById(id);
    } catch (error) {
      return null;
    }
  }

  async createShowtime(showtime: Omit<Showtime, 'id' | 'createdAt' | 'updatedAt'>): Promise<Showtime> {
    return await this.remoteDataSource.createShowtime(showtime);
  }

  async updateShowtime(id: string, showtime: Partial<Showtime>): Promise<Showtime> {
    return await this.remoteDataSource.updateShowtime(id, showtime);
  }

  async deleteShowtime(id: string): Promise<boolean> {
    return await this.remoteDataSource.deleteShowtime(id);
  }
}