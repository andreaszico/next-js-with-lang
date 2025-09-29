import { IReservationRepository } from '../../repositories/reservation.repository';
import { Reservation, ReservationFilters } from '../../entities/reservation';
import { IReservationRemoteDataSource } from '../datasources/reservation.datasource';

export class ReservationRepository implements IReservationRepository {
  constructor(private remoteDataSource: IReservationRemoteDataSource) {}

  async getAllReservations(filters?: ReservationFilters): Promise<Reservation[]> {
    return await this.remoteDataSource.getAllReservations(filters);
  }

  async getReservationById(id: string): Promise<Reservation | null> {
    try {
      return await this.remoteDataSource.getReservationById(id);
    } catch (error) {
      return null;
    }
  }

  async createReservation(reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation> {
    return await this.remoteDataSource.createReservation(reservation);
  }

  async updateReservation(id: string, reservation: Partial<Reservation>): Promise<Reservation> {
    return await this.remoteDataSource.updateReservation(id, reservation);
  }

  async deleteReservation(id: string): Promise<boolean> {
    return await this.remoteDataSource.deleteReservation(id);
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    return await this.remoteDataSource.getUserReservations(userId);
  }
}