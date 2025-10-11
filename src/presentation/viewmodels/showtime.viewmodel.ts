import { useQuery } from '@tanstack/react-query';
import { Showtime } from '@/domain/entities/showtime';
import { GetShowtimesUseCase } from '@/domain/usecases/showtime.usecase';
import { IShowtimeRepository } from '@/domain/repositories/showtime.repository';

export interface IShowtimeViewModel {
  showtimesQuery: (movieId?: string, date?: Date) => ReturnType<typeof useQuery>;
}

export const useShowtimeViewModel = (showtimeRepository: IShowtimeRepository) => {
  const getShowtimesUseCase = new GetShowtimesUseCase(showtimeRepository);

  const showtimesQuery = (movieId?: string, date?: Date) => 
    useQuery({
      queryKey: ['showtimes', movieId, date ? date.toISOString() : null],
      queryFn: () => getShowtimesUseCase.execute(movieId, date),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  return {
    showtimesQuery,
  };
};