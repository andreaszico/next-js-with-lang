import { Reservation, ReservationFilters } from '../../entities/reservation';

export interface IReservationRemoteDataSource {
  getAllReservations(filters?: ReservationFilters): Promise<Reservation[]>;
  getReservationById(id: string): Promise<Reservation>;
  createReservation(reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation>;
  updateReservation(id: string, reservation: Partial<Reservation>): Promise<Reservation>;
  deleteReservation(id: string): Promise<boolean>;
  getUserReservations(userId: string): Promise<Reservation[]>;
}

export class ReservationRemoteDataSource implements IReservationRemoteDataSource {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  }

  async getAllReservations(filters?: ReservationFilters): Promise<Reservation[]> {
    const params = new URLSearchParams();
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.showtimeId) params.append('showtimeId', filters.showtimeId);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom.toISOString());
    if (filters?.dateTo) params.append('dateTo', filters.dateTo.toISOString());

    const response = await fetch(`${this.baseUrl}/reservations?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    return await response.json();
  }

  async getReservationById(id: string): Promise<Reservation> {
    const response = await fetch(`${this.baseUrl}/reservations/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reservation');
    }
    return await response.json();
  }

  async createReservation(reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation> {
    const response = await fetch(`${this.baseUrl}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) {
      throw new Error('Failed to create reservation');
    }
    return await response.json();
  }

  async updateReservation(id: string, reservation: Partial<Reservation>): Promise<Reservation> {
    const response = await fetch(`${this.baseUrl}/reservations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });
    if (!response.ok) {
      throw new Error('Failed to update reservation');
    }
    return await response.json();
  }

  async deleteReservation(id: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/reservations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete reservation');
    }
    return response.ok;
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/reservations`);
    if (!response.ok) {
      throw new Error('Failed to fetch user reservations');
    }
    return await response.json();
  }
}