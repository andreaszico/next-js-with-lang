import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Reservation, ReservationFilters } from '@/domain/entities/reservation';
import { CreateReservationUseCase, GetUserReservationsUseCase } from '@/domain/usecases/reservation.usecase';
import { IReservationRepository } from '@/domain/repositories/reservation.repository';

export interface IReservationViewModel {
  userReservationsQuery: (userId: string) => ReturnType<typeof useQuery>;
  createReservationMutation: ReturnType<typeof useMutation>;
}

export const useReservationViewModel = (reservationRepository: IReservationRepository) => {
  const queryClient = useQueryClient();
  const createReservationUseCase = new CreateReservationUseCase(reservationRepository);
  const getUserReservationsUseCase = new GetUserReservationsUseCase(reservationRepository);

  const createReservationMutation = useMutation({
    mutationFn: (reservationData: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>) => 
      createReservationUseCase.execute(reservationData),
    onSuccess: () => {
      // Invalidate user reservations after creating a new one
      queryClient.invalidateQueries({ queryKey: ['userReservations'] });
    },
  });

  const userReservationsQuery = (userId: string) => 
    useQuery({
      queryKey: ['userReservations', userId],
      queryFn: () => getUserReservationsUseCase.execute(userId),
      staleTime: 5 * 60 * 1000, // 5 minutes
      enabled: !!userId, // Only run the query if userId is provided
    });

  return {
    userReservationsQuery,
    createReservationMutation,
  };
};