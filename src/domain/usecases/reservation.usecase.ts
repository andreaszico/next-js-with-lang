import { IReservationRepository } from '../repositories/reservation.repository';
import { Reservation } from '../entities/reservation';

export interface ICreateReservationUseCase {
  execute(reservationData: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation>;
}

export interface IGetUserReservationsUseCase {
  execute(userId: string): Promise<Reservation[]>;
}

export class CreateReservationUseCase implements ICreateReservationUseCase {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(reservationData: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation> {
    return await this.reservationRepository.createReservation(reservationData);
  }
}

export class GetUserReservationsUseCase implements IGetUserReservationsUseCase {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(userId: string): Promise<Reservation[]> {
    return await this.reservationRepository.getUserReservations(userId);
  }
}