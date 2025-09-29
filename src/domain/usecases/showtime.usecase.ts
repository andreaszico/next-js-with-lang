import { IShowtimeRepository } from '../repositories/showtime.repository';
import { Showtime } from '../entities/showtime';

export interface IGetShowtimesUseCase {
  execute(movieId?: string, date?: Date): Promise<Showtime[]>;
}

export class GetShowtimesUseCase implements IGetShowtimesUseCase {
  constructor(private showtimeRepository: IShowtimeRepository) {}

  async execute(movieId?: string, date?: Date): Promise<Showtime[]> {
    return await this.showtimeRepository.getAllShowtimes(movieId, date);
  }
}