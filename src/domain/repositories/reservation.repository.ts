import { Reservation, ReservationFilters } from '../entities/reservation';

export interface IReservationRepository {
  getAllReservations(filters?: ReservationFilters): Promise<Reservation[]>;
  getReservationById(id: string): Promise<Reservation | null>;
  createReservation(reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation>;
  updateReservation(id: string, reservation: Partial<Reservation>): Promise<Reservation>;
  deleteReservation(id: string): Promise<boolean>;
  getUserReservations(userId: string): Promise<Reservation[]>;
}